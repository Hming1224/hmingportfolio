# Design System Usage + API Accuracy Audit

- 稽核日期：2026-07-06
- 分支：`codex/ds-page-alignment`
- 基準 commit：`e9325c4a5c9a027cd4cb58f16b77b34cb31d5d0b`
- 範圍：`lib/design-system-data.ts` 的可見 catalog、`lib/design-system-docs.ts` 的 code guidance / token mappings、production route/component import 使用證據。
- 本檔只記錄稽核結果；未修改 production code、CSS、docs-site runtime content。

## 1. Catalog Usage Audit

判定標準：

- ✅ Live：production route 或 shared production component 正在使用。
- ⚠️ Indirect only：source / CSS / shared contract 存在，但目前沒有直接 route adoption，或只作為內部 primitive 被更高階元件吸收。
- 🔍 Docs-only：只在 design-system docs shell / demo 中使用。
- ❌ Unused / misleading：文件宣稱與實際 usage 明顯不符。

| 項目 | 分類 | 宣稱 source | 實際 production 使用（檔案:元件） | 判定 | 備註 |
|---|---|---|---|---|---|
| Colors | Foundations | `styles/tokens.css` | 全站 CSS tokens；`styles/home.css`、`styles/about.css`、`styles/contact.css`、`styles/case-study*.css` | ✅ Live | `--hm-*` 與 legacy alias 都仍在 production CSS 中被消耗。 |
| Typography | Foundations | `styles/tokens.css` | 全站 heading/body/button tokens；home/about/contact/case-study styles | ✅ Live | 目前是 production-backed token documentation。 |
| Spacing | Foundations | `styles/tokens.css` | `--hm-space-*`、case-study layout、card/form spacing | ✅ Live | Foundation token 與 route CSS 都有實際引用。 |
| Radius | Foundations | `styles/tokens.css` | Button、ProjectCard、Modal、case cards、contact form | ✅ Live | radius token 已映射到 shared control/card shell。 |
| Shadows | Foundations | `styles/tokens.css` | ProjectCard、Modal、case-study media/card surface | ✅ Live | shadow token 被 production visual surfaces 使用。 |
| Motion | Foundations | `styles/tokens.css` | Button、Navbar、ProjectCard、CaseTOC transitions | ✅ Live | motion token / easing 被互動元件使用。 |
| Icons | Foundations | `lucide-react`、inline SVG、public media | Button / Modal icon、ZoomableImage、FlowScrollHint、Footer social assets | ✅ Live | icon family 是混合來源，但文件主題 production-backed。 |
| Button | General | `components/ui/Button.tsx` | `components/Hero.tsx`、`components/Contact.tsx`、`components/ProjectCard.tsx`、`components/case-study/CaseStudyShell.tsx` | ✅ Live | Shared CTA/button primitive。 |
| LanguageSwitcher | General | `components/LanguageSwitcher.tsx` | `components/Navbar.tsx` | ✅ Live | Global nav locale switcher。 |
| Navbar | Shell | `components/Navbar.tsx` | `app/page.tsx`、`app/about-me/page.tsx`、`app/contact/page.tsx`、`components/case-study/CaseStudyShell.tsx` | ✅ Live | 全站 shell。 |
| Footer | Shell | `components/Footer.tsx` | `app/page.tsx`、`app/about-me/page.tsx`、`app/contact/page.tsx`、case-study shell | ✅ Live | 全站收尾與 social links。 |
| Tabs | Navigation | `components/WorkCategoryTabs.tsx` | `components/Works.tsx` | ✅ Live | Selected work filter tabs。 |
| CaseTOC | Navigation | `components/CaseTOC.tsx` | `components/case-study/CaseStudyShell.tsx` | ✅ Live | 正式案例頁 floating section nav；同時不應再重複列為 Component Boundaries item。 |
| FloatingInput | Data Entry | `components/Contact.tsx` + `.form-field` CSS | `components/Contact.tsx` contact form | ✅ Live | Route-local field pattern，但是 production-backed。 |
| FloatingTextarea | Data Entry | `components/Contact.tsx` + `.form-field` CSS | `components/Contact.tsx` contact form | ✅ Live | 與 FloatingInput 共用 field shell。 |
| ProjectCard | Data Display | `components/ProjectCard.tsx` | `components/Works.tsx` | ✅ Live | Homepage selected work card。 |
| CaseHero | Case Study | `components/case-study/CaseHero.tsx` | `app/advantech/sections/HeroSection.tsx`、`app/crypto-arsenal/sections/HeroSection.tsx`、`app/laushu/page.tsx` | ✅ Live | 三個案例 route 都採用。 |
| CaseSection | Case Study | `components/case-study/CaseSection.tsx` | Advantech 多個 sections | ✅ Live | 目前 adoption 主要集中在 Advantech route。 |
| CaseSectionHeader | Case Study | `components/case-study/CaseSectionHeader.tsx` | Crypto sections、Laushu helper | ✅ Live | Shared case-study heading shell。 |
| CaseCard | Case Study | `components/case-study/CaseCard.tsx` | Advantech、Crypto、Laushu sections | ✅ Live | Shared case-study card primitive。 |
| CaseGrid | Case Study | `components/case-study/CaseGrid.tsx` | Advantech、Crypto、Laushu sections | ✅ Live | Shared responsive case-study grid primitive。 |
| CaseMedia | Case Study | `components/case-study/CaseMedia.tsx` | Advantech media blocks、Crypto sections、Laushu media blocks | ✅ Live | Shared media frame。 |
| CaseBeforeAfter | Case Study | `components/case-study/CaseBeforeAfter.tsx` | 無直接 production route import；source export exists | ⚠️ Indirect only | 文件已明確標示 no current direct route adoption。可保留為 source-level component，但不應同時放在 Component Boundaries 的 extraction candidate。 |
| BeforeAfterNarrativeFrame | Case Study | `components/case-study/BeforeAfterNarrativeFrame.tsx` | `app/advantech/sections/SolutionSection.tsx`、`app/crypto-arsenal/sections/IterationSection.tsx`、`app/laushu/page.tsx` | ✅ Live | Production route 使用的 before/after 敘事框架。 |
| ZoomableImage | Case Study | `components/case-study/ZoomableImage.tsx` | Advantech FeatureImageLightbox、Crypto StepLightbox、Laushu images | ✅ Live | Shared lightbox/image affordance。 |
| FlowScrollHint | Case Study | `components/case-study/FlowScrollHint.tsx` | Advantech flow sections、Laushu task flow | ✅ Live | Case flow overflow affordance。 |
| ProposalTabs | Case Study | `components/case-study/CaseProposalTabs.tsx` | Advantech ProposalTabs wrapper、Crypto WireframeProposalBoard | ✅ Live | Shared proposal/tabbed media primitive。 |
| Toast | Feedback | `components/ui/Toast.tsx` | `components/Contact.tsx` | ✅ Live | Contact form feedback。 |
| Modal | Feedback | `components/ui/Modal.tsx` | `components/Contact.tsx` | ✅ Live | Contact form summary/feedback modal。 |
| Skeleton | Feedback | `components/ui/Skeleton.tsx` | `components/Contact.tsx` | ✅ Live | Contact modal pending/loading state。 |

