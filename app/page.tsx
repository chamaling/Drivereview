import GoogleDriveButton from "./components/GoogleDriveButton"
import HeroArrowConnectorIcon from "./components/HeroArrowConnectorIcon"
export default function Page() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <header>{/* TODO: add icon */}</header>
      <main className="flex flex-col items-center gap-4 flex-1 justify-center">
        <h1 className="text-4xl md:text-5xl font-semibold ">Claim your Google Drive storage back</h1>
        <p className="text-center text-muted-foreground mb-8">Drivereview analyzes your Google Drive usage and gives best recommendations for optimizing your storage.</p>
        <GoogleDriveButton />
      <ol className="mt-16 text-lg text-muted-foreground flex flex-row items-center gap-x-4">
        <li className="mr-2">Connect to Drive</li>
        <HeroArrowConnectorIcon />
        <li>We scan storage usage</li> 
        <HeroArrowConnectorIcon />
        <li>Get cleanup recommendations</li>
      </ol>
      </main>
      <footer className="mt-auto text-sm text-secondary-foreground">
        <p>
          &copy; {new Date().getFullYear()} Lamin Bangura. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
