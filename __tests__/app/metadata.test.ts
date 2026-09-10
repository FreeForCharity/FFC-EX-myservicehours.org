import { siteMetadata } from '../../src/lib/siteMetadata'

describe('Site metadata', () => {
  it('should have the correct metadataBase URL', () => {
    expect(siteMetadata.metadataBase?.toString()).toBe('https://freeforcharity.github.io/')
  })

  it('should have a title containing the site name', () => {
    const title = siteMetadata.title as { default: string; template: string }
    expect(title.default).toContain('My Service Hours')
    expect(title.template).toContain('My Service Hours')
  })

  it('should have a description mentioning volunteer hours', () => {
    expect(siteMetadata.description).toContain('volunteer')
    expect(siteMetadata.description!.length).toBeGreaterThan(50)
  })

  it('should have relevant keywords', () => {
    const keywords = siteMetadata.keywords as string[]
    expect(keywords).toContain('volunteer hours')
    expect(keywords).toContain('community service')
    expect(keywords).toContain('PVSA')
  })

  it('should define OpenGraph fields', () => {
    const og = siteMetadata.openGraph as Record<string, unknown>
    expect(og.type).toBe('website')
    expect(og.siteName).toBe('My Service Hours')
    expect(og.url).toBe('https://freeforcharity.github.io/')
    expect(og.images).toBeDefined()
  })

  it('should define Twitter card fields without a configured handle', () => {
    const twitter = siteMetadata.twitter as Record<string, unknown>
    expect(twitter.card).toBe('summary_large_image')
    // No X/Twitter account was found on the live source site.
    expect(twitter.site).toBeUndefined()
  })

  it('should allow indexing and following', () => {
    const robots = siteMetadata.robots as Record<string, unknown>
    expect(robots.index).toBe(true)
    expect(robots.follow).toBe(true)
  })

  it('should define icon and manifest paths', () => {
    expect(siteMetadata.manifest).toBeDefined()
    expect(siteMetadata.icons).toBeDefined()
  })
})
