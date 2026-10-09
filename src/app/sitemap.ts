import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://awssbg-pits.vercel.app";
  const currentDate = new Date();

  const routes = [
    "",
    "/about",
    "/events",
    "/team",
    "/join",
    "/projects",
    "/resources",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" || route === "/events" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/join" || route === "/events" ? 0.9 : 0.7,
  }));
}
