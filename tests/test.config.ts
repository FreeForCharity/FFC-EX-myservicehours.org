/**
 * Test Configuration for Template Customization
 *
 * This file contains all content-specific values used in E2E tests.
 * When customizing this template for a new organization, update these
 * values to match your content instead of modifying individual test files.
 *
 * This makes it easy to:
 * 1. Identify what needs to change when using the template
 * 2. Keep tests working with customized content
 * 3. Maintain a single source of truth for test expectations
 */

export const testConfig = {
  /**
   * Social Media Links Configuration
   * Used in: tests/social-links.spec.ts
   *
   * No social media presence was found on the live source site — the footer
   * renders zero social icons for this fork (siteConfig.social is empty).
   */
  socialLinks: {},

  /**
   * Copyright Configuration
   * Used in: tests/copyright.spec.ts
   *
   * Level 1 footer (footer-standard-adoption-checklist): no validated EIN/
   * 501(c)(3) determination exists yet, so the copyright line omits the
   * "US 501c3 Non Profit" status claim.
   */
  copyright: {
    text: 'My Service Hours. All Rights Reserved.',
    searchText: 'All Rights Reserved',
    // The permanent "Supported by Free For Charity" attribution (FFC footer
    // standard) — keep these expectations when customizing the template.
    linkUrl: 'https://freeforcharity.org',
    linkText: 'Free For Charity',
  },

  /**
   * Google Tag Manager Configuration
   *
   * No GTM container is configured yet — analytics provisioning is a
   * separate, explicitly gated follow-up. GoogleTagManager and
   * GoogleTagManagerNoScript both render nothing while unconfigured (see
   * src/components/google-tag-manager/index.tsx), so
   * tests/google-tag-manager.spec.ts and tests/smoke.spec.ts assert absence
   * rather than reading an id from here.
   */
  googleTagManager: {
    id: '',
  },

  /**
   * Logo Configuration
   * Used in: tests/footer-only.spec.ts
   */
  logo: {
    headerAlt: 'My Service Hours',
  },

  /**
   * Cookie Consent Configuration
   * Used in: tests/cookie-consent.spec.ts
   */
  cookieConsent: {
    bannerHeading: 'We Value Your Privacy',
    modalHeading: 'Cookie Preferences',
    buttons: {
      acceptAll: 'Accept All',
      declineAll: 'Decline All',
      customize: 'Customize',
      savePreferences: 'Save Preferences',
      cancel: 'Cancel',
    },
  },
}
