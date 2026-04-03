import { actionClient } from '@/lib/actionClient';
import { z } from 'zod';

export const authenticateUserAction = actionClient.inputSchema(
    z.object({
        code: z.string()
    })
).action(async ({parsedInput}) => {
    const {code} = parsedInput;
    console.log("Received authorization code in action:", code);
})