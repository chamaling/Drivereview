"use server"
import { authClient } from "@/lib/authClient"
import { getDriveFiles } from "@/app/lib/driveAccessor"
import { clientFiltersSchema } from "../schemas/filterSchema"

export const scanDriveAction = authClient
  .inputSchema(clientFiltersSchema)
  .action(async ({ parsedInput: clientFilters, ctx }) => {
    const oauthClient = ctx.oauthClient

    await getDriveFiles(oauthClient, clientFilters)
  })
