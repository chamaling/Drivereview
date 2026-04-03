"use client"
import Script from "next/script"
import { clientConfig } from '@/lib/config/client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef } from "react";
import { useState } from "react";
export default function GoogleDriveButton() {
  const codeClient = useRef<google.accounts.oauth2.CodeClient | null>(null);
  const [error, setError] = useState<string | null>(null);
  function handleGoogleScriptLoad() {
        codeClient.current = google.accounts.oauth2.initCodeClient({
        client_id: clientConfig.GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
        ux_mode: "popup",
        callback: (response) => {
        /* TODO: Handle the authorization response */
        if (response.error) {
            console.error("Error during Google OAuth:", response.error);
            setError("Failed to connect to Google Drive. Please try again.");
            return;
        }

          console.log("Authorization code received:", response.code);
        }
    });

    console.log("Google accounts script loaded successfully.")
  }

  function handleGoogleScriptError() {
    setError("Failed to load Google, please refresh the page and try again.");
  }

  function handleButtonClick() {
    if (codeClient.current) {
      codeClient.current.requestCode();
    } else {
      setError("Failed to initialize Google OAuth client.");
    }
  }
  return <>
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
      onLoad={handleGoogleScriptLoad}
      onError={handleGoogleScriptError}
    />
    <Button className="py-5" onClick={handleButtonClick}>
      <Image src="/google-drive-icon.png" alt="Google Drive Icon" width={1280/60} height={1144/60} className="mr-2" />
      Connect to Google Drive</Button>
      {error && <p className="text-destructive text-xs text-center">{error}</p>}
  </>
}