### Usage Audit Summary

- ✅ Live：29
- ⚠️ Indirect only：1 (`CaseBeforeAfter`)
- 🔍 Docs-only：0
- ❌ Unused / misleading：0

`CaseBeforeAfter` 的風險不是「文件造假」，而是 IA 重複：它已經是可見 Case Study catalog item，且自己的 docs page 已揭露 source-level / no route adoption；再把它放進 Component Boundaries 會讓讀者以為它同時是待抽象候選或例外清單。

## 2. API + Token Mapping Audit

| 項目 | Code guidance 判定 | Token 判定 | 問題明細 |
|---|---|---|---|
| Button | ✅ `Button` default export、`href`、`size`、`variant`、`loading` 等 props 與 source 相符 | ✅ `--hm-btn-*` 與 `--disabled` 均存在；`--disabled` 是 `--hm-disabled` legacy alias | 無高優先問題。若後續做 token modernization，可把 docs 說明改成 primary token + legacy alias。 |
| LanguageSwitcher | ✅ import/source 與 Navbar usage 相符 | ✅ `.language-switcher-*` selectors 與 token mappings 有 production CSS | 無高優先問題。`tokens` chip 有 class-name / selector 表示法混用，後續 copy pass 可統一。 |
| Navbar | ✅ source、layout slot、locale behavior 與 production shell 相符 | ✅ nav height/surface/mobile variables 有 production CSS | 無高優先問題。 |
| Footer | ✅ source、social/link boundary 與 production usage 相符 | ✅ footer selectors / global tokens 有 production CSS | 無高優先問題。 |
| Tabs | ✅ `WorkCategoryTabs` props 與 source 相符 | ✅ tab selectors 與 production CSS / module usage 相符 | 無高優先問題。Reference card label 有一處可標準化為 `Live usage`，但不是 API/token 錯誤。 |
| CaseTOC | ✅ default export + `TocSection` type import 正確；props 與 source 相符 | ✅ `.cs-toc*` selectors 與 case-study CSS 相符 | 無 API/token 問題。IA 上應只保留在 visible Navigation，不要再出現在 Component Boundaries item。 |
| ProjectCard | ✅ props / source usage 與 `Works` route 相符 | ✅ card/overlay selectors production-backed | 無 API/token 問題。Hover overlay 應作為 internal boundary，不是獨立 visible component。 |
| CaseHero | ✅ named re-export 與 `CaseInfoItem` type re-export 均存在 | ✅ case hero selectors / case tokens production-backed | 無高優先問題。 |
| CaseSection | ✅ props 與 source 相符 | ✅ `.cs-section*` selectors production-backed | 無高優先問題。Adoption 目前偏 Advantech，但 source contract 正確。 |
| CaseSectionHeader | ✅ props / tone 與 source 相符 | ✅ `.cs-section-header*` selectors production-backed | 無高優先問題。 |
| CaseCard | ✅ `as`、`variant`、`className` 等 props 與 source 相符 | ✅ `.cs-card*` selectors production-backed | 無高優先問題。 |
| CaseGrid | ✅ `variant` contract 與 source 相符 | ✅ `.cs-grid*` selectors production-backed | 無高優先問題。 |
| CaseMedia | ✅ props 與 source 相符 | ✅ `.cs-media*` selectors production-backed | 無高優先問題。 |
| CaseBeforeAfter | ✅ default import path 與 source 相符；props 與 source 相符 | ✅ `.cs-before-after*` selectors / case tokens 存在 | API/token 正確；usage status 是 source-level/no direct route adoption。 |
| BeforeAfterNarrativeFrame | ✅ named import path、`points`、`tone`、slot props 與 source 相符 | ✅ `.cs-before-after-narrative*`、state panel tokens 有 CSS | 無 API/token 問題。Internal `BeforeAfterPanel` 不應被升格為 standalone route pattern。 |
| ZoomableImage | ✅ default/named re-export、labels/lightbox props 與 source 相符 | ✅ lightbox / media selectors production-backed | 無高優先問題。 |
| FlowScrollHint | ✅ default export、`label` prop 與 source 相符 | ✅ flow hint selectors / case tokens production-backed | 無高優先問題。 |
| ProposalTabs | ✅ default export、`tabs` / `labels` / media props 與 source 相符 | ✅ proposal tab selectors production-backed | 無高優先問題。 |
| Toast | ✅ named `Toast` export、`message` / `tone` / `duration` props 與 source 相符 | ✅ toast / alert tokens production-backed | 無高優先問題。Contact route 使用。 |
| Modal | ✅ named `Modal` export、`open` / `onClose` / `title` / `closeLabel` props 與 source 相符 | ✅ modal selectors / overlay tokens production-backed | 無高優先問題。Contact route 使用。 |
| Skeleton | ✅ named `Skeleton` export、`className` / `style` props 與 source 相符 | ✅ skeleton selector / shimmer style production-backed | 無高優先問題。Contact pending state 使用。 |
| FloatingInput | ✅ docs subject 對應 route-local JSX + `.form-field` CSS，非獨立 exported component | ✅ `--surface`、`--line`、`--ink`、`--muted`、`--purple*` aliases 存在 | 無 API/token 問題。應繼續標明 route-local pattern，避免被誤讀為 importable component。 |
| FloatingTextarea | ✅ 同 FloatingInput | ✅ 同 FloatingInput | 無 API/token 問題。應繼續標明 route-local pattern。 |

