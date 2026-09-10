import { team } from '../../src/data/team'

describe('Team data integrity', () => {
  // This fork's live WordPress source had no team page content — the
  // roster stays empty rather than shipping fabricated members. See
  // src/data/team.ts.
  it('is empty (no real team data exists for this charity yet)', () => {
    expect(team).toEqual([])
  })

  // it.each errors on an empty table, and the table IS empty for this fork
  // (see the `is empty` test above) — guard rather than call it.each([]).
  if (team.length > 0) {
    it.each(team)('team member "$name" should have required fields', (member) => {
      expect(member.name).toBeDefined()
      expect(typeof member.name).toBe('string')
      expect(member.name.trim().length).toBeGreaterThan(0)

      expect(member.role).toBeDefined()
      expect(typeof member.role).toBe('string')
      expect(member.role.trim().length).toBeGreaterThan(0)

      // Photos were removed in favor of initials monograms — no imageUrl field.
      expect('imageUrl' in member).toBe(false)

      // linkedinUrl is optional; when set it must be an https:// URL on
      // linkedin.com (or a subdomain) — the only shape TeamMemberCard turns
      // into a link (safeLinkedInUrl). Enforcing the host here means bad
      // data fails the suite instead of silently rendering as a non-link.
      if (member.linkedinUrl !== undefined) {
        expect(member.linkedinUrl).toMatch(/^https:\/\/([a-z0-9-]+\.)*linkedin\.com(\/|$)/i)
      }
    })
  }

  it('should have no duplicate names', () => {
    const names = team.map((m) => m.name)
    expect(new Set(names).size).toBe(names.length)
  })
})
