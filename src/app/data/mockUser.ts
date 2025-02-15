// Arquivo: "@/app/data/mockUser"

export interface User {
  name: string;
  role: string;
  email: string;
  location: string;
  joinDate: string;
  bio: string;
  avatar: string;
  coverImage: string;
  skills: string[];
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
  stats: {
    communities: number;
    events: number;
    contributions: number;
  };
}

export const mockUser: User = {
  name: "Rafael Oliveira",
  role: "Frontend Developer",
  email: "rafaelraniereoliveira@gmail.com",
  location: "Goiânia, GO",
  joinDate: "Março 2024",
  bio: "Desenvolvedor apaixonado por criar experiências incríveis na web. Contribuidor ativo em projetos open source e entusiasta de React e TypeScript.",
  avatar:
    "https://media.licdn.com/dms/image/v2/D4E03AQFc3XKffXEZLg/profile-displayphoto-shrink_200_200/B4EZRxfXhOHAAY-/0/1737070836222?e=1744848000&v=beta&t=yLsyEpfAyqXB3tQUaeQlFDRgqp-DQtC0o7yI8WA7fcw",
  coverImage:
    "https://media.licdn.com/dms/image/v2/D4E16AQH0EMW8BFTcwQ/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1737070912697?e=1744848000&v=beta&t=lxFCDve2wAa1eQsf3uyFXIIhgwDwNSafNOIrxx9cACY",
  skills: ["React", "TypeScript", "Node.js", "UI/UX"],
  social: {
    github: "https://github.com/Dev-Zero64",
    linkedin: "https://www.linkedin.com/in/rafael-r-b8b131347/",
    twitter: "",
    website: "https://rafaelraniereoliveira.vercel.app/",
  },
  stats: {
    communities: 2,
    events: 3,
    contributions: 1,
  },
};
