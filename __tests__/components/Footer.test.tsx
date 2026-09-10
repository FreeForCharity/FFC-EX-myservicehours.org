import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Footer from '../../src/components/footer'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

describe('Footer component', () => {
  it('should render the footer', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  // Level 1 footer (footer-standard-adoption-checklist): this charity has no
  // validated EIN/501(c)(3) determination yet, so the Endorsements column
  // (GuideStar seal + EIN line) must not render at all rather than showing
  // fabricated values.
  it('should NOT display the Endorsements section (no validated EIN yet)', () => {
    render(<Footer />)
    expect(screen.queryByText('Endorsements')).not.toBeInTheDocument()
    expect(screen.queryByText(/EIN:/)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/GuideStar Profile/)).not.toBeInTheDocument()
  })

  it('should display Quick Links section', () => {
    render(<Footer />)
    expect(screen.getByText('Quick Links')).toBeInTheDocument()
  })

  it('should display Contact Us section with contact information', () => {
    render(<Footer />)
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  it('should display the current year in copyright', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
  })

  it('should have email contact link', () => {
    render(<Footer />)
    const emailLink = screen.getByText('clarkemoyer@freeforcharity.org').closest('a')
    expect(emailLink).toHaveAttribute('href', 'mailto:clarkemoyer@freeforcharity.org')
  })

  it('should have phone contact link', () => {
    render(<Footer />)
    expect(screen.getByText('(520) 222-8104').closest('a')).toHaveAttribute(
      'href',
      'tel:5202228104'
    )
  })

  it('should not render any social media icons (none exist for this site)', () => {
    render(<Footer />)
    expect(screen.queryByLabelText('Facebook')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('X (Twitter)')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('LinkedIn')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('GitHub')).not.toBeInTheDocument()
  })

  it('should not render any Google Maps address links (no address is known)', () => {
    render(<Footer />)
    expect(screen.queryByText('Main Address')).not.toBeInTheDocument()
  })

  it('should display the site Policy section', () => {
    render(<Footer />)
    expect(screen.getByText('My Service Hours Policy')).toBeInTheDocument()
  })

  it('should have policy links with correct hrefs', () => {
    render(<Footer />)
    const policyLinks = [
      { text: 'My Service Hours Privacy Policy', href: '/privacy-policy' },
      { text: 'My Service Hours Cookie Policy', href: '/cookie-policy' },
      { text: 'My Service Hours Terms of Service', href: '/terms-of-service' },
      // FFC's own donation policy: label hardcoded to FFC on purpose.
      { text: 'Free For Charity Donation Policy', href: '/free-for-charity-donation-policy' },
      // The charity's own donation policy (label follows siteConfig.name
      // interpolation on the other entries, but this one is fixed).
      { text: 'Donation Policy', href: '/donation-policy' },
    ]

    for (const { text, href } of policyLinks) {
      const link = screen.getByText(text).closest('a')
      expect(link).toHaveAttribute('href', href)
    }
  })

  it('should have quick links matching this site pages plus the hub login link', () => {
    render(<Footer />)
    const quickLinks = [
      { text: 'Home', href: '/' },
      { text: 'Tutorials', href: '/tutorials' },
      { text: 'VT SEVA Coordinators', href: 'https://www.vtsworld.org/locations' },
      { text: 'JET USA Coordinators', href: 'https://www.jetusa.org/locations' },
    ]

    for (const { text, href } of quickLinks) {
      const link = screen.getByText(text).closest('a')
      expect(link).toHaveAttribute('href', href)
    }

    // FFC footer standard: the hub login link is always rendered and points
    // at siteConfig.supportedBy.hubUrl.
    const hubLink = screen.getByText('Supported Charity Login').closest('a')
    expect(hubLink).toHaveAttribute('href', 'https://freeforcharity.org/hub/')
    expect(hubLink).toHaveAttribute('target', '_blank')
    expect(hubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should display the permanent "Supported by Free For Charity" attribution in copyright bar, without an unearned 501(c)(3) claim', () => {
    render(<Footer />)
    const copyright = screen.getByText((_, node) => {
      return (
        node?.tagName.toLowerCase() === 'p' && node.textContent?.includes('All Rights') === true
      )
    })
    expect(copyright).toHaveTextContent('My Service Hours')
    expect(copyright).not.toHaveTextContent('501c3')
    // FFC footer standard: the attribution is always rendered and links to FFC.
    expect(copyright).toHaveTextContent('Supported by Free For Charity')
    const link = screen.getByText('Free For Charity')
    expect(link.closest('a')).toHaveAttribute('href', 'https://freeforcharity.org')
  })

  it('should not have accessibility violations', async () => {
    const { container } = render(<Footer />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
