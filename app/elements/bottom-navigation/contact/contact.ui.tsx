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
import { ScrollArea } from "@/components/ui/scroll-area";
import { PhoneCall } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { contactConfig } from "../../../config/config-app-environment";
import { ContactPerson } from "@/app/config/config-app-environment-interface";

export interface CalendarDrawerInterface {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactDrawer({ open, onOpenChange }: CalendarDrawerInterface) {
  const { contacts, translations } = contactConfig;

  const getAvatarUrl = (contact: ContactPerson) => {
    const options = contact.avatarOptions || {};
    return (
      `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}` +
      `&background=${options.background || "random"}` +
      `&color=${options.color || "fff"}` +
      `&size=${options.size || 128}`
    );
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-center">
          <DrawerTitle>{translations.title}</DrawerTitle>
          <DrawerDescription>{translations.description}</DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="h-[400px] px-4 pb-6">
          <div className="flex flex-col gap-4">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white shadow-md"
              >
                {/* Left section: Avatar + Info */}
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={getAvatarUrl(contact)}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col justify-center">
                    <span className="font-medium text-sm text-gray-900">
                      {contact.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {contact.designation}
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {contact.phone}
                    </span>
                  </div>
                </div>

                {/* Right section: Actions */}
                <div className="flex flex-col gap-2 items-end">
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-primary hover:text-primary/80"
                    title="Call"
                  >
                    <PhoneCall className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://wa.me/${contact.phone.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700"
                    title="WhatsApp"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

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
