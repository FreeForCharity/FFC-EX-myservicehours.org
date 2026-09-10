import React from 'react'
import { renderToString } from 'react-dom/server'
import GoogleTagManager, {
  GoogleTagManagerNoScript,
  gtmConfigured,
} from '../../src/components/google-tag-manager'

// React suppresses <noscript> children in client-side renders (jsdom).
// We use server-side renderToString to verify the noscript markup.

describe('GoogleTagManager (unconfigured — this site has no GTM container id yet)', () => {
  it('reports itself as not configured', () => {
    expect(gtmConfigured).toBe(false)
  })

  it('renders nothing for the script component (no third-party request)', () => {
    const html = renderToString(<GoogleTagManager />)
    expect(html).toBe('')
    expect(html).not.toContain('googletagmanager.com')
  })

  it('renders nothing for the noscript component (no third-party request)', () => {
    const html = renderToString(<GoogleTagManagerNoScript />)
    expect(html).toBe('')
    expect(html).not.toContain('googletagmanager.com')
  })
})

describe('GoogleTagManager (configured — behavior once a real container id is set)', () => {
  // GTM_ID is a module-level constant, so exercising the "configured" branch
  // means mocking the isConfigured() check it runs through rather than the
  // id itself — this is what the real module will do once GTM_ID stops
  // being ''.
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('@/lib/consent-mode', () => ({
      ...jest.requireActual('@/lib/consent-mode'),
      isConfigured: () => true,
    }))
  })

  afterEach(() => {
    jest.dontMock('@/lib/consent-mode')
  })

  it('flips gtmConfigured to true', () => {
    jest.isolateModules(() => {
      const mod = require('../../src/components/google-tag-manager')
      expect(mod.gtmConfigured).toBe(true)
    })
  })

  it('renders the noscript iframe when configured', () => {
    // The default export renders next/script's <Script>, which needs a full
    // Next.js app-router render tree to execute at all (untestable via plain
    // renderToString, and not exercised by this suite even before this PR —
    // the pre-existing test only ever covered GoogleTagManagerNoScript). The
    // noscript component has no such dependency, so it is what actually
    // proves the "configured" branch renders its real content.
    let noscriptHtml = ''
    jest.isolateModules(() => {
      const mod = require('../../src/components/google-tag-manager')
      noscriptHtml = renderToString(React.createElement(mod.GoogleTagManagerNoScript))
    })

    expect(noscriptHtml).toContain('<noscript>')
    expect(noscriptHtml).toContain('googletagmanager.com/ns.html')
    expect(noscriptHtml).toContain('height="0"')
    expect(noscriptHtml).toContain('width="0"')
    expect(noscriptHtml).toContain('title="Google Tag Manager"')
  })
})
