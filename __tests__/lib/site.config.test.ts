import {
  canonicalPath,
  cardDescription,
  siteConfig,
  sitePath,
  siteUrl,
  twitterSite,
} from '../../src/lib/site.config'

const originalBasePath = process.env.NEXT_PUBLIC_BASE_PATH

afterEach(() => {
  if (originalBasePath === undefined) {
    delete process.env.NEXT_PUBLIC_BASE_PATH
  } else {
    process.env.NEXT_PUBLIC_BASE_PATH = originalBasePath
  }
})

describe('siteConfig contract', () => {
  it('exposes the full site identity shape used by runtime consumers', () => {
    expect(siteConfig).toMatchObject({
      name: 'My Service Hours',
      tagline: 'Track Volunteer Hours. Earn Recognition.',
      url: 'https://freeforcharity.github.io',
      twitterHandle: '',
      themeColor: '#ffffff',
      vulnerabilityDisclosurePath: '/vulnerability-disclosure-policy',
    })
    expect(siteConfig.description).toContain('volunteer')
    expect(siteConfig.shortDescription.length).toBeGreaterThan(0)
    expect(siteConfig.keywords).toEqual(
      expect.arrayContaining(['volunteer hours', 'community service'])
    )
    // No social media presence was found on the live source site.
    expect(siteConfig.social).toEqual([])
    // No validated EIN/501(c)(3) determination exists yet — never fabricate
    // one. This flips to Level 2 (footer-standard-adoption-checklist)
    // automatically once a validated EIN/GuideStar profile is added.
    expect(siteConfig.ein).toBe('')
    expect(siteConfig.guidestar).toEqual({ profileUrl: '', directProfileUrl: '' })
    // No physical address is known for this charity; showing Free For
    // Charity's own office address would misattribute it as this charity's
    // location, so it stays empty rather than the template default.
    expect(siteConfig.addresses).toEqual([])
    // Free For Charity administers this deployment during Wave-1 migration
    // and its own operational contact is used as the interim channel — see
    // src/lib/site.config.ts.
    expect(siteConfig.contactEmail).toBe('clarkemoyer@freeforcharity.org')
    expect(siteConfig.phone).toEqual({
      display: '(520) 222-8104',
      tel: '5202228104',
    })
    // Permanent "Supported by Free For Charity" footer attribution (FFC
    // footer standard) — the values are intentionally FFC's and must survive
    // template customization.
    expect(siteConfig.supportedBy).toEqual({
      name: 'Free For Charity',
      url: 'https://freeforcharity.org',
      hubUrl: 'https://freeforcharity.org/hub/',
    })
    // Standalone charity by default: no "a project of" parent organization.
    expect(siteConfig.parentOrg).toBeUndefined()
  })

  it('builds same-origin absolute site URLs in the served (canonical) shape', () => {
    delete process.env.NEXT_PUBLIC_BASE_PATH
    // sitePath() is basePath-only and deliberately slash-agnostic.
    expect(sitePath('/')).toBe('/')
    expect(sitePath('/privacy-policy')).toBe('/privacy-policy')
    // canonicalPath() owns the trailingSlash policy; siteUrl() applies both.
    expect(canonicalPath('/')).toBe('/')
    expect(canonicalPath('/privacy-policy')).toBe('/privacy-policy/')
    expect(siteUrl('/')).toBe('https://freeforcharity.github.io/')
    expect(siteUrl('/privacy-policy')).toBe('https://freeforcharity.github.io/privacy-policy/')
    // Files are served verbatim and must not gain a slash.
    expect(siteUrl('/sitemap.xml')).toBe('https://freeforcharity.github.io/sitemap.xml')
    expect(() => siteUrl('privacy-policy')).toThrow(TypeError)
    expect(() => siteUrl('//example.com')).toThrow(TypeError)
    expect(() => canonicalPath('//example.com')).toThrow(TypeError)
  })

  it('builds same-origin URLs that include the GitHub Pages base path', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '/FFC-EX-myservicehours.org'

    expect(sitePath('/')).toBe('/FFC-EX-myservicehours.org/')
    expect(sitePath('/privacy-policy')).toBe('/FFC-EX-myservicehours.org/privacy-policy')
    expect(siteUrl('/')).toBe('https://freeforcharity.github.io/FFC-EX-myservicehours.org/')
    expect(siteUrl('/privacy-policy')).toBe(
      'https://freeforcharity.github.io/FFC-EX-myservicehours.org/privacy-policy/'
    )
    expect(siteUrl('/sitemap.xml')).toBe(
      'https://freeforcharity.github.io/FFC-EX-myservicehours.org/sitemap.xml'
    )
  })

  it('normalizes card metadata helpers', () => {
    // No X/Twitter handle is configured for this site.
    expect(twitterSite()).toBeUndefined()
    expect(cardDescription()).toBe(siteConfig.shortDescription)
  })
})
