import { Button } from "@/components/ui/button";
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
import { AiOutlineCar } from "react-icons/ai";
import { FiMap } from "react-icons/fi";
import { locationConfig } from "../../../config/config-app-environment";

export interface CalendarDrawerInterface {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LocationDrawer({
  open,
  onOpenChange,
}: CalendarDrawerInterface) {
  const { coordinates, translations } = locationConfig;
  const { latitude, longitude } = coordinates;
  
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const wazeUrl = `https://waze.com/ul?q=${latitude},${longitude}`;
  
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-center">
          <DrawerTitle>{translations.title}</DrawerTitle>
          <DrawerDescription>{translations.description}</DrawerDescription>
        </DrawerHeader>

        <div className="px-4 py-6 space-y-6 text-center">
          <div className="space-y-4">
            <div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                <FiMap className="w-5 h-5" />
                {translations.googleMapsButtonText}
              </a>
            </div>

            <div>
              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                <AiOutlineCar className="w-5 h-5" />
                {translations.wazeButtonText}
              </a>
            </div>
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {translations.closeButtonText}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}