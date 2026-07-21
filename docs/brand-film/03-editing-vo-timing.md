# 03 — Editing, Subtitle, and VO Timing

## Edit decision list

| In | Out | Duration | Edit action | Text |
|---:|---:|---:|---|---|
| 00:00.00 | 00:03.00 | 3.00 s | Six-source opening montage → grid lock | Complex problems. |
| 00:03.00 | 00:07.00 | 4.00 s | Homepage hero → three-label convergence | Users × Business × Engineering |
| 00:07.00 | 00:12.00 | 5.00 s | Advantech demand alert → AI analysis → action | Enterprise AI / From data to decisions |
| 00:12.00 | 00:17.00 | 5.00 s | Crypto dashboard → manual close → TP/SL → flow compare | FinTech / Giving users control |
| 00:17.00 | 00:21.00 | 4.00 s | Web3 card → cover → Issue/Hold/Verify | Web3 / End-to-end experiences |
| 00:21.00 | 00:25.00 | 4.00 s | Research → wireframe → components → tokens → code → RWD | Research. Design. Build. Validate. |
| 00:25.00 | 00:28.00 | 3.00 s | Human decision + AI workflow split → finished site | Human judgment / AI-accelerated execution |
| 00:28.00 | 00:30.00 | 2.00 s | Wordmark → homepage/URL lockup | Hming / Designing clarity into complexity. / hmingdesign.com |

## Voice-over record script

Target pace: 128–138 words per minute, confident but conversational. The script is 68 words; leave micro-pauses between chapters and do not rush the final line.

| VO in | VO out | Script | Direction |
|---:|---:|---|---|
| 00:00.20 | 00:02.85 | Complex products rarely begin with clear answers. | Calm opening; stress “clear answers.” |
| 00:03.20 | 00:06.85 | Hming connects user insight, business goals, and engineering reality. | Even three-part cadence. |
| 00:07.20 | 00:11.75 | Turning fragmented industrial data into actionable, AI-assisted decisions. | Slight lift on “actionable.” |
| 00:12.20 | 00:16.75 | Simplifying complex trading workflows without removing user control. | Stress “user control.” |
| 00:17.20 | 00:20.75 | Designing connected experiences across emerging technologies. | Clean and neutral; avoid hype. |
| 00:21.10 | 00:24.75 | From product strategy and research to systems, interfaces, and implementation. | Build momentum through the list. |
| 00:25.05 | 00:27.75 | Guided by human judgment. Accelerated through AI collaboration. | Full stop between sentences. |
| 00:28.05 | 00:29.75 | Hming. Designing clarity into complexity. | Slowest line; confident resolution. |

## Subtitle file content

Save as UTF-8 `hming-brand-film-en.srt` during final assembly:

```srt
1
00:00:00,200 --> 00:00:02,850
Complex products rarely begin with clear answers.

2
00:00:03,200 --> 00:00:06,850
Hming connects user insight, business goals,
and engineering reality.

3
00:00:07,200 --> 00:00:11,750
Turning fragmented industrial data into actionable,
AI-assisted decisions.

4
00:00:12,200 --> 00:00:16,750
Simplifying complex trading workflows
without removing user control.

5
00:00:17,200 --> 00:00:20,750
Designing connected experiences
across emerging technologies.

6
00:00:21,100 --> 00:00:24,750
From product strategy and research to systems,
interfaces, and implementation.

7
00:00:25,050 --> 00:00:27,750
Guided by human judgment.
Accelerated through AI collaboration.

8
00:00:28,050 --> 00:00:29,750
Hming. Designing clarity into complexity.
```

## Type and title treatment

- Use Space Grotesk to stay inside the portfolio identity.
- Primary chapter: 64–72 px, semibold, 1.05 line height.
- Secondary line: 34–40 px, medium.
- Subtitle: 38–44 px at 1080p, two lines maximum, centered or bottom-left according to picture density.
- Default foreground `#343434` on warm white; reverse to white over dark/product footage.
- Purple `#5d62d8` is reserved for one key word, line, cursor focus, or CTA-like emphasis per frame.

## Music and mix

- 00:00–00:07: filtered minimal pulse, sparse click transients.
- 00:07–00:17: bass and percussion gradually enter.
- 00:17–00:25: maintain tempo; use a short tonal reset at Web3 and rebuild through the implementation montage.
- 00:25–00:28: add a warm pad, then remove one rhythmic layer before the close.
- 00:28–00:30: one resolved final beat with a short tail.
- Mix target: VO intelligible at all times; music roughly 8–12 dB below narration; interface SFX should be felt rather than featured.
- Delivery target: approximately −14 LUFS integrated, true peak at or below −1 dBTP.

## Final export checklist

- 1920×1080, exact 30.00-second duration, 30 fps constant frame rate.
- H.264 High Profile, 15–25 Mbps, `yuv420p`, AAC 48 kHz 320 kbps.
- No visible browser chrome, localhost URL, debug overlay, personal filesystem path, or private data.
- Confirm titles and subtitles remain readable on a 13-inch laptop and a mobile social preview.
- Watch once muted for visual clarity and once eyes-closed for VO/music continuity.
