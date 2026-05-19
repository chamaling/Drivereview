"use server"
import { authClient } from "@/lib/authClient"
import { getDriveFiles } from "@/app/lib/driveAccessor"
import { clientFiltersSchema } from "../schemas/filterSchema"
import ActionError from "@/classes/ActionError"
import { type ClassValue } from "clsx"
export const scanDriveAction = authClient
  .inputSchema(clientFiltersSchema)
  .action(
    async ({ parsedInput: clientFilters, ctx }) => {
      try {
        const oauthClient = ctx.oauthClient

        return await getDriveFiles(oauthClient, clientFilters)
      } catch (error) {
        console.error("Error scanning drive:", error)
        throw new ActionError("Failed to scan drive. Please try again.")
      }
    },
    {
      throwServerError: true,
    }
  )

export type drivePriorityMap = NonNullable<
  Awaited<ReturnType<typeof scanDriveAction>>["data"]
>

export type driveFile = drivePriorityMap["all"][number]
