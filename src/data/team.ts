// Team member data.
//
// The template ships this aggregator reading from ./team/*.json — see the
// FFC Footer-Only Template upstream for that pattern. This fork's live
// WordPress source (myservicehours.org/team/) rendered no team content at
// all, so there is no real roster to migrate. Per the "never fabricate"
// rule, this stays an empty array rather than shipping placeholder people.
// The template's team-section component was not carried into this site's
// homepage for the same reason (see src/app/home-page/index.tsx); this
// export is kept so a future PR can wire up a real roster with no other
// plumbing to add.

export type TeamMember = {
  /** Full name; the first + last initials seed the avatar monogram. */
  name: string
  /** Role or title, e.g. "Founder", "Program Lead", "Treasurer". */
  role: string
  /**
   * Optional LinkedIn profile URL. Must be `https://` on linkedin.com (or a
   * subdomain) to render as a link — TeamMemberCard's `safeLinkedInUrl()`
   * ignores any other host or scheme, so the card shows without a link.
   */
  linkedinUrl?: string
}

export const team: TeamMember[] = []
