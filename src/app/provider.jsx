'use client';
import React from 'react'
import { ThemeProvider } from "@/components/theme-provider";
import { MessagesContext } from "@/context/MessagesContext";

export function Provider({
  children
}) {
  const [messages, setMessages] = React.useState({ role: "", content: "" });
  return (
    <MessagesContext.Provider value={{messages, setMessages}}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </MessagesContext.Provider>
  )
}

export default Provider