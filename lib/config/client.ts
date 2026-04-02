const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
if (!GOOGLE_CLIENT_ID) {
    throw new Error("Environment variable NEXT_PUBLIC_GOOGLE_CLIENT_ID is required but not defined.")
}

export const clientConfig = {
    GOOGLE_CLIENT_ID,
}