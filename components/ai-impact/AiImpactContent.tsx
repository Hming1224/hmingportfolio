import Image from 'next/image';
import {
  Blocks,
  Compass,
  DatabaseBackup,
  FlaskConical,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import OutcomeDepthCarousel, { type OutcomeItem } from './OutcomeDepthCarousel';
import WorkflowCarousel, { type WorkflowStage } from './WorkflowCarousel';

const mindsetIcons = [Compass, FlaskConical, Blocks, DatabaseBackup];

type MindsetEvidence = {
  src: string;
  alt: string;
  label: string;
  caption: string;
};

type WorkflowPath = {
  title: string;
  stages: string;
  body: string;
};

export default async function AiImpactContent() {
  const t = await getTranslations('aiImpact');
  const mindsetItems = t.raw('mindset.items') as Array<{ title: string; body: string }>;
  const mindsetEvidence = t.raw('mindset.evidence') as MindsetEvidence[];
  const workflowItems = t.raw('workflow.items') as WorkflowStage[];
  const workflowPaths = t.raw('workflow.paths') as WorkflowPath[];
  const outcomes = t.raw('example.items') as OutcomeItem[];

  return (
    <div className="ai-impact-content">
      <section className="ai-impact-section ai-impact-section--mindset" aria-labelledby="ai-impact-mindset">
        <div className="ai-impact-section__intro">
          <p className="ai-impact-section__number">01</p>
          <h2 id="ai-impact-mindset">{t('mindset.title')}</h2>
          <p>{t('mindset.lead')}</p>
        </div>
        <div className="ai-impact-mindset">
          <ol className="ai-impact-mindset__steps">
            {mindsetItems.map((item, index) => {
              const Icon = mindsetIcons[index];

              return (
                <li className="ai-impact-mindset__step" key={item.title}>
                  <span className="ai-impact-mindset__icon" aria-hidden="true">
                    <Icon size={28} strokeWidth={1.8} />
                  </span>
                  <div>
                    <span className="ai-impact-mindset__number" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="ai-impact-mindset__evidence">
            {mindsetEvidence.map((item, index) => (
              <figure key={item.src}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={index === 0 ? 1440 : 1600}
                  height={index === 0 ? 960 : 900}
                  sizes="(max-width: 767px) calc(100vw - 40px), 50vw"
                />
                <figcaption>
                  <span>{item.label}</span>
                  <p>{item.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-impact-section ai-impact-section--workflow" aria-labelledby="ai-impact-workflow">
        <div className="ai-impact-section__intro">
          <p className="ai-impact-section__number">02</p>
          <h2 id="ai-impact-workflow">{t('workflow.title')}</h2>
          <p>{t('workflow.lead')}</p>
        </div>
        <WorkflowCarousel
          items={workflowItems}
          progressLabel={t('workflow.progressLabel')}
          labels={{
            tools: t('workflow.labels.tools'),
            usage: t('workflow.labels.usage'),
            skill: t('workflow.labels.skill'),
            input: t('workflow.labels.input'),
            action: t('workflow.labels.action'),
            output: t('workflow.labels.output'),
          }}
        />
        <div className="ai-impact-workflow-paths">
          <div className="ai-impact-workflow-paths__intro">
            <p>{t('workflow.pathsLabel')}</p>
            <h3>{t('workflow.pathsTitle')}</h3>
          </div>
          <div className="ai-impact-workflow-paths__grid">
            {workflowPaths.map((path) => (
              <article key={path.title}>
                <span>{path.stages}</span>
                <h4>{path.title}</h4>
                <p>{path.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-impact-section ai-impact-section--outcomes" aria-labelledby="ai-impact-example">
        <div className="ai-impact-section__intro">
          <p className="ai-impact-section__number">03</p>
          <h2 id="ai-impact-example">{t('example.title')}</h2>
          <p>{t('example.lead')}</p>
        </div>
        <OutcomeDepthCarousel
          items={outcomes}
          labels={{
            carousel: t('example.carouselLabel'),
            previous: t('example.previous'),
            next: t('example.next'),
            stages: t('example.stagesLabel'),
            skills: t('example.skillsLabel'),
          }}
        />
      </section>
    </div>
  );
}
