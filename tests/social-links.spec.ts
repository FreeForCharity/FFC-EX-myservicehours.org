import { test, expect } from '@playwright/test'

/**
 * Social Links Tests
 *
 * No social media presence was found on the live myservicehours.org source
 * site (no Facebook/X/LinkedIn links anywhere in its content), so this fork
 * ships zero social icons rather than Free For Charity's own accounts —
 * showing FFC's social links under this charity's footer would misrepresent
 * them as belonging to this site.
 */

test.describe('Footer Social Links', () => {
  test('should not render any social media icons', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    for (const label of ['Facebook', 'X (Twitter)', 'LinkedIn', 'GitHub']) {
      await expect(footer.locator(`a[aria-label="${label}"]`)).toHaveCount(0)
    }
  })

  test('should not contain a Google+ social link', async ({ page }) => {
    await page.goto('/')

    const googlePlusLink = page.locator('footer a[href*="plus.google.com"]')
    await expect(googlePlusLink).toHaveCount(0)
  })
})
