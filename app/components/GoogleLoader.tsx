"use client"
import Script from "next/script"
export default function GoogleLoader() {
  function handleGoogleScriptLoad() {
    console.log("Google accounts script loaded successfully.")
  }

  function handleGoogleScriptError() {
    console.error("Failed to load the Google accounts script.")
  }

  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
      onLoad={handleGoogleScriptLoad}
      onError={handleGoogleScriptError}
    />
  )
}
