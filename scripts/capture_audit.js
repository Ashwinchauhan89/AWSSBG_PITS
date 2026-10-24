const http = require("http");
const { spawn } = require("child_process");
const fs = require("fs");
const WebSocket = require("d:/Project/AWSSBG_PITS/node_modules/next/dist/compiled/ws");

const viewports = [
  { name: "desktop_1920x1080", w: 1920, h: 1080, mobile: false },
  { name: "reference_1649x925", w: 1649, h: 925, mobile: false },
  { name: "laptop_1440x900", w: 1440, h: 900, mobile: false },
  { name: "tablet_768x1024", w: 768, h: 1024, mobile: true },
  { name: "mobile_390x844", w: 390, h: 844, mobile: true },
  { name: "small_mobile_360x800", w: 360, h: 800, mobile: true }
];

async function captureAll() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9225;
  const proc = spawn(chromePath, [
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    `--remote-debugging-port=${port}`,
    "http://localhost:3000"
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const tabs = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}/json/list`, res => {
        let data = "";
        res.on("data", c => data += c);
        res.on("end", () => resolve(JSON.parse(data)));
      }).on("error", reject);
    });

    const tab = tabs.find(t => t.url.includes("localhost:3000"));
    if (!tab) throw new Error("Localhost tab not found");

    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise(resolve => ws.on("open", resolve));

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const h = (d) => {
          const m = JSON.parse(d);
          if (m.id === id) {
            ws.off("message", h);
            if (m.error) reject(m.error);
            else resolve(m.result);
          }
        };
        ws.on("message", h);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    // Enable Page
    await send("Page.enable");

    for (const vp of viewports) {
      console.log(`Setting viewport: ${vp.name} (${vp.w}x${vp.h})...`);

      await send("Emulation.setDeviceMetricsOverride", {
        width: vp.w,
        height: vp.h,
        deviceScaleFactor: 1,
        mobile: vp.mobile
      });

      // Reload or wait for GSAP animation to complete (settle time 1.8s)
      await send("Page.navigate", { url: "http://localhost:3000" });
      await new Promise(r => setTimeout(r, 2200));

      const shot = await send("Page.captureScreenshot", { format: "png" });
      const outPath = `d:/Project/AWSSBG_PITS/public/audit_${vp.name}.png`;
      fs.writeFileSync(outPath, Buffer.from(shot.data, "base64"));
      console.log(`Saved screenshot: ${outPath}`);
    }

    ws.close();
    console.log("All viewports successfully captured via CDP!");
  } finally {
    proc.kill();
  }
}

captureAll().catch(err => {
  console.error("Capture error:", err);
  process.exit(1);
});
