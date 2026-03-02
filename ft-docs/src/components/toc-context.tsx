"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface TocItem {
  id: string
  title: string
  level: number
}

interface TocContextValue {
  items: TocItem[]
  setItems: (items: TocItem[]) => void
  activeId: string
  setActiveId: (id: string) => void
}

const TocContext = createContext<TocContextValue>({
  items: [],
  setItems: () => {},
  activeId: "",
  setActiveId: () => {},
})

export function TocProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState("")

  return (
    <TocContext.Provider value={{ items, setItems, activeId, setActiveId }}>
      {children}
    </TocContext.Provider>
  )
}

export function useToc() {
  return useContext(TocContext)
}
