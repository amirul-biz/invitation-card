// CanvaDesign.tsx
import Image from "next/image";
import { canvaImagesConfig, CanvaImageConfig } from "../../config/config-app-environment";

export function CanvaDesign() {
  return (
    <>
      {canvaImagesConfig.map((img: CanvaImageConfig) => (
        <div
          key={img.id}
          className="relative w-full max-w-md mx-auto aspect-[1240/1748] shadow-md rounded-lg overflow-hidden mb-2"
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
