const messages = {
  nav: {
    ariaLabel: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    projects: "Selected Work",
    about: "About",
    designSystem: "Design System",
    contact: "Contact",
    resume: "Resume",
    resumeHref: "/Brian_Huang_Resume.html",
  },
  language: {
    select: "Select language",
    menu: "Language menu",
    current: "EN",
    loading: "Switching language",
  },
  hero: {
    badge: "2+ years in industry. Open to opportunities!",
    greeting: "Hi! I'm Brian Huang",
    taglines: "Research needs with empathy|Explore design with curiosity|Build products with clarity",
    journey: "My Journey",
    works: "View My Work",
  },
  works: {
    heading: "Selected Work",
    enterprise: "Industry Projects",
    school: "Academic & Side Projects",
    comingSoon: "Coming Soon",
    learnMore: "Learn More",
  },
  contact: {
    email: "Email",
    phone: "Phone",
    copyEmail: "Copy email address",
    copyPhone: "Copy phone number",
    copy: "Copy",
    copied: "Copied!",
    formTitle: "Send Me a Message",
    formSubtitle: "I'll get back to you as soon as possible! 😸",
    name: "Your name",
    company: "Company / Organization",
    message: "Your message",
    submit: "Send Message",
    sending: "Sending...",
    success: "Message Sent!",
    required: "This field is required",
    invalidEmail: "Enter a valid email address",
    error: "Something went wrong. Please try again.",
  },
  footer: {
    socialLinks: "Social links",
  },
  designSystem: {
    hero: {
      eyebrow: "Portfolio System Behind the Scenes",
      title: "Turning a portfolio into a design system that can actually scale",
      description:
        "This page is not just a visual showcase. It opens up the design language, component rules, and upgrade strategy behind this portfolio. From tokens to components to a maturity roadmap, the point is to show how design taste gets engineered into a system.",
      primaryAction: "See the principles",
      secondaryAction: "See the roadmap",
      statsAriaLabel: "Design system summary stats",
      stats: [
        { value: "4", label: "core routes in the portfolio" },
        { value: "25+", label: "shared components already organized" },
        { value: "740+", label: "CSS classes audited across the site" },
        { value: "60+", label: "traceable design tokens" },
      ],
    },
    toc: {
      ariaLabel: "Design system section navigation",
      title: "On this page",
      items: [
        { href: "#principles", label: "Design soul and 7 principles" },
        { href: "#foundation", label: "Foundations and tokens" },
        { href: "#components", label: "Components and interactions" },
        { href: "#roadmap", label: "Maturity roadmap" },
        { href: "#cta", label: "Where to go next" },
      ],
    },
    principles: {
      heading: "Design soul and 7 principles",
      soulTitle: "I want people to feel: this designer is careful, tasteful, and has built real things.",
      soulBody:
        "This system is made for design leaders and hiring teams who notice detail. So the goal is not to look flashy. It is to feel grounded, intentional, and memorable. It should have weight, warmth, and a restrained personality.",
      items: [
        {
          title: "Set the character before adding decoration",
          body: "The first priority of any screen is whether the overall character holds up. Proportion, spacing, and hierarchy come first. Visual details only matter after that.",
        },
        {
          title: "Colors can change, the frame cannot fall apart",
          body: "Different projects can have different tones, but the information architecture, layout rhythm, and CTA rules need to stay consistent so the whole portfolio still feels authored by one person.",
        },
        {
          title: "The main actor must always be obvious",
          body: "Each screen should preserve one clear priority. On the homepage, for example, the primary CTA stays a single purple action so the signal does not compete with itself.",
        },
        {
          title: "Interaction is not decoration, it adds meaning",
          body: "Hover, focus, loading, and disabled states are there to explain status, not to show off. Every interaction should help people understand what is happening.",
        },
        {
          title: "High information density still needs room to breathe",
          body: "I like making complex work understandable, but density should not become clutter. Cards, sections, and breakpoints all need to help the reader breathe.",
        },
        {
          title: "Design should be catchable by engineering",
          body: "I do not want the system to stop at beautiful Figma frames. Tokens, z-index, breakpoints, and semantic states need to land cleanly in code.",
        },
        {
          title: "Every reachable state deserves design attention",
          body: "Empty states, success validation, error messages, modal dismissal, and toast exit timing all add up. That is where maturity comes from.",
        },
      ],
    },
    foundation: {
      heading: "Foundation: from tokens to rhythm",
      cards: [
        {
          title: "Color is not just picking nice swatches. It is defining hierarchy first.",
          body: "Brand purple handles CTA and active signals, semantic states handle system feedback, and neutral grays keep reading orderly. That gives every component a shared language from the start.",
        },
        {
          title: "Type scale and spacing shape readability together",
          body: "The type tokens and breakpoints are tied together in this site. The goal is not an overly expressive scale, but a layout that stays stable across screen sizes.",
        },
        {
          title: "Radius, shadow, and motion define tactility",
          body: "12 and 16 for cards, 200 for pill buttons, and a small set of motion timings keep the interface restrained without feeling flat.",
        },
      ],
    },
    playground: {
      tokenToggle: "Expand full token table",
      tokenHide: "Collapse token table",
      loadingLabel: "Loading",
      selectPlaceholder: "Choose a role",
      selectValueLabel: "Role example",
      checkboxLabel: "Keep CTA semantics consistent",
      radioAlpha: "Homepage narrative first",
      radioBeta: "Case-study details first",
      alertInfo: "Info states add context and lightweight guidance.",
      alertSuccess: "Success states confirm that a reliable action has completed.",
      alertWarning: "Warning states ask people to double-check without creating panic.",
      alertError: "Error states should clearly say what failed and how to recover.",
      openModal: "Open modal",
      launchToast: "Trigger toast",
      modalTitle: "Decision pattern example",
      modalBody: "A modal is useful when the background flow must pause and the user needs to make an explicit decision.",
      modalClose: "Close",
      toastMessage: "Toast: component states and motion tokens are wired together.",
      emptyTitle: "No content yet",
      emptyDescription: "When a project is not launched or content is not ready, the system should still provide a graceful empty state.",
      emptyAction: "View case study",
      buttonsTitle: "Button system",
      buttonsBody: "Primary CTA, secondary action, and danger flows should stay legible within one shared rule set.",
      buttonsPrimary: "Primary action",
      buttonsSecondary: "Secondary action",
      buttonsDanger: "Danger action",
      selectionTitle: "Selection controls",
      selectionBody: "Once form states are tokenized, validation, options, and decision-heavy flows become much more consistent.",
      feedbackTitle: "System feedback",
      feedbackBody: "Success, warning, error, and info each carry a distinct tone instead of every page improvising its own message style.",
      loadingTitle: "Loading and empty states",
      loadingBody: "Even before content arrives, the interface should feel prepared instead of broken.",
    },
    components: {
      heading: "Component demos and interaction patterns",
      items: [
        {
          title: "Buttons and form controls: clarify state before styling polish",
          body: "Once Button gained loading and danger variants, and Select, Checkbox, and Radio were added, the whole input flow became much more complete. That matters for the contact form and any future settings surfaces.",
        },
        {
          title: "Toast, Alert, and Modal: reusable feedback instead of page-specific patches",
          body: "System feedback should not be hand-built differently every time. Turning these into reusable components keeps the experience more coherent and makes future expansion faster.",
        },
        {
          title: "Skeleton and Empty State: waiting should still feel designed",
          body: "I care a lot about the moments when data has not arrived yet or content does not exist. Mature products are often defined by how well these edge states are handled.",
        },
      ],
    },
    roadmap: {
      heading: "Maturity roadmap",
      methodTitle: "The method is not random patching. It is deliberate benchmarking against mature systems.",
      methodBody:
        "I used systems like Ant Design and Material 3 as references to identify where my own portfolio system was still thin. The point was not to copy them, but to use mature product thinking to pressure-test whether my design decisions could really scale.",
      problemLabel: "Problem:",
      decisionLabel: "Decision:",
      outcomeLabel: "Outcome:",
      phases: [
        {
          kicker: "Phase 01",
          title: "Shipped",
          items: [
            {
              title: "Token naming, semantic states, and layer cleanup",
              problem: "Different areas originally handled colors and z-index in inconsistent ways.",
              decision: "Unify naming under the --hm-* prefix and add semantic success, warning, error, info, plus a clear z-index scale.",
              outcome: "New components can plug into a shared language instead of guessing which value is correct.",
            },
            {
              title: "Expanded form and action primitives",
              problem: "The original button and input primitives were not enough for richer flows.",
              decision: "Add Button loading and danger states, plus Select, Checkbox, and Radio controls.",
              outcome: "The contact flow and future product surfaces now have a more complete interaction skeleton.",
            },
            {
              title: "Reusable feedback and waiting states",
              problem: "Toast, Alert, Modal, Skeleton, and Empty State would become messy if rebuilt ad hoc every time.",
              decision: "Turn them into foundational UI components with repeatable tone and behavior.",
              outcome: "The product feels more coherent and is easier for AI or engineers to extend later.",
            },
          ],
        },
        {
          kicker: "Phase 02",
          title: "In progress / under validation",
          items: [
            {
              title: "Injecting motion tokens into older surfaces",
              problem: "Having motion tokens does not mean every older interaction already uses them.",
              decision: "Continue threading duration and easing tokens into existing animations and transitions.",
              outcome: "Motion becomes a site-wide rhythm, not just isolated nice moments.",
            },
            {
              title: "Chart tokens and data-visual language",
              problem: "As case studies grow, data views need a more stable color system.",
              decision: "Ship chart tokens first, then validate them through actual case-study use.",
              outcome: "Future process visuals and outcome charts can move faster with fewer styling guesses.",
            },
            {
              title: "Dark-mode tokens kept, public toggle paused",
              problem: "The dark-theme structure exists, but the public experience is not ready enough yet.",
              decision: "Keep the .dark token architecture while removing the public ThemeToggle from navigation.",
              outcome: "The foundation stays prepared without exposing an unfinished experience.",
            },
          ],
        },
        {
          kicker: "Phase 03",
          title: "Roadmap",
          items: [
            {
              title: "Full two-theme launch",
              problem: "Dark tokens still need page-by-page validation across the core routes.",
              decision: "Open the theme switch only after the important pages are fully checked.",
              outcome: "The eventual theme experience will feel complete instead of half-shipped.",
            },
            {
              title: "Accessibility audit toward WCAG AA",
              problem: "The current system has the basics, but not a full accessibility pass yet.",
              decision: "Add keyboard behavior, contrast, semantic structure, and visible focus checks to the next validation round.",
              outcome: "System maturity will be measured by usability, not just appearance.",
            },
            {
              title: "More data-vis and content templates",
              problem: "As more case studies are added, information-heavy content will need clearer repeatable patterns.",
              decision: "Extend the current foundation into chart, comparison, and flow-visual templates.",
              outcome: "New case studies can stay structured even when the information density gets high.",
            },
          ],
        },
      ],
    },
    cta: {
      eyebrow: "Next step",
      title: "If you want to see how this system lands in real project work",
      body: "Go back to the case studies to see how the same thinking gets applied to IoT, enterprise SaaS, and teaching-oriented product narratives. Or reach out and we can talk about how design thinking connects to product and engineering.",
      primaryAction: "Back to selected work",
      secondaryAction: "Contact me",
    },
  },
};

export default messages;
