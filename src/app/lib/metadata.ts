import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Hub Community",
    default: "Hubverso",
  },
  description:
    "Conecte-se com desenvolvedores, participe de eventos e compartilhe conhecimento na maior comunidade de tecnologia.",
  keywords: [
    "comunidade",
    "tecnologia",
    "programação",
    "desenvolvedores",
    "eventos tech",
    "networking",
  ],
  authors: [{ name: "Hub Community" }],
  creator: "Hub Community",
  icons: {
    icon: "/join.jpg",
  },
  robots: {
    index: true,
    follow: true,
  },
};
