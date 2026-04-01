import Script from "next/script"
export default function GoogleLoader() {
  function handleGoogleScriptLoad() {}
  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
      onLoad={handleGoogleScriptLoad}
    />
  )
}
