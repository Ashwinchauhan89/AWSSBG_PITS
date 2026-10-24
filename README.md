# AWS Student Builder Group — Prashanti Institute of Technology & Science (PITS), Ujjain

Official web platform for the **AWS Student Builder Group (SBG)** at **Prashanti Institute of Technology & Science, Ujjain, Madhya Pradesh, India**.

> **Community Disclaimer**: This is an independent, student-led educational community at Prashanti Institute of Technology & Science, Ujjain. It is not an official AWS corporate website and its members are not AWS corporate employees.

---

## 🚀 Key Highlights & Platform Features

- **Home (`/`)**: Hero section with AWS-inspired gradients, animated cloud infrastructure architecture visualizer, verified community metrics, domain tracks, upcoming events preview, featured student projects, and core team preview.
- **About (`/about`)**: Clear statement of the student builder mission, academic cross-department participation, hands-on learning philosophy, and community distinction from corporate AWS.
- **Events (`/events`)**: Categorized technical workshops, bootcamps, and hackathons with search filtering, status badges (upcoming/past), capacity indicators, and direct registration modal.
- **Core Team (`/team`)**: Leadership directory highlighting appointed Group Leader **Ashwin Chauhan**, alongside clearly distinguished open positions with direct recruitment call-to-actions.
- **Join Core Team (`/join`)**: Application portal with strict client & server validation (7.0+ CGPA requirement, branch, motivation, technical background), anti-duplicate submission safeguards, and transparent privacy disclosures.
- **Projects (`/projects`)**: Student cloud projects across Cloud Computing, AI/ML, Generative AI, Web Development, and Cybersecurity, with interactive submission modal.
- **Learning Resources (`/resources`)**: Curated, verified pathways to AWS Skill Builder, AWS Well-Architected whitepapers, and Amazon Bedrock workshops, with explicit notice regarding certification exam voucher requirements.
- **Contact (`/contact`)**: Form with validation, campus location details, community email, WhatsApp community invite, and official AWS SBG program references.
- **Admin Dashboard (`/admin`)**: Protected review portal for community organizers to manage core team applications, schedule interviews, track contact messages, and monitor events.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server & Client Components) with TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with curated AWS Builder Dark Theme (Deep Navy `#090D16`, AWS Orange `#FF9900`, Cyber Sky `#38BDF8`)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Brand Icons (`@/components/ui/Icons`)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Feedback & Notifications**: [Sonner](https://sonner.emilkowal.ski/) toast system
- **Architecture**: 100% Frontend-focused with instant, zero-database serverless mock store for seamless local and production deployments

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description | Example / Default |
|---|---|---|
| `ADMIN_SECRET_KEY` | Passkey for `/admin` management portal | `pits-sbg-admin2026` |
| `NEXT_PUBLIC_APP_URL` | Base canonical domain for SEO / OpenGraph | `http://localhost:3000` |
| `NEXT_PUBLIC_WHATSAPP_URL`| Official WhatsApp community invite link | `https://chat.whatsapp.com/EYN9G6KJxfy66GQ3gTgR13` |
| `NEXT_PUBLIC_AWS_SBG_INFO_URL` | Official AWS Student Builder Groups link | `https://builder.aws.com/community/student-builder-groups` |

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Verification
```bash
npm run build
npm run start
```

### 4. Linting & Type Checks
```bash
npm run lint
```





---

## 🚀 Deploying to Vercel or AWS Amplify

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com/new) or [AWS Amplify](https://aws.amazon.com/amplify/).
3. Set the environment variables (`ADMIN_SECRET_KEY`, `NEXT_PUBLIC_APP_URL`).
4. Deploy! The frontend builds smoothly with zero database setup required.
