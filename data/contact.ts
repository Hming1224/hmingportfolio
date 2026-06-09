import type { Locale } from "../i18n/routing";

const contactCopy = {
  en: {
    title: "Interested in my experience or work?",
    subtitle: "Reach out through any channel below, or send me a message.",
  },
  zh: {
    title: "對我的經歷或作品感興趣嗎？",
    subtitle: "透過以下管道與我聯繫，或傳送表單訊息！",
  },
} satisfies Record<Locale, { title: string; subtitle: string }>;

const contactDetails = {
  heroImage: "https://framerusercontent.com/images/NB9UIWMSY1Vp8KhJ1oEDFdGQI.jpg",
  email: "hmingdesigner@gmail.com",
  phone: "+886 978-629-321",
  socials: {
    linkedin: {
      href: "https://www.linkedin.com/in/brian-huang-a36759128/",
      label: "Brian Huang",
    },
    github: {
      href: "https://github.com/Hming1224",
      label: "Hming1224",
    },
  },
} as const;

export function getContactData(locale: Locale) {
  return {
    ...contactDetails,
    ...contactCopy[locale],
  };
}
