'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Lang } from './i18n'

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
}

const LangContext = createContext<LangContextType>({ lang: 'en', setLang: () => {}, toggle: () => {} })

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('dessie_lang') as Lang | null
    if (saved === 'am' || saved === 'en') setLangState(saved)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('dessie_lang', l)
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
