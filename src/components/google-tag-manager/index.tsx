'use client'

import Script from 'next/script'
import { GTM_ID, gtmConfigured } from '@/lib/gtmConfig'

export { gtmConfigured }

/**
 * Both components below render nothing at all while gtmConfigured is false
 * (no real container id yet): an earlier version still emitted the GTM
 * loader script and the noscript iframe with an empty `id=` query param,
 * which made a real (failing) third-party request on every page load
 * despite the "no traffic sent anywhere" intent. The Consent Mode bootstrap
 * in layout.tsx initializes `dataLayer` on its own regardless, so cookie
 * consent keeps working either way.
 */
export default function GoogleTagManager() {
  if (!gtmConfigured) return null

  return (
    <>
      {/* Google Tag Manager Script - loaded with lazyOnload for better performance */}
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
    </>
  )
}

// Export a component for the noscript iframe that goes in the body
export function GoogleTagManagerNoScript() {
  if (!gtmConfigured) return null

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}
