"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
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
import ProjectCard from "./ProjectCard";
import SplitText from "./animate-ui/primitives/texts/SplitText";

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
        <SplitText
          tag="h2"
          text={t("heading")}
          delay={42}
          duration={0.72}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 34 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-80px"
          textAlign="inherit"
        />
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
