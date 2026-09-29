import { test, expect } from '@playwright/test'
import { testConfig } from './test.config'

/**
 * Homepage + Footer smoke tests for the myservicehours.org migration.
 *
 * This fork's live WordPress source had no team page content, so the
 * template's sample-team block is not mounted — the homepage instead
 * renders this charity's own real content (hero + coordinator links).
 */

test.describe('My Service Hours homepage', () => {
  test('should render the real hero content, not template placeholder text', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('heading', { level: 1, name: 'Enter your volunteer service hours' })
    ).toBeVisible()
    await expect(page.getByAltText(testConfig.logo.headerAlt).first()).toBeVisible()
  })

  test('should link out to the VT SEVA and JET USA coordinator networks', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('link', { name: 'VT SEVA Coordinators', exact: false }).first()
    ).toHaveAttribute('href', 'https://www.vtsworld.org/locations')
    await expect(
      page.getByRole('link', { name: 'JET USA Coordinators', exact: false }).first()
    ).toHaveAttribute('href', 'https://www.jetusa.org/locations')
  })

  test('should render the Footer', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('footer')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Quick Links' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible()
    // No EIN (not a charity) and no Candid profile yet: the Endorsements column
    // shows only the GuideStar placeholder, and no bare "EIN:" line.
    await expect(page.getByText('GuideStar / Candid Profile')).toBeVisible()
    await expect(page.locator('footer').getByText(/ EIN:/)).toHaveCount(0)
  })
})
