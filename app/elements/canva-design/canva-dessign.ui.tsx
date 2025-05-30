// CanvaDesign.tsx
import Image from "next/image";
import { canvaImagesConfig } from "../../config/config-app-environment";
import { CanvaImageConfig } from "@/app/config/config-app-environment-interface";

export function CanvaDesign() {
  return (
    <>
      {canvaImagesConfig.map((img: CanvaImageConfig) => (
        <div
          key={img.id}
          className="relative w-full max-w-md mx-auto aspect-[1200/2100] shadow-md rounded-lg overflow-hidden mb-2"
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
