import { SkillCategory } from '../../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Programming Languages',
    icon: 'Code2',
    skills: [
      { name: 'Python (NumPy, Pandas, PyPlot)', level: 96, highlight: true },
      { name: 'Kotlin (Android SDK, Jetpack Compose)', level: 92, highlight: true },
      { name: 'C / C++ (Qt, Embedded, Kinematics)', level: 90, highlight: true },
      { name: 'Bash & Linux Shell Scripting', level: 92, highlight: true },
      { name: 'JavaScript & TypeScript (React)', level: 88, highlight: true },
      { name: 'Java', level: 88, highlight: true },
      { name: 'Swift', level: 82 },
      { name: 'SQL & Database Design', level: 88 },
      { name: 'R, Assembler & LaTeX', level: 80 },
    ]
  },
  {
    category: 'Frameworks, ML & Libraries',
    icon: 'Brain',
    skills: [
      { name: 'FastAPI', level: 90, highlight: true },
      { name: 'Node.js', level: 88, highlight: true },
      { name: 'React', level: 88, highlight: true },
      { name: 'PyTorch & TensorFlow (ML / DL)', level: 88, highlight: true },
      { name: 'Scikit-Learn', level: 92, highlight: true },
      { name: 'Pandas, Matplotlib & PyPlot', level: 95, highlight: true },
      { name: 'Jetpack Compose & Mobile Architecture', level: 90, highlight: true },
      { name: 'Qt & GUI', level: 86 },
    ]
  },
  {
    category: 'Developer, Cloud & AI Tools',
    icon: 'Cloud',
    skills: [
      { name: 'Git', level: 95, highlight: true },
      { name: 'GitHub Actions (CI/CD)', level: 94, highlight: true },
      { name: 'Agentic AI Workflows', level: 95, highlight: true },
      { name: 'Claude Code', level: 94, highlight: true },
      { name: 'GitHub Copilot', level: 92, highlight: true },
      { name: 'Docker & Containerization', level: 90, highlight: true },
      { name: 'Amazon Web Services (AWS)', level: 88 },
      { name: 'Jenkins & Automation Pipelines', level: 85 },
      { name: 'Postman & Swagger', level: 92 },
      { name: 'Android Studio, VS Code, PyCharm & IntelliJ IDEA', level: 94 },
    ]
  },
  {
    category: 'Domains & Areas of Expertise',
    icon: 'Layers',
    skills: [
      { name: 'Software Architecture', level: 95, highlight: true },
      { name: 'SDK Design', level: 95, highlight: true },
      { name: 'Agentic AI', level: 94, highlight: true },
      { name: 'Machine Learning & Predictive Modeling', level: 92, highlight: true },
      { name: 'API Design', level: 92, highlight: true },
      { name: 'Entitlement Servers & DHCP Protocols', level: 94, highlight: true },
      { name: 'Medical Devices & Visual Simulation', level: 88 },
    ]
  },
  {
    category: 'Soft Skills',
    icon: 'Users',
    skills: [
      { name: 'Team Player', level: 98, highlight: true },
      { name: 'Team Management', level: 92, highlight: true },
      { name: 'Engineering Leadership', level: 94, highlight: true },
      { name: 'Quick Learning Capacity', level: 96, highlight: true },
      { name: 'Great Work Capacity', level: 95, highlight: true },
      { name: 'Trustworthy', level: 98, highlight: true },
      { name: 'Responsibility', level: 98, highlight: true },
    ]
  }
];
