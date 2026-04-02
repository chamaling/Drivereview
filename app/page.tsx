import { Button } from "@/components/ui/button"
import GoogleDriveButton from "./components/GoogleDriveButton"
export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <header>{/* TODO: add icon */}</header>
      <main>
        <h1>Claim your Google Drive storage back</h1>
        <GoogleDriveButton />
      </main>
      <footer>
        <p>
          &copy; {new Date().getFullYear()} Lamin Bangura. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
