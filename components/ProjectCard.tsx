"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ProjectSummary } from "@/data/projects";
import Button from "./ui/Button";

export default function ProjectCard({ project }: { project: ProjectSummary }) {
  const t = useTranslations("works");
  const disabled = project.status === "coming-soon";

  return (
    <article
      className={`project-card tone-${project.tone}`}
      id={project.cardId ?? `project-${project.slug}`}
    >
      <div className="project-media">
        <Image
          className="project-image"
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 768px) calc(100vw - 48px), (max-width: 1279px) calc(100vw - 96px), 1200px"
        />
        <div className="project-scrim" />
      </div>

      <div className="project-info">
        <div className="project-meta">
          <div className="project-logo-wrap">
            <Image src={project.logo} alt="" fill sizes="168px" />
          </div>
          <div className="project-title">
            <h3>{project.title}</h3>
            <p>{project.date}</p>
          </div>
          <p className="project-description">{project.description}</p>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        {disabled ? (
          <Button size="lg" disabled>
            {t("comingSoon")}
          </Button>
        ) : (
          <Button href={project.href ?? "/"} size="lg">
            {t("learnMore")}
          </Button>
        )}
      </div>
    </article>
  );
}
