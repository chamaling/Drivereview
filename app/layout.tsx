import { Geist_Mono, Inter } from "next/font/google"

import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import Logo from "./components/Logo"
import { logoutAction } from "./actions/logoutAction"
import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Drivereview",
  description:
    "Claim your Google Drive storage back with an automated review assistant.",
  authors: [{ name: "Lamin Bangura" }],
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")
  const isAuthenticated = !!sessionCookie
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <header className="flex">
            <Logo />
            {isAuthenticated && (
              <form action={logoutAction} className="mt-4 mr-4 ml-auto">
                <Button size="sm" variant="outline" type="submit">
                  Logout
                </Button>
              </form>
            )}
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
