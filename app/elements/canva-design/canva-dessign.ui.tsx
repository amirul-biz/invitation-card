// CanvaDesign.tsx
import Image from "next/image";
import { CANVA_IMAGES, CanvaImage } from "../../config/config-app-environment";

export function CanvaDesign() {
  return (
    <>
      {CANVA_IMAGES.map((img: CanvaImage) => (
        <div
          key={img.id}
          className="relative w-full max-w-md mx-auto aspect-[4/7] shadow-md rounded-lg overflow-hidden mb-2"
        >
          <Image
            src={img.url}
            alt={img.alt}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      ))}
    </>
  );
}
