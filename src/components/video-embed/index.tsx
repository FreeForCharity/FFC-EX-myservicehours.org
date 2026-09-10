'use client'

import React, { useState } from 'react'

type VideoEmbedProps = {
  /** YouTube video id (the part after `v=` / `embed/`). */
  videoId: string
  /** Accessible title for the iframe once it loads. */
  title: string
}

/**
 * Click-to-load YouTube embed.
 *
 * Loads only a static thumbnail on first render — no iframe, no third-party
 * request — until the visitor explicitly clicks play. The privacy-enhanced
 * youtube-nocookie.com host is used for the iframe itself (see the CSP
 * frame-src entry in src/app/layout.tsx and public/_headers).
 */
export default function VideoEmbed({ videoId, title }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  if (!loaded) {
    // No remote thumbnail is fetched here (e.g. i.ytimg.com) — this repo's
    // hard requirement is zero external asset hosts. Only the video iframe
    // itself, loaded on explicit click, is the allowed external embed.
    return (
      <button
        type="button"
        onClick={() => setLoaded(true)}
        aria-label={`Play video: ${title}`}
        className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-[#1a1a1a]"
        style={{ aspectRatio: '16 / 9' }}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2EA3F2]/90 text-white transition-transform group-hover:scale-110">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7 translate-x-0.5"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="absolute bottom-4 left-4 text-[14px] font-[500] text-white/80">
          {title}
        </span>
      </button>
    )
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '16 / 9' }}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}
