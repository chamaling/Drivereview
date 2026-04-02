"use client"
import Script from "next/script"
import { clientConfig } from '@/lib/config/client';
import { Button } from "@/components/ui/button";
export default function GoogleDriveButton() {
  function handleGoogleScriptLoad() {
        google.accounts.oauth2.initCodeClient({
        client_id: clientConfig.GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
        ux_mode: "popup",
        callback: (response) => {
        /* TODO: Handle the authorization response */
        if (response.error) {
            console.error("Error during Google OAuth:", response.error);
            return;
        }

        }
    });

    console.log("Google accounts script loaded successfully.")
  }

  function handleGoogleScriptError() {
    console.error("Failed to load the Google accounts script.")
  }

  return <>
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
      onLoad={handleGoogleScriptLoad}
      onError={handleGoogleScriptError}
    />
    <Button>Connect to Google Drive</Button>
  </>
}
