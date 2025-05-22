// BaseBackground.tsx
import Image from "next/image";
import { BASE_BACKGROUND_IMAGE } from "../../config/config-app-environment";

export function BaseBackground() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/7] shadow-md rounded-lg overflow-hidden mb-2">
      <Image
        src={BASE_BACKGROUND_IMAGE.url}
        alt={BASE_BACKGROUND_IMAGE.alt}
        fill
        className="object-contain"
        priority
        sizes="(max-width: 768px) 100vw, 400px"
      />
    </div>
  );
}

export default BaseBackground;
