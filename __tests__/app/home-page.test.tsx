import React from 'react'
import { render, screen } from '@testing-library/react'

import HomePage from '../../src/app/home-page'

describe('HomePage (app/home-page)', () => {
  it('should render without crashing', () => {
    render(<HomePage />)
  })

  it('should render the real hero heading, not a placeholder', () => {
    render(<HomePage />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Enter your volunteer service hours' })
    ).toBeInTheDocument()
  })

  it('should link to the Tutorials page', () => {
    render(<HomePage />)
    expect(screen.getByRole('link', { name: 'Watch the tutorials' })).toHaveAttribute(
      'href',
      '/tutorials'
    )
  })

  it('should link out to the VT SEVA and JET USA coordinator networks', () => {
    render(<HomePage />)
    expect(screen.getByRole('link', { name: /VT SEVA Coordinators/ })).toHaveAttribute(
      'href',
      'https://www.vtsworld.org/locations'
    )
    expect(screen.getByRole('link', { name: /JET USA Coordinators/ })).toHaveAttribute(
      'href',
      'https://www.jetusa.org/locations'
    )
  })

  // This fork's live WordPress source had no team page content — the
  // template's sample-team block is intentionally not mounted here rather
  // than shown with fabricated members. See src/data/team.ts.
  it('does not render a team section (no real team data exists for this charity)', () => {
    render(<HomePage />)
    expect(screen.queryByTestId('team-member-card')).not.toBeInTheDocument()
    expect(screen.queryByText('The Free For Charity Team')).not.toBeInTheDocument()
  })
})
