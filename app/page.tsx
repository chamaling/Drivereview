import GoogleDriveButton from "./components/GoogleDriveButton"
import HeroArrowConnectorIcon from "./components/HeroArrowConnectorIcon"
import HeroImage from "./components/HeroImage"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <header>{/* TODO: add icon */}</header>
      <main className="flex flex-col gap-4 flex-1 justify-center items-center mt-16 md:mt-0 px-2">
        <h1 className= "w-full max-w-4xl px-4 text-2xl sm:text-4xl font-semibold text-center">Claim your Google Drive storage back</h1>
        <p className="text-center text-muted-foreground mb-8 text-xs md:text-lg">Drivereview analyzes your Google Drive usage and gives best recommendations for optimizing your storage.</p>
        <GoogleDriveButton />
      <ol className=" mt-8 md:mt-16 text-lg text-muted-foreground grid grid-cols-1 md:grid-cols-[repeat(3,minmax(150px,1fr))] items-end gap-x-16 gap-y-8 *:flex *:items-center *:relative *:flex-col *:gap-y-4 *:text-center *:text-sm *:md:text-lg">
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
      <Separator className="max-w-1/2"/>
      <footer className="mt-auto text-sm text-secondary-foreground mb-12 md:mb-2">
        <p>
          &copy; {new Date().getFullYear()} Lamin Bangura. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
