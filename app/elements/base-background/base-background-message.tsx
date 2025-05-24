// BaseBackground.tsx
import { baseBackGroundImageMessageConfig } from "@/app/config/config-app-environment";
import Image from "next/image";

export function BaseBackgroundMessage() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[1240/1748] shadow-md rounded-lg overflow-hidden mb-2">
      <Image
        src={baseBackGroundImageMessageConfig.url}
        alt={baseBackGroundImageMessageConfig.alt}
        fill
        className="object-contain"
        priority
        sizes="(max-width: 768px) 100vw, 400px"
      />
    </div>
  );
}

export default BaseBackgroundMessage;
