'use client'

import { useState, useEffect } from 'react'

/**
 * Google Translate via translate.google.com/translate URL
 * This approach works on ALL browsers and bypasses CSP issues.
 * It wraps the current page in Google's translation iframe.
 */
export default function GoogleTranslate() {
  const [isAmharic, setIsAmharic] = useState(false)

  // Detect if we are already inside a Google Translate frame
  useEffect(() => {
    if (typeof window === 'undefined') return
    // Check if current URL shows we came from a GT translation
    const inGT = window.location.hostname.includes('translate.googleusercontent') ||
      document.referrer.includes('translate.google') ||
      window.location.href.includes('_x_tr_')
    setIsAmharic(inGT)
  }, [])

  const toggle = () => {
    if (isAmharic) {
      // Go back to original English
      const original = window.location.href
        .replace(/https:\/\/translate\.googleusercontent\.com\/translate_c\?.*?&u=/, '')
        .replace(/&.*$/, '')
      window.location.href = original || window.location.href
    } else {
      // Redirect to Google Translate version of this page
      const currentUrl = encodeURIComponent(window.location.href)
      window.location.href = `https://translate.google.com/translate?sl=en&tl=am&u=${currentUrl}`
    }
  }

  return (
    <button
      id="gt-toggle-btn"
      onClick={toggle}
      title={isAmharic ? 'Switch to English' : 'ወደ አማርኛ ቀይር — Switch to Amharic'}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: isAmharic ? '#1a6b3c' : '#0d4a28',
        color: 'white',
        border: '2px solid #c8a415',
        borderRadius: '9999px',
        padding: '10px 18px',
        fontSize: '13px',
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(13,74,40,0.5)',
        transition: 'all 0.2s',
        fontFamily: 'system-ui, sans-serif',
        userSelect: 'none',
        outline: 'none',
        textDecoration: 'none',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.06)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/>
        <path d="M2 5h12"/><path d="M7 2h1"/>
        <path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>
      </svg>
      <span style={{ fontFamily: 'Noto Sans Ethiopic, system-ui', fontSize: '14px' }}>
        {isAmharic ? 'English' : 'አማርኛ'}
      </span>
      <span style={{ fontSize: '16px' }}>{isAmharic ? '🌐' : '🇪🇹'}</span>
    </button>
  )
}
