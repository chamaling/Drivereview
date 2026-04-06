"use server"
import { authClient } from "@/lib/authClient"
import { clientFiltersSchema } from "@/app/schemas/filterSchema"
import { getDriveFiles } from "@/app/lib/driveAccessor"

export const scanDriveAction = authClient
  .inputSchema(clientFiltersSchema)
  .action(async ({ parsedInput, ctx }) => {
    const oauthClient = ctx.oauthClient

    await getDriveFiles(parsedInput, oauthClient)
  })
