import type { Metadata } from "next"

import "./styles/globals.css"

export const metadata: Metadata = {
  title: `Snake3`,
  description: `Snake3`,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  )
}
