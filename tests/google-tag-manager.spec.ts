import { test, expect } from '@playwright/test'

/**
 * Google Tag Manager (GTM) Tests
 *
 * No GTM container id is configured for this site yet — GA4/GTM provisioning
 * is a separate, explicitly gated step (see
 * src/components/google-tag-manager/index.tsx). So GoogleTagManager and
 * GoogleTagManagerNoScript render nothing at all: no gtm-script element, no
 * noscript iframe, no request to googletagmanager.com. The Consent Mode
 * bootstrap in the root layout still initializes `dataLayer` on its own,
 * independent of GTM, so cookie-consent plumbing keeps working.
 */

/** Helper: wait for dataLayer to be initialized */
async function waitForDataLayer(page: import('@playwright/test').Page) {
  await page.waitForFunction(
    () => typeof window.dataLayer !== 'undefined' && Array.isArray(window.dataLayer),
    { timeout: 15000 }
  )
}

test.describe('Google Tag Manager (unconfigured)', () => {
  test('does not render a GTM script element', async ({ page }) => {
    await page.goto('/')
    // Give the lazyOnload-strategy script a moment to have appeared if it
    // were going to.
    await page.waitForTimeout(500)

    expect(await page.locator('script[id="gtm-script"]').count()).toBe(0)
    // The CSP meta tag legitimately allowlists googletagmanager.com (ready
    // for when a container id is configured), so check the noscript iframe
    // specifically rather than the whole page content for that string.
    expect(await page.locator('iframe[src*="googletagmanager.com"]').count()).toBe(0)
  })

  test('does not render the GTM preconnect/dns-prefetch hints', async ({ page }) => {
    await page.goto('/')

    expect(await page.locator('link[href="https://www.googletagmanager.com"]').count()).toBe(0)
  })

  test('still initializes dataLayer via the Consent Mode bootstrap', async ({ page }) => {
    await page.goto('/')
    await waitForDataLayer(page)

    const hasDataLayer = await page.evaluate(() => {
      return typeof window.dataLayer !== 'undefined' && Array.isArray(window.dataLayer)
    })
    expect(hasDataLayer).toBe(true)
  })

  test('emits Google Consent Mode defaults from the bootstrap script', async ({ page }) => {
    await page.goto('/')
    await waitForDataLayer(page)
    await page.waitForFunction(
      () =>
        (window.dataLayer || []).some((e) => {
          const args = e as Record<number, unknown> | null | undefined
          return !!args && args[0] === 'consent' && args[1] === 'default'
        }),
      { timeout: 15000 }
    )

    const order = await page.evaluate(() => {
      const bootstrap = document.querySelector('script#consent-mode-default')
      return {
        hasBootstrap: bootstrap !== null,
        bootstrapContent: bootstrap?.textContent ?? '',
      }
    })

    expect(order.hasBootstrap).toBe(true)
    expect(order.bootstrapContent).toContain("'region'")
    expect(order.bootstrapContent).toContain('"GB"')
    expect(order.bootstrapContent).toContain('"CH"')
  })

  test('works with the cookie consent system without any GTM script present', async ({
    page,
    context,
  }) => {
    await context.clearCookies()
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()

    const banner = page.locator('[role="region"][aria-label="Cookie consent notice"]')
    await expect(banner).toBeVisible({ timeout: 15000 })

    await page.getByRole('button', { name: 'Accept All' }).click()
    await waitForDataLayer(page)

    const hasConsentEvent = await page.evaluate(() => {
      if (typeof window.dataLayer === 'undefined') return false
      return window.dataLayer.some((item: { event?: string }) => item.event === 'consent_update')
    })

    expect(hasConsentEvent).toBe(true)
    expect(await page.locator('script[id="gtm-script"]').count()).toBe(0)
  })
})
