/**
 * Next 的預設 prefetch（kind: 'auto'）對「動態路由」只抓到最近的 loading 邊界，
 * 真正的 RSC payload 還是等到導頁當下才抓。這站所有頁面都是 ƒ (Dynamic)，
 * 所以那段網路會落在 View Transition 的 callback 裡——畫面被凍住等網路回來，
 * 實測 production 130–230ms、dev 200–500ms，感覺就是「按完頓一下才跑動畫」。
 *
 * kind: 'full' 會把整份 payload 先抓進 router cache，導頁當下不再發請求
 * （實測凍結從 ~200ms 降到 ~30ms）。PrefetchKind 是 Next 內部的 enum，
 * 這裡用結構型別轉換避開 next/dist 深層 import。
 */
type RouterLike = { prefetch: (...args: never[]) => void };
type FullPrefetch = (href: string, options: { kind: 'full' }) => void;

export function prefetchFullRoute(router: RouterLike, href: string) {
  try {
    (router.prefetch as unknown as FullPrefetch)(href, { kind: 'full' });
  } catch {
    // prefetch 失敗只影響順暢度，不該擋住導頁
  }
}
