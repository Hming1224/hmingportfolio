import { getTranslations } from 'next-intl/server';
import DotPattern from '@/components/ui/dot-pattern';
import AiImpactStoryStage, {
  type MindsetEvidence,
  type MindsetItem,
  type WorkflowPath,
} from './AiImpactStoryStage';
import { type OutcomeItem } from './OutcomeDepthCarousel';
import { type WorkflowStage } from './WorkflowCarousel';

export default async function AiImpactContent() {
  const t = await getTranslations('aiImpact');
  const mindsetItems = t.raw('mindset.items') as MindsetItem[];
  const mindsetEvidence = t.raw('mindset.evidence') as MindsetEvidence[];
  const workflowItems = t.raw('workflow.items') as WorkflowStage[];
  const workflowPaths = t.raw('workflow.paths') as WorkflowPath[];
  const outcomes = t.raw('example.items') as OutcomeItem[];

  return (
    <div className="ai-impact-content">
      <div className="ai-impact-content__dots" aria-hidden="true">
        <DotPattern className="ai-impact-dots ai-impact-dots--story" />
      </div>
      <AiImpactStoryStage
        mindsetItems={mindsetItems}
        mindsetEvidence={mindsetEvidence}
        workflowItems={workflowItems}
        workflowPaths={workflowPaths}
        outcomes={outcomes}
        labels={{
          mindset: {
            title: t('mindset.title'),
            lead: t('mindset.lead'),
          },
          workflow: {
            title: t('workflow.title'),
            lead: t('workflow.lead'),
            progressLabel: t('workflow.progressLabel'),
            pathsLabel: t('workflow.pathsLabel'),
            pathsTitle: t('workflow.pathsTitle'),
            labels: {
              tools: t('workflow.labels.tools'),
              usage: t('workflow.labels.usage'),
              skill: t('workflow.labels.skill'),
              input: t('workflow.labels.input'),
              action: t('workflow.labels.action'),
              output: t('workflow.labels.output'),
              nextPhase: t('workflow.labels.nextPhase'),
            },
          },
          outcomes: {
            title: t('example.title'),
            lead: t('example.lead'),
            carousel: t('example.carouselLabel'),
            previous: t('example.previous'),
            next: t('example.next'),
            stages: t('example.stagesLabel'),
            skills: t('example.skillsLabel'),
          },
        }}
      />
    </div>
  );
}
