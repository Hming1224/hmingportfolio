const getCleanFormspreeId = (id: string) => {
  const trimmed = id.trim();

  if (trimmed.includes("/")) {
    const parts = trimmed.split("/");
    return parts[parts.length - 1];
  }

  return trimmed;
};

export const config = {
  formspreeId: getCleanFormspreeId(
    process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
  ),
} as const;
