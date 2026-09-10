import React from 'react'
import Link from 'next/link'
import { assetPath } from '@/lib/assetPath'
import { siteConfig } from '@/lib/site.config'

// This site's live WordPress source had no team page content (the /team/
// page rendered empty) — the template's sample-team block is intentionally
// not mounted here rather than shown with fabricated members.
const index = () => {
  return (
    <div id="hero" className="pt-[100px] pb-[80px]">
      <div className="w-[90%] max-w-[900px] mx-auto text-center">
        <img
          src={assetPath('/Images/hero-banner.png')}
          alt={siteConfig.name}
          width={1391}
          height={257}
          className="mx-auto mb-[40px] h-auto w-full max-w-[560px]"
        />

        <h1 className="font-[var(--font-faustina)] text-[36px] md:text-[48px] leading-[1.15] mb-[24px] text-[#222]">
          Enter your volunteer service hours
        </h1>

        <p className="font-[var(--font-lato)] text-[18px] leading-[28px] text-[#555] mb-[36px] max-w-[640px] mx-auto">
          My Service Hours helps volunteers log community service hours to become eligible for the
          U.S. President&apos;s Volunteer Service Award and the Jeeyar Awards for Volunteerism.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-[16px]">
          <Link
            href="/tutorials"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#2EA3F2] bg-[#2EA3F2] px-8 py-3 text-[16px] font-[600] text-white transition-colors hover:bg-[#1c86cf] hover:border-[#1c86cf]"
          >
            Watch the tutorials
          </Link>
        </div>
      </div>

      <div className="w-[90%] max-w-[900px] mx-auto mt-[64px] border-t border-[#e5e5e5] pt-[48px] text-center">
        <h2 className="font-[var(--font-faustina)] text-[26px] mb-[16px] text-[#222]">
          Coordinated with local volunteer networks
        </h2>
        <p className="font-[var(--font-lato)] text-[16px] leading-[26px] text-[#555] max-w-[640px] mx-auto mb-[24px]">
          My Service Hours coordinates with the VT SEVA and JET USA volunteer networks. Reach a
          coordinator in your area through either organization&apos;s own site.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-[24px] font-[600] text-[16px]">
          <a
            href="https://www.vtsworld.org/locations"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2EA3F2] hover:underline"
          >
            VT SEVA Coordinators →
          </a>
          <a
            href="https://www.jetusa.org/locations"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2EA3F2] hover:underline"
          >
            JET USA Coordinators →
          </a>
        </div>
      </div>
    </div>
  )
}

export default index
