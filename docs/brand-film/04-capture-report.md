# 04 — Capture Report

- Capture date: 2026-07-21
- Source: local production code at `http://127.0.0.1:3000`
- Desktop capture: 1920×1080, light theme
- Mobile reference: 390×844, light theme

## Generated package

- 10 stills: homepage, selected work, Advantech solution, Advantech demand analysis, Crypto final flow, Web3 card, Design System hero, token reference, code/tokens, and mobile homepage.
- 4 raw website recordings: homepage labels, Advantech solution scroll, Web3 card scroll, and Design System token scroll.
- 2 normalized Crypto product selects: manual close and TP/SL, 1920×1080 at 30 fps, silent for editorial use.
- 1 English subtitle file with eight timed cues.

The capture manifest is `assets/manifest.json`. Re-run the browser package with:

```bash
node scripts/capture-brand-film.mjs
```

Set `BRAND_FILM_BASE_URL` only when intentionally capturing a different verified deployment.

## Visual review

- Homepage desktop: ready; all three system labels and main positioning are visible.
- Advantech: ready; the demand chart, alert path, AI entry point, and interface sequence are legible.
- Crypto: ready; existing product recordings preserve the real interaction and embedded bilingual guidance.
- Web3: ready with limitation; the real card and cover are strong enough for the planned typographic sequence, but there are no separate interface exports.
- Design System: ready; hero, token model, token reference, and production CSS are captured.
- Mobile homepage: reference only. The current 390 px hero capture shows narrow-width title/body clipping during the live entrance state, so it should not be selected for the final brand film unless a separate maintenance task resolves or reframes that production behavior.

## Editorial recommendation

Use the raw browser recordings as source plates, then conform them to 30 fps inside the edit. For the 30-second cut, the highest-confidence sequence is:

1. Homepage hero system labels.
2. Advantech demand-analysis still sequence with a designed cursor and clean cuts.
3. Crypto product selects using their true recorded interaction.
4. Web3 card/cover with Issue → Hold → Verify typography.
5. Design System tokens + code still.
6. Homepage closing frame and Hming wordmark.

Do not use the mobile hero or fabricate Web3 screens to fill time. Both would weaken the product-focused credibility of the film.
