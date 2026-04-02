import Image from "next/image"
const imageStyle =  {
            "boxShadow": "inset 0 -2px 10px 0 rgba(0, 0, 0, 0.2)",
        }
export default function HeroImage({src, alt}    : {src: string, alt: string}) {
    return <div className="relative"><Image src={src} alt={alt} width={150/1.25} height={50/1.25}  className="rounded-md"
    />
    <div className="rounded-md pointer-events-none inset-0 inset-shadow-sm absolute z-10" style={imageStyle}>

    </div>
    </div>
}