'use client'
import { SessionProvider } from "next-auth/react"
import React from "react"


interface Props{
  children: React.ReactNode,
  session?: any;
}


const Provider : React.FC<Props>= ({children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider