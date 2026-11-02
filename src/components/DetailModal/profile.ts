// 実際の経歴とプロフィール URL をここに追加してください。
export const profile = {
  skills: [
    {
      category: "FRONTEND",
      items: [
        { name: "JavaScript", icon: "js" },
        { name: "TypeScript", icon: "ts" },
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "Vue", icon: "vue" },
        { name: "Nuxt", icon: "nuxtjs" },
        { name: "HTML", icon: "html" },
        { name: "CSS", icon: "css" },
      ],
    },
    {
      category: "BACKEND & CLOUD",
      items: [
        { name: "Node.js", icon: "nodejs" },
        { name: "Python", icon: "python" },
        { name: "Kotlin", icon: "kotlin" },
        { name: "Java", icon: "java" },
        { name: "Spring Boot", icon: "spring" },
        { name: "Thymeleaf", icon: null },
        { name: "AWS", icon: "aws" },
      ],
    },
    {
      category: "CREATIVE",
      items: [
        { name: "Three.js", icon: "threejs" },
        { name: "React Three Fiber", icon: null },
        { name: "WebGL", icon: null },
      ],
    },
    {
      category: "TOOLS",
      items: [
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
        { name: "Vite", icon: "vite" },
        { name: "Figma", icon: "figma" },
      ],
    },
  ],
  career: [] as { period: string; title: string; description?: string }[],
  links: [
    { label: "GitHub", url: "" },
    { label: "X", url: "" },
  ],
};
