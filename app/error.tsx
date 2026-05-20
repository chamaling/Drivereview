"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import ActionError from "@/classes/ActionError"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  console.error("Error in dashboard page:", error)
  const isActionError = error instanceof ActionError
  const errorMessage = isActionError
    ? error.message
    : "An unexpected error occurred. Please try again."
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-2 text-4xl font-bold">An error occurred.</h1>
      <p className="mb-8">{errorMessage}</p>
      <Button
        onClick={() => {
          router.replace("/")
          reset()
        }}
      >
        Go back home
      </Button>
      <small className="mt-2 text-gray-500">
        Error ID: {error.digest ?? "Unknown"}
      </small>
    </div>
  )
}
