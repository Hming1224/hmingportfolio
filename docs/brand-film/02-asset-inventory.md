# 02 — Asset Inventory

Status values: **Ready** = usable as-is; **Capture** = must be recorded from the local site; **Compose** = editorial assembly from real sources; **Gap** = original material is not present.

| Story beat | Status | Best source | Use |
|---|---|---|---|
| Research complexity | Ready | `public/projects/advantech/research/interview-synthesis-photo.webp` | Opening research-note fragment |
| Energy dashboard | Ready | `public/projects/advantech/solution/final-f11-01.webp` | Demand graph and alert entry |
| AI demand analysis | Ready | `final-f11-02.webp` through `final-f11-05.webp` | Alert → chatbot → analysis → action sequence |
| Equipment anomaly | Ready | `final-f12-01.webp` through `final-f12-04.webp` and `final-f2-01.webp` through `final-f2-05.webp` | Optional alternate Enterprise AI cutaways |
| Homepage product system | Capture | `/en` `.hero` | User Insights / Business Goals / Engineering Feasibility |
| Crypto current state | Ready | `public/projects/crypto-arsenal/current/current-state-figure.png` | Dashboard context |
| Crypto before flow | Ready | `public/projects/crypto-arsenal/current/current-flow.webp` | Before state / task-flow comparison |
| Crypto wireframes | Ready | `public/projects/crypto-arsenal/wireframe/figma/*` | Wireframe montage and before/after |
| Manual close interaction | Ready | `public/projects/crypto-arsenal/final/close-position-market.mp4` and `close-position-limit.mp4` | Product interaction; prefer the cleaner of the two |
| TP/SL interaction | Ready | `public/projects/crypto-arsenal/final/tp-sl-subtitled.mp4` | Product interaction with readable state change |
| Web3 card | Capture | `/en#projects`, Industry Projects, `#project3` | Production-backed project identity and status |
| Web3 cover | Ready | `public/projects/tba/cover/cover.webp` and `logo.webp` | Background for Issue → Hold → Verify typography |
| Web3 interfaces | Gap | No interface exports in `public/projects/tba/` | Do not invent; request originals for a later revision |
| Design tokens/components | Capture | `/en/design-system` | Public system proof |
| Figma component/process | Ready | `public/projects/design-system-case-study/research/figma-make-prototype.webp` | Build-process montage |
| Human–AI workflow | Ready | `public/projects/design-system-case-study/solution/ai-workflow.webp` | Split-screen collaboration moment |
| Code | Capture | `components/Hero.tsx`, `styles/tokens.css`, or a clean editor crop | Implementation proof; no terminal secrets or personal paths |
| Responsive portfolio | Capture | `/en` at 1920×1080 and 390×844 | Desktop/mobile match cut |
| Wordmark | Ready | `public/brand-logo.svg` | Closing lockup |

## Existing video technical check

Before editing, normalize selected clips to a shared mezzanine or delivery format. Keep originals untouched. Inspect duration, resolution, frame rate, pixel format, and audio presence with `ffprobe`; avoid recompressing until the select is locked.

Recommended working transcode:

```bash
ffmpeg -i input.mp4 -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" -r 30 -c:v prores_ks -profile:v 3 -pix_fmt yuv422p10le -an output.mov
```

For a lightweight editor proxy, use H.264, CRF 18–20, `yuv420p`, and preserve the 30 fps timeline.

## Capture naming

`BF_<shot>_<subject>_<state>_1920x1080.<ext>`

Examples:

- `BF_02_home-hero_default_1920x1080.webp`
- `BF_03_advantech_demand-alert_1920x1080.webp`
- `BF_05_web3_card_1920x1080.webp`
- `BF_06_design-system_tokens_1920x1080.webp`
