"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  getProjects,
  type ProjectSummary,
} from "../data/projects";
import {
  Tabs,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from "./animate-ui/primitives/base/tabs";

function useScrollReveal() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const cards = Array.from(list.querySelectorAll<HTMLElement>(".project-card"));

    cards.forEach((card) => card.classList.add("card-hidden"));

    const observer = new IntersectionObserver(
      (entries) => {
        let revealCount = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          setTimeout(() => {
            card.classList.remove("card-hidden");
            card.classList.add("card-visible");
          }, revealCount * 120);
          revealCount++;
          observer.unobserve(card);
        });
      },
      { threshold: 0.05 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return listRef;
}

function ProjectCard({ project }: { project: ProjectSummary }) {
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
          <span className="project-button is-disabled" aria-disabled="true">
            {t("comingSoon")}
          </span>
        ) : (
          <Link className="project-button" href={project.href ?? "/"}>
            {t("learnMore")}
          </Link>
        )}
      </div>
    </article>
  );
}

function ProjectList({ projects: list }: { projects: ProjectSummary[] }) {
  const listRef = useScrollReveal();
  return (
    <div className="projects-list" ref={listRef}>
      {list.map((project) => (
        <ProjectCard project={project} key={project.slug} />
      ))}
    </div>
  );
}

export default function Works() {
  const locale = useLocale() as Locale;
  const t = useTranslations("works");
  const projects = getProjects(locale);
  const enterpriseProjects = projects.filter(
    (project) => project.category === "enterprise",
  );
  const schoolProjects = projects.filter(
    (project) => project.category === "school",
  );

  return (
    <section id="projects" className="projects-section">
      <div className="section-heading">
        <span />
        <h2>{t("heading")}</h2>
        <span />
      </div>

      <Tabs defaultValue="enterprise" className="project-tabs">
        <TabsHighlight className="project-tabs-highlight">
          <TabsList className="project-tabs-list">
            <TabsHighlightItem value="enterprise" className="project-tabs-item">
              <TabsTab value="enterprise" className="project-tabs-tab">
                {t("enterprise")}
              </TabsTab>
            </TabsHighlightItem>
            <TabsHighlightItem value="school" className="project-tabs-item">
              <TabsTab value="school" className="project-tabs-tab">
                {t("school")}
              </TabsTab>
            </TabsHighlightItem>
          </TabsList>
        </TabsHighlight>

        <TabsPanels mode="wait">
          <TabsPanel value="enterprise">
            <ProjectList projects={enterpriseProjects} />
          </TabsPanel>
          <TabsPanel value="school">
            <ProjectList projects={schoolProjects} />
          </TabsPanel>
        </TabsPanels>
      </Tabs>
    </section>
  );
}
