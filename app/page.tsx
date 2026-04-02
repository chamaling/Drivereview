import GoogleDriveButton from "./components/GoogleDriveButton"
import HeroArrowConnectorIcon from "./components/HeroArrowConnectorIcon"
import HeroImage from "./components/HeroImage"
export default function Page() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <header>{/* TODO: add icon */}</header>
      <main className="flex flex-col items-center gap-4 flex-1 justify-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-center">Claim your Google Drive storage back</h1>
        <p className="text-center text-muted-foreground mb-8">Drivereview analyzes your Google Drive usage and gives best recommendations for optimizing your storage.</p>
        <GoogleDriveButton />
      <ol className="mt-16 text-lg text-muted-foreground grid grid-cols-[repeat(3,minmax(150,1fr))] items-center gap-x-16 *:flex *:items-center *:relative *:flex-col *:gap-y-4 *:text-center">
        <li className="mr-2">Connect to Drive <HeroArrowConnectorIcon />
      <HeroImage
      src="/placeholder.svg"
      alt="Picture of google drive with untitled document and important document"
      />
        </li>
        <li>We scan storage usage <HeroArrowConnectorIcon />
        
      <HeroImage
      src="/placeholder.svg"
      alt="Picture of web app scanning google drive storage"
      />
        </li>
        <li>Get cleanup recommendations

      <HeroImage
      src="/placeholder.svg"
      alt="Picture of web app showing recommendations for optimizing google drive storage"
      />
        </li>
      </ol>
      <div className="mt-4 flex flex-row items-center gap-x-4">
      </div>
      </main>
      <footer className="mt-auto text-sm text-secondary-foreground">
        <p>
          &copy; {new Date().getFullYear()} Lamin Bangura. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
