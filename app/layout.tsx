import type { Metadata } from 'next'
import './globals.css'
import React from "react";
import {Modal} from '@/components/Modal'


export const metadata: Metadata = {
  title: 'Trello',
  description: 'by Vladimir Zloba',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8]">
      {children}

      <Modal/>

      </body>
    </html>
  )
}
