'use client'

import { useEffect, useState, useRef } from 'react'
import { Languages } from 'lucide-react'

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: any
  }
}

export default function GoogleTranslate() {
  const [isAmharic, setIsAmharic] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const retryRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (document.getElementById('google-translate-script')) {
      // Script already loaded — just wait for combo
      waitForCombo()
      return
    }

    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'am,en',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        )
      } catch (e) {
        console.warn('GT init error', e)
      }
      waitForCombo()
    }

    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      if (retryRef.current) clearInterval(retryRef.current)
    }
  }, [])

  function waitForCombo() {
    let attempts = 0
    retryRef.current = setInterval(() => {
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
      attempts++
      if (combo) {
        clearInterval(retryRef.current!)
        setLoaded(true)
        // Detect current language from cookie
        const ck = document.cookie.match(/googtrans=\/en\/(\w+)/)
        if (ck && ck[1] === 'am') setIsAmharic(true)
      }
      if (attempts > 30) clearInterval(retryRef.current!) // give up after 15s
    }, 500)
  }

  function switchLanguage() {
    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
    if (!combo) {
      // Not ready yet — try clicking after a delay
      setTimeout(switchLanguage, 600)
      return
    }
    const next = isAmharic ? '' : 'am'
    combo.value = next
    // Must fire both change and input events
    combo.dispatchEvent(new Event('change', { bubbles: true }))
    combo.dispatchEvent(new Event('input', { bubbles: true }))
    setIsAmharic(!isAmharic)
  }

  return (
    <>
      {/*
        Google REQUIRES this element to be in the DOM and reachable.
        We position it off-screen but NOT display:none — that breaks GT.
      */}
      <div
        id="google_translate_element"
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      {/* Floating language toggle button — always visible bottom-right */}
      <button
        id="gt-toggle-btn"
        onClick={switchLanguage}
        title={isAmharic ? 'Switch to English' : 'Switch to Amharic / አማርኛ'}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#0d4a28',
          color: 'white',
          border: '2px solid #c8a415',
          borderRadius: '9999px',
          padding: '10px 18px',
          fontSize: '13px',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
          transition: 'all 0.2s',
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '0.02em',
          opacity: 1,
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1a6b3c')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0d4a28')}
      >
        {/* Language icon SVG inline so no import issues */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 8 6 6"/>
          <path d="m4 14 6-6 2-3"/>
          <path d="M2 5h12"/>
          <path d="M7 2h1"/>
          <path d="m22 22-5-10-5 10"/>
          <path d="M14 18h6"/>
        </svg>
        <span style={{ fontFamily: 'Noto Sans Ethiopic, system-ui, sans-serif' }}>
          {isAmharic ? 'English' : 'አማርኛ'}
        </span>
        <span style={{ fontSize: '16px' }}>{isAmharic ? '🌐' : '🇪🇹'}</span>
        {!loaded && (
          <span style={{ fontSize: '10px', opacity: 0.7, marginLeft: '2px' }}>...</span>
        )}
      </button>
    </>
  )
}
