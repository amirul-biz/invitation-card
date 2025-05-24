// BaseBackground.tsx
import { baseBackGroundImageCountdownConfig } from "@/app/config/config-app-environment";
import Image from "next/image";

export function BaseBackgroundCountdown() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[1240/1748] shadow-md rounded-lg overflow-hidden mb-2">
      <Image
        src={baseBackGroundImageCountdownConfig.url}
        alt={baseBackGroundImageCountdownConfig.alt}
        fill
        className="object-contain"
        priority
        sizes="(max-width: 768px) 100vw, 400px"
      />
    </div>
  );
}

export default BaseBackgroundCountdown;
