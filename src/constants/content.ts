export const introLines = [
  { text: 'Let Me Introduce', dir: -1 },
  { text: 'My self', dir: 1 },
  { text: 'As Developer', dir: -1 },
] as const

export const aboutContent = {
  name: 'Tholiul Asbah',
  role: 'Full Stack Developer',
  bio: 'Saya seorang developer yang passionate dalam membangun pengalaman web yang interaktif, modern, dan penuh makna. Fokus saya pada clean code, performa, dan animasi yang meaningful.',
  highlights: [
    'React & TypeScript',
    'Node.js & Backend',
    'UI/UX & Motion Design',
  ],
} as const

export const projects = [
  {
    title: 'Portfolio GW',
    description: 'Personal portfolio dengan scroll-driven animations.',
    tag: 'React · GSAP',
  },
  {
    title: 'E-Commerce App',
    description: 'Platform belanja online dengan payment gateway.',
    tag: 'Next.js · Stripe',
  },
  {
    title: 'Task Manager',
    description: 'Aplikasi manajemen tugas kolaboratif real-time.',
    tag: 'React · Firebase',
  },
] as const

export const certificates = [
  {
    title: 'Frontend Development',
    issuer: 'Dicoding Indonesia',
    year: '2025',
  },
  {
    title: 'JavaScript Algorithms',
    issuer: 'freeCodeCamp',
    year: '2024',
  },
  {
    title: 'React Advanced Patterns',
    issuer: 'Udemy',
    year: '2024',
  },
] as const

export const education = [
  {
    degree: 'S1 Teknik Informatika',
    school: 'Universitas Contoh',
    period: '2021 — 2025',
    detail: 'Fokus pada software engineering, algoritma, dan pengembangan web modern.',
  },
  {
    degree: 'Bootcamp Full Stack',
    school: 'Dicoding Indonesia',
    period: '2024',
    detail: 'Intensive program: React, Node.js, REST API, dan deployment cloud.',
  },
] as const

export const experience = [
  {
    role: 'Frontend Developer',
    company: 'Startup Tech',
    period: '2025 — Present',
    description: 'Membangun UI interaktif dengan React, animasi scroll, dan design system.',
  },
  {
    role: 'Freelance Web Developer',
    company: 'Independent',
    period: '2024 — 2025',
    description: 'Landing page, e-commerce, dan portfolio untuk berbagai klien lokal.',
  },
  {
    role: 'Web Dev Intern',
    company: 'Digital Agency',
    period: '2023 — 2024',
    description: 'Assist development CMS, optimasi performa, dan integrasi API pihak ketiga.',
  },
] as const
