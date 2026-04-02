import { getEnv, requireEnv  } from "./shared";

const getEnvClient = (env: string, defaultValue?: string) => getEnv("NEXT_PUBLIC_" + env, defaultValue); 

const requireEnvClient = (env: string) => requireEnv("NEXT_PUBLIC_" + env);

export const clientConfig = {
    GOOGLE_CLIENT_ID: requireEnvClient("GOOGLE_CLIENT_ID"),
}