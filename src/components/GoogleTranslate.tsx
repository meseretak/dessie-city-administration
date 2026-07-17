'use client'

import { useState, useEffect } from 'react'

/**
 * Google Translate Native In-Page Implementation
 * Replaces the buggy iframe redirect with the native widget.
 * This ensures it works seamlessly across static and dynamic Next.js routes.
 */
export default function GoogleTranslate() {
  const [isAmharic, setIsAmharic] = useState(false)

  useEffect(() => {
    // Check if the script is already added
    if (!document.getElementById('google-translate-script')) {
      const addScript = document.createElement('script')
      addScript.id = 'google-translate-script'
      addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      addScript.async = true
      document.body.appendChild(addScript)
      
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'en,am', autoDisplay: false },
          'google_translate_element'
        )
      }
    }

    // Check cookies to see if Amharic is currently selected
    const checkLang = () => {
      const hasGoogTrans = document.cookie.includes('googtrans=/en/am')
      setIsAmharic(hasGoogTrans)
    }
    
    checkLang()
    const interval = setInterval(checkLang, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggle = () => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement
    if (!select) return

    const targetLang = isAmharic ? 'en' : 'am'
    select.value = targetLang
    select.dispatchEvent(new Event('change'))
    
    // If returning to English, sometimes we have to clear the cookie and reload to clear DOM completely
    if (targetLang === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=' + window.location.hostname + '; path=/;'
      setIsAmharic(false)
      window.location.reload()
    } else {
      setIsAmharic(true)
    }
  }

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      <button
        id="gt-toggle-btn"
        onClick={toggle}
        title={isAmharic ? 'Switch to English' : 'ወደ አማርኛ ቀይር — Switch to Amharic'}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
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
    </>
  )
}

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}
