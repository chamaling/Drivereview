import "server-only"
import { createSafeActionClient } from "next-safe-action"
import ActionError from "@/classes/ActionError"
export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    console.error("Action error: ", error)

    if (error instanceof ActionError) {
      return error.message
    }

    return "An unexpected error occurred."
  },
})
