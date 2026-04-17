"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-2 text-4xl font-bold">Page not found.</h1>
      <p className="mb-8">The page you are looking for does not exist.</p>
      <Button
        nativeButton={false}
        render={(props) => (
          <Link href="/" {...props}>
            Go back home
          </Link>
        )}
      />
    </div>
  )
}
