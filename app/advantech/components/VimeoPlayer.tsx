'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import type { Locale } from '../../../i18n/routing';
import { translateAdvantech } from '../i18n';

type Props = {
  videoId: string;
  poster: string;
  title: string;
};

/**
 * 點擊播放的 Vimeo facade：
 * 平常顯示客製 poster（內含播放鍵），點擊後才載入 Vimeo 播放器，
 * 避免一進頁面就載入 Vimeo 的播放器 JS、保留乾淨無 logo 的封面。
 */
export default function VimeoPlayer({ videoId, poster, title }: Props) {
  const [active, setActive] = useState(false);
  const locale = useLocale() as Locale;

  return (
    <div className="cs-sol-vplayer">
      {active ? (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&autoplay=1&app_id=58479`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          className="cs-sol-vframe"
        />
      ) : (
        <button
          type="button"
          className="cs-sol-vplay"
          aria-label={`${translateAdvantech(locale, "播放")}：${title}`}
          onClick={() => setActive(true)}
        >
          <Image
            src={poster}
            alt={title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 960px"
            style={{ objectFit: 'cover' }}
          />
        </button>
      )}
    </div>
  );
}