### API + Token Summary

- 高優先 API mismatch：0
- 高優先 token mismatch：0
- IA / wording cleanup candidates：2
  - `CaseTOC`：visible component 與 boundary reference 重複，建議移出 Component Boundaries item。
  - `CaseBeforeAfter`：API/token 正確，但 visible catalog + extraction candidate 重複，建議只保留在自己的 docs page。

## 3. High-Priority Follow-ups

1. **Component Boundaries 去重**
   - `CaseTOC` 已是 Navigation visible item，Boundary 說明應留在自身 docs page / anatomy / behavior，不應再出現在 Component Boundaries list。
   - `CaseBeforeAfter` 已是 Case Study visible item，且文件已誠實標示 no route adoption；不應再列為 extraction candidate。

2. **空分類處理**
   - 如果移除 `CaseBeforeAfter` 後 `Extraction candidate` 沒有項目，下一輪 implementation 應隱藏該 group 或改成未顯示的未來分類，不要渲染空分類。

3. **Route-local vs importable component 標示**
   - `FloatingInput` / `FloatingTextarea` 是 production-backed route-local pattern，不是可 import 的 shared component。文件目前方向可接受，後續若重整 UI，可在 reference table 中把 `Import` 明確寫成 `N/A`。

4. **Selector / token 表示法一致化**
   - 少數 docs chips 混用 `language-switcher-trigger` 與 `.language-switcher-trigger` 這類表示法。這不影響 runtime，但後續 copy pass 可統一：class selector 用 `.`，CSS custom property 用 `--`。

## 4. Recommended Implementation Scope

本 audit 沒有發現需要立即修 production code 的 API/token 錯誤。下一步應只做 docs IA data cleanup：

- 移除 `ComponentDemo.tsx` Boundary list 中的 `CaseTOC` 與 `CaseBeforeAfter`。
- 將 `BeforeAfterPanel` 保留為 `BeforeAfterNarrativeFrame` 的 internal anatomy / boundary supplement，不提升為 standalone component。
- 隱藏或移除空的 `Extraction candidate` group。
- 更新 docs copy 時避免重複 parent heading / child chip / card title 的同義分類。
