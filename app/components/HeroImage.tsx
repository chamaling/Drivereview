import Image from "next/image"
const imageStyle = {
  boxShadow: "inset 0 -2px 10px 0 rgba(0, 0, 0, 0.2)",
}
export default function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-auto w-48 md:w-60">
      <Image
        src={src}
        alt={alt}
        className="rounded-md"
        width={1920}
        height={1080}
      />
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-md inset-shadow-sm"
        style={imageStyle}
      ></div>
    </div>
  )
}
