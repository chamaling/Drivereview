import Image from "next/image"
const imageStyle =  {
            "boxShadow": "inset 0 -2px 10px 0 rgba(0, 0, 0, 0.2)",
        }
export default function HeroImage({src, alt}    : {src: string, alt: string}) {
    return <div className="relative w-30 h-20"><Image src={src} alt={alt} className="rounded-md" fill
    />
    <div className="rounded-md pointer-events-none inset-0 inset-shadow-sm absolute z-10" style={imageStyle}>

    </div>
    </div>
}