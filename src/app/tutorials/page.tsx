import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site.config'
import { pageMetadata } from '@/lib/pageMetadata'
import VideoEmbed from '@/components/video-embed'

export const metadata: Metadata = pageMetadata({
  title: 'Tutorials',
  description: `How-to video tutorials for coordinators and volunteers using ${siteConfig.name}.`,
  path: '/tutorials',
})

// Both videos are the live site's own published tutorials (found at
// myservicehours.org/tutorials/, not linked from the main nav on the source
// site but kept here as real, useful content — see the migration tracking
// issue for the full scope decision on which pages were carried forward).
export default function Tutorials() {
  return (
    <main id="main-content" className="pt-[140px] pb-[80px]">
      <div className="w-[90%] max-w-[720px] mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[40px] leading-[1.15] mb-[16px] text-[#222]">
          Tutorials
        </h1>
        <p className="font-[var(--font-lato)] text-[16px] leading-[26px] text-[#555] mb-[48px]">
          Short video walkthroughs for coordinators registering a group and for volunteers logging
          their own service hours.
        </p>

        <section className="mb-[48px]">
          <h2 className="font-[var(--font-faustina)] text-[24px] mb-[16px] text-[#222]">
            Tutorial for Coordinators
          </h2>
          <VideoEmbed videoId="kW0KN74oi64" title="Tutorial for Coordinators" />
        </section>

        <section>
          <h2 className="font-[var(--font-faustina)] text-[24px] mb-[16px] text-[#222]">
            Tutorial for Volunteers
          </h2>
          <VideoEmbed videoId="Slb95eO2OuE" title="Tutorial for Volunteers" />
        </section>
      </div>
    </main>
  )
}
