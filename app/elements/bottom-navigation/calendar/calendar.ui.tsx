import Image from "next/image";
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
import { CalendarDrawerConfig, weddingCalendarConfig } from "../../../config/config-app-environment";
import { CalendarEvent } from "@/app/config/config-app-environment";

export interface CalendarDrawerInterface {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config?: CalendarDrawerConfig;
}

export function CalendarDrawer({
  open,
  onOpenChange,
  config = weddingCalendarConfig,
}: CalendarDrawerInterface) {
  const generateGoogleCalendarUrl = () => {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: config.event.title,
      details: config.event.description,
      location: config.event.location,
      dates: `${formatDateForGoogle(config.event.startDate)}/${formatDateForGoogle(config.event.endDate)}`,
      ctz: config.event.timeZone,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const formatDateForGoogle = (dateString: string) => {
    return new Date(dateString).toISOString().replace(/-|:|\.\d\d\d/g, "");
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-center">
          <DrawerTitle>{config.ui.title}</DrawerTitle>
          <DrawerDescription>{config.ui.description}</DrawerDescription>
        </DrawerHeader>

        <div className="px-4 py-6 flex justify-center gap-8 text-center">
          {/* Google Calendar */}
          <a
            href={generateGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-black"
            title={config.ui.providers.google.label}
          >
            <div className="relative w-12 h-12 p-2 bg-red-500 rounded-full hover:bg-red-600 transition">
              <Image
                src={config.ui.providers.google.src}
                alt="Google Calendar"
                fill
                style={{ objectFit: "contain" }}
                sizes="48px"
              />
            </div>
            <span className="mt-2 text-sm">{config.ui.providers.google.label}</span>
          </a>

          {/* Apple Calendar */}
          <a
            href={generateAppleCalendarUrl(config.event)}
            download="event.ics"
            className="flex flex-col items-center text-black"
            title={config.ui.providers.apple.label}
          >
            <div className="relative w-12 h-12 p-2 bg-gray-800 rounded-full hover:bg-gray-900 transition">
              <Image
                                src={config.ui.providers.apple.src}
                alt="Apple Calendar"
                fill
                style={{ objectFit: "contain" }}
                sizes="48px"
              />
            </div>
            <span className="mt-2 text-sm">{config.ui.providers.apple.label}</span>
          </a>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {config.ui.closeButtonText}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// Helper function to generate Apple Calendar .ics file
function generateAppleCalendarUrl(event: CalendarEvent) {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Your Company//EN",
    "BEGIN:VEVENT",
    `DTSTART:${formatDateForApple(event.startDate)}`,
    `DTEND:${formatDateForApple(event.endDate)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");

  return URL.createObjectURL(new Blob([icsContent], { type: "text/calendar" }));
}

function formatDateForApple(dateString: string) {
  return new Date(dateString).toISOString().replace(/-|:|\.\d\d\d/g, "");
}
