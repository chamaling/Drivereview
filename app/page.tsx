import GoogleDriveButton from "./components/GoogleDriveButton"
import HeroArrowConnectorIcon from "./components/HeroArrowConnectorIcon"
import HeroImage from "./components/HeroImage"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <main className="mt-16 flex flex-1 flex-col items-center justify-center gap-4 px-2 md:mt-0">
        <h1 className="w-full max-w-4xl px-4 text-center text-2xl font-semibold sm:text-4xl">
          Claim your Google Drive storage back
        </h1>
        <p className="mb-8 text-center text-xs text-muted-foreground md:text-lg">
          Drivereview analyzes your Google Drive usage and identifies
          opportunities to optimize your storage.
        </p>
        <GoogleDriveButton />
        <ol className="mt-8 grid grid-cols-1 items-end gap-x-16 gap-y-8 text-lg text-muted-foreground *:relative *:flex *:flex-col *:items-center *:gap-y-4 *:text-center *:text-sm md:mt-16 md:grid-cols-[repeat(3,minmax(150px,1fr))] *:md:text-lg">
          <li className="mr-2">
            Connect to Drive <HeroArrowConnectorIcon />
            <HeroImage
              src="/placeholder.svg"
              alt="Picture of google drive with untitled document and important document"
            />
          </li>
          <li>
            We scan storage usage <HeroArrowConnectorIcon />
            <HeroImage
              src="/placeholder.svg"
              alt="Picture of web app scanning google drive storage"
            />
          </li>
          <li>
            Get cleanup recommendations
            <HeroImage
              src="/placeholder.svg"
              alt="Picture of web app showing recommendations for optimizing google drive storage"
            />
          </li>
        </ol>
        <div className="mt-4 flex flex-row items-center gap-x-4"></div>
      </main>
      <Separator className="max-w-1/2" />
      <footer className="mt-auto mb-12 text-sm text-secondary-foreground md:mb-2">
        <p>
          &copy; {new Date().getFullYear()} Lamin Bangura. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
