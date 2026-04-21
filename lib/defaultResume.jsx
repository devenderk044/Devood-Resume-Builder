// filepath: lib/defaultResume.js
export const defaultResume = {
  personal: {
    name: 'Alex Chen',
    email: 'alex.chen@dev.io',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexchen',
    github: 'github.com/alexchen',
    portfolio: 'alexchen.dev',
  },
  summary:
    'Full-stack MERN developer with 4+ years of experience building scalable web applications. Passionate about clean architecture, performance optimization, and delivering impactful user experiences.',
  skills: {
    Frontend: [
      'React.js',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Redux Toolkit',
    ],
    Backend: ['Node.js', 'Express.js', 'GraphQL', 'REST APIs', 'JWT Auth'],
    Database: ['MongoDB', 'PostgreSQL', 'Redis', 'Mongoose'],
    Tools: ['Docker', 'Git', 'AWS', 'Vercel', 'Postman'],
  },
  experience: [
    {
      id: 1,
      company: 'TechCorp Inc.',
      role: 'Senior Full-Stack Developer',
      duration: 'Jan 2022 – Present',
      responsibilities:
        'Led development of microservices architecture serving 100k+ users\nBuilt real-time dashboard using Socket.io reducing support tickets by 40%\nOptimized MongoDB queries improving API response time by 65%',
      technologies: 'React, Node.js, MongoDB, Redis, Docker',
    },
    {
      id: 2,
      company: 'StartupXYZ',
      role: 'MERN Stack Developer',
      duration: 'Jun 2020 – Dec 2021',
      responsibilities:
        'Developed e-commerce platform with Stripe payment integration\nImplemented JWT authentication and role-based access control\nBuilt RESTful APIs with 99.9% uptime serving 50k+ requests/day',
      technologies: 'MongoDB, Express, React, Node.js, Stripe',
    },
  ],
  projects: [
    {
      id: 1,
      title: 'DevConnect – Real-time Collaboration Platform',
      description:
        'Full-stack app enabling developers to collaborate in real-time with code sharing, video calls, and project management.',
      technologies: 'React, Node.js, Socket.io, MongoDB, WebRTC',
      github: 'github.com/alexchen/devconnect',
      live: 'devconnect.vercel.app',
    },
    {
      id: 2,
      title: 'AI Code Review Tool',
      description:
        'Browser extension + API that uses GPT-4 to analyze code quality, suggest improvements, and detect security vulnerabilities.',
      technologies: 'React, OpenAI API, Node.js, Chrome Extension API',
      github: 'github.com/alexchen/ai-code-review',
      live: 'ai-code-review.dev',
    },
  ],
  education: [
    {
      id: 1,
      institution: 'UC Berkeley',
      degree: 'B.S. Computer Science',
      duration: '2016 – 2020',
      gpa: '3.8/4.0',
    },
  ],
  certifications: [
    {
      id: 1,
      name: 'AWS Certified Developer – Associate',
      issuer: 'Amazon Web Services',
      year: '2023',
    },
    {
      id: 2,
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB Inc.',
      year: '2022',
    },
  ],
  achievements: [
    'Speaker at ReactConf 2023 – Optimizing Large-Scale React Applications\n500+ GitHub stars on open-source MongoDB migration toolkit\nTop 5% on LeetCode with 400+ problems solved',
  ],
};

export const templates = [
  { id: 'modern', name: 'Modern Dev' },
  { id: 'minimal', name: 'ATS Minimal' },
  { id: 'corporate', name: 'Corporate' },
  { id: 'compact', name: 'Compact' },
  { id: 'creative', name: 'Creative' },
  { id: 'neon', name: 'Neon Dark' },
  { id: 'elegant', name: 'Elegant Serif' },
  { id: 'timeline', name: 'Timeline' },
  { id: 'startup', name: 'Startup Bold' },
  { id: 'academic', name: 'Academic' },
  { id: 'infographic', name: 'Infographic' },
  { id: 'gradient', name: 'Gradient Pro' },
  { id: 'newspaper', name: 'Newspaper' },
  { id: 'swiss', name: 'Swiss Clean' },
  { id: 'glass', name: 'Glass Dark' },
];
