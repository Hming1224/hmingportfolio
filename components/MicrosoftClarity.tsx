import Script from "next/script";

export default function MicrosoftClarity() {
  const id = process.env.NEXT_PUBLIC_CLARITY_ID || "x88rcqjtre";
  if (!id) return null;

  return (
    // lazyOnload：等頁面閒置才載入，避免與首屏渲染搶主執行緒（PSI 主執行緒 2.1s 的第三方部分）
    <Script id="ms-clarity" strategy="lazyOnload">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${id}");`}
    </Script>
  );
}
