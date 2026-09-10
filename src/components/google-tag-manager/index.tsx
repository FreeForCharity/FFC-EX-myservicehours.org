'use client'

import Script from 'next/script'

// Google Tag Manager ID.
//
// Left unset for this site: GA4/GTM provisioning is a separate, explicitly
// gated step (see the analytics-provisioning skill / workflows 503 + 505 in
// FFC-Cloudflare-Automation) and has not run for myservicehours.org yet.
// Shipping FFC's own template-default container here would send this site's
// visitor traffic into Free For Charity's own analytics property, which is
// worse than simply not tracking yet. The script below still initializes
// `dataLayer` and the Consent Mode bootstrap locally either way, so cookie
// consent and the rest of the analytics plumbing keep working once a real
// container id is added.
const GTM_ID = ''

export default function GoogleTagManager() {
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
