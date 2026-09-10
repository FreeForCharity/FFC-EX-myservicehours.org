import { isConfigured } from '@/lib/consent-mode'

// Google Tag Manager ID.
//
// Left unset for this site: GA4/GTM provisioning is a separate, explicitly
// gated step (see the analytics-provisioning skill / workflows 503 + 505 in
// FFC-Cloudflare-Automation) and has not run for myservicehours.org yet.
// Shipping FFC's own template-default container here would send this site's
// visitor traffic into Free For Charity's own analytics property, which is
// worse than simply not tracking yet.
//
// Deliberately NOT defined inside src/components/google-tag-manager/index.tsx
// (a 'use client' module): a server component (src/app/layout.tsx) that
// imports a plain value from a client-boundary file does not reliably get
// the real value back — it got a truthy client reference instead, which made
// `{gtmConfigured && <link .../>}` always render regardless of GTM_ID.
// Keeping this pair in a plain module both sides can import avoids the
// client-boundary crossing entirely.
export const GTM_ID = ''

/** True once a real container id replaces the empty default above. */
export const gtmConfigured = isConfigured(GTM_ID)
