import type { Metadata } from 'next'
import { siteConfig, siteUrl } from '@/lib/site.config'

export const metadata: Metadata = {
  title: `Donation Policy | ${siteConfig.name}`,
  description: `Donation Policy for ${siteConfig.name}`,
  // Own canonical: without it Next inherits the layout's, which points at the home page.
  alternates: { canonical: siteUrl('/donation-policy') },
}

export default function DonationPolicy() {
  return (
    <main id="main-content" className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          Donation Policy
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            <strong>Effective Date:</strong> September 10, 2026
          </p>

          <h2 className="font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4">
            Tax Deductibility
          </h2>
          <p>
            {siteConfig.name} does not currently accept donations through this website, and no
            501(c)(3) tax-exempt determination has been published for this organization. This page
            will be updated with tax-deductibility information if and when that changes — it is
            published here to reserve the policy location under the Free For Charity standard, not
            to make a tax claim ahead of one being verified.
          </p>

          <h2 className="font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4">
            Use of Donations
          </h2>
          <p>
            {siteConfig.name} coordinates volunteer hour tracking for community service groups
            working toward the U.S. President&apos;s Volunteer Service Award and the Jeeyar Awards
            for Volunteerism, in partnership with the VT SEVA and JET USA volunteer networks.
          </p>

          <h2 className="font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4">
            Donation Processing
          </h2>
          <p>
            This website does not process donations. If {siteConfig.name} begins accepting donations
            in the future, this section will describe how they are processed and how receipts are
            issued.
          </p>

          <h2 className="font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4">
            Privacy
          </h2>
          <p>
            Should this site begin accepting donations, donor information would be kept confidential
            and would not be shared with third parties except as required by law.
          </p>

          <h2 className="font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4">
            Contact Us
          </h2>
          <p>For questions about this policy, please contact us at:</p>
          <p>
            Email:{' '}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-primary hover:underline">
              {siteConfig.contactEmail}
            </a>
            <br />
            Phone: {siteConfig.phone.display}
          </p>
        </div>
      </div>
    </main>
  )
}
