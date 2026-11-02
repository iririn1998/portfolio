// 実際の経歴とプロフィール URL をここに追加してください。
export const profile = {
  skills: [
    {
      category: "FRONTEND",
      items: [
        { name: "TypeScript", icon: "ts" },
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "HTML", icon: "html" },
        { name: "CSS", icon: "css" },
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
