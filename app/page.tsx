import { Button } from "@/components/ui/button"
import GoogleDriveButton from "./components/GoogleDriveButton"
export default function Page() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <header>{/* TODO: add icon */}</header>
      <main className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-semibold">Claim your Google Drive storage back</h1>
        <p className="text-center text-muted-foreground">Drivereview analyzes your Google Drive usage and gives best recommendations for optimizing your storage.</p>
        <GoogleDriveButton />
      </main>
      <footer className="mt-auto text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Lamin Bangura. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
