import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import DesignSystemDocsPage from "@/components/design-system/DesignSystemDocsPage";
import type { DesignSystemLocale } from "@/lib/design-system-docs";
import { designSystemDocs, getDesignSystemDoc } from "@/lib/design-system-docs";
import { createLocalizedMetadata } from "@/lib/metadata";

type Params = { slug: string[] };

export function generateStaticParams() {
  return designSystemDocs.map((doc) => ({
    slug: [
      doc.kind === "foundation" ? "foundations" : doc.kind === "component" ? "components" : "reference",
      doc.slug,
    ],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as DesignSystemLocale;
  const doc = getDesignSystemDoc(slug[0], slug[1]);

  if (!doc) return {};

  const path = `/design-system/${slug.join("/")}`;
  return createLocalizedMetadata(locale, path, {
    en: { title: `${doc.title} · Design System`, description: doc.description },
    "zh-TW": { title: `${doc.titleZh} · 設計系統`, description: doc.descriptionZh },
  });
}

export default async function DesignSystemRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const locale = (await getLocale()) as DesignSystemLocale;
  const doc = getDesignSystemDoc(slug[0], slug[1]);

  if (!doc || slug.length !== 2) notFound();

  return <DesignSystemDocsPage doc={doc} locale={locale} />;
}
