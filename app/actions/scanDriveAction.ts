"use server"
import { authClient } from "@/lib/authClient"
import { getDriveFiles } from "@/app/lib/driveAccessor"
import { clientFiltersSchema } from "../schemas/filterSchema"
import ActionError from "@/classes/ActionError"
export const scanDriveAction = authClient
  .inputSchema(clientFiltersSchema)
  .action(
    async ({ parsedInput: clientFilters, ctx }) => {
      try {
        const oauthClient = ctx.oauthClient

        await getDriveFiles(oauthClient, clientFilters)
      } catch {
        throw new ActionError("Failed to scan drive. Please try again.")
      }
    },
    {
      throwServerError: true,
    }
  )
