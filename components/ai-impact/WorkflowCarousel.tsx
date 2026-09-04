'use client';

import { ArrowRight, ChevronsRight, FileInput, PackageCheck, Sparkles } from 'lucide-react';
import { type CSSProperties } from 'react';

export type WorkflowStage = {
  title: string;
  body: string;
  tools: string;
  usage: string;
  skill: string;
  skillTips: string[];
  input: string;
  action: string;
  output: string;
};

type WorkflowCarouselProps = {
  items: WorkflowStage[];
  progressLabel: string;
  activeStage: number;
  onStageSelect: (stage: number) => void;
  embedded?: boolean;
  labels: {
    tools: string;
    usage: string;
    skill: string;
    input: string;
    action: string;
    output: string;
    nextPhase: string;
  };
};

export default function WorkflowCarousel({
  items,
  progressLabel,
  activeStage,
  onStageSelect,
  embedded = false,
  labels,
}: WorkflowCarouselProps) {
  const getSkills = (item: WorkflowStage) => item.skill.split(' + ').map((name, index) => ({
    name,
    tip: item.skillTips[index],
  }));
  const style = { '--workflow-offset': `${-activeStage * 100}%` } as CSSProperties;

  return (
    <div className={`ai-impact-workflow-carousel${embedded ? ' is-embedded' : ''}`} data-active-stage={activeStage + 1} data-progress={(activeStage / Math.max(items.length - 1, 1)).toFixed(3)}>
      <div className="ai-impact-workflow-carousel__sticky">
        <div className="ai-impact-workflow-progress" aria-label={progressLabel}>
          <p aria-live="polite">
            <span>{String(activeStage + 1).padStart(2, '0')}</span>
            <span aria-hidden="true"> / </span>
            <span>{String(items.length).padStart(2, '0')}</span>
          </p>
          <ol>
            {items.map((item, index) => (
              <li className={index === activeStage ? 'is-active' : ''} key={item.title}>
                <button type="button" aria-label={`${String(index + 1).padStart(2, '0')} ${item.title}`} aria-current={index === activeStage ? 'step' : undefined} onClick={() => onStageSelect(index)}>
                  {String(index + 1).padStart(2, '0')}
                </button>
                {index === activeStage && index < items.length - 1 ? (
                  <span className="ai-impact-workflow-progress__direction" aria-hidden="true"><ChevronsRight /></span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        <div className="ai-impact-workflow-track" style={style}>
          {items.map((item, index) => (
            <article className="ai-impact-workflow-slide" key={item.title} data-stage={index + 1} aria-hidden={index !== activeStage} inert={index !== activeStage}>
              <div className="ai-impact-workflow-slide__copy">
                <p className="ai-impact-workflow-slide__number">{String(index + 1).padStart(2, '0')}</p>
                <h3>{item.title}</h3>
                <p className="ai-impact-workflow-slide__body">{item.body}</p>
                <dl>
                  <div><dt>{labels.tools}</dt><dd>{item.tools}</dd></div>
                  <div><dt>{labels.usage}</dt><dd>{item.usage}</dd></div>
                  <div>
                    <dt>{labels.skill}</dt>
                    <dd className="ai-impact-workflow-skills">
                      {getSkills(item).map((skill, skillIndex) => {
                        const tooltipId = `workflow-skill-${index + 1}-${skillIndex + 1}`;
                        return (
                          <span className="ai-impact-skill" key={skill.name} tabIndex={index === activeStage ? 0 : -1} aria-describedby={tooltipId}>
                            <code>{skill.name}</code>
                            <span className="ai-impact-skill__tip" id={tooltipId} role="tooltip">{skill.tip}</span>
                          </span>
                        );
                      })}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="ai-impact-handoff" aria-label={`${item.title} ${labels.output}`}>
                <div className="ai-impact-handoff__node"><FileInput aria-hidden="true" /><span>{labels.input}</span><strong>{item.input}</strong></div>
                <ArrowRight className="ai-impact-handoff__arrow" aria-hidden="true" />
                <div className="ai-impact-handoff__node ai-impact-handoff__node--active"><Sparkles aria-hidden="true" /><span>{labels.action}</span><strong>{item.action}</strong></div>
                <ArrowRight className="ai-impact-handoff__arrow" aria-hidden="true" />
                <div className="ai-impact-handoff__node"><PackageCheck aria-hidden="true" /><span>{labels.output}</span><strong>{item.output}</strong></div>
              </div>
            </article>
          ))}
        </div>
        <p className={`ai-impact-workflow-next-hint${activeStage === items.length - 1 ? ' is-hidden' : ''}`} aria-hidden={activeStage === items.length - 1}>
          <span>{labels.nextPhase}</span><ArrowRight aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}
