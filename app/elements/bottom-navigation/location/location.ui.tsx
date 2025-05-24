import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { locationConfig } from "../../../config/config-app-environment";

export interface CalendarDrawerInterface {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LocationDrawer({
  open,
  onOpenChange,
}: CalendarDrawerInterface) {
  const { coordinates, locationInfo } = locationConfig;
  const { latitude, longitude } = coordinates;

  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const wazeUrl = `https://waze.com/ul?q=${latitude},${longitude}`;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger />
      <DrawerContent>
        <DrawerHeader className="text-center">
          <DrawerTitle>{locationInfo.title}</DrawerTitle>
          <DrawerDescription>{locationInfo.description}</DrawerDescription>
        </DrawerHeader>

        <div className="px-4 py-6 flex justify-center gap-12 text-center">
          {/* Google Maps */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-black space-y-2"
            title={locationInfo.google.googleMapsButtonText}
          >
            <div className="w-12 h-12 relative">
              <Image
                src={locationInfo.google.src}
                alt="Google Maps"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <span className="text-sm">{locationInfo.google.googleMapsButtonText}</span>
          </a>

          {/* Waze */}
          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-black space-y-2"
            title={locationInfo.waze.wazeButtonText}
          >
            <div className="w-12 h-12 relative">
              <Image
                src={locationInfo.waze.src}
                alt="Waze"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <span className="text-sm">{locationInfo.waze.wazeButtonText}</span>
          </a>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {locationInfo.closeButtonText}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
