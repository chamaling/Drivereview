import { Exo_2 } from "next/font/google"

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-logo",
  weight: "500",
})
export default function Logo() {
  return (
    <h1 className={`${exo2.className} mt-2 ml-4 text-4xl`}>
      <span className="text-primary">Drive</span>
      <span>review</span>
    </h1>
  )
}
