'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Lang } from './i18n'

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
}

const LangContext = createContext<LangContextType>({ lang: 'en', setLang: () => {}, toggle: () => {} })

export function LangProvider({ children, initialLang = 'en' }: { children: React.ReactNode, initialLang?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    const saved = localStorage.getItem('dessie_lang') as Lang | null
    if (saved && saved !== initialLang) {
      setLang(saved)
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('dessie_lang', l)
    document.cookie = `dessie_lang=${l}; path=/; max-age=31536000`
    
    // If the language changed from the server-rendered one, refresh to get translated metadata/SSR
    if (l !== initialLang) {
      window.location.reload()
    }
  }

  const toggle = () => setLang(lang === 'en' ? 'am' : 'en')

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
