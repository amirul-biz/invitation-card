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
import { PhoneIcon } from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";
import { contactConfig, ContactPerson } from "../../../config/config-app-environment";

export interface CalendarDrawerInterface {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactDrawer({ open, onOpenChange }: CalendarDrawerInterface) {
  const { contacts, translations, styles } = contactConfig;

  const getAvatarUrl = (contact: ContactPerson) => {
    const options = contact.avatarOptions || {};
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}` +
      `&background=${options.background || 'random'}` +
      `&color=${options.color || 'fff'}` +
      `&size=${options.size || 128}`;
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-center">
          <DrawerTitle>{translations.title}</DrawerTitle>
          <DrawerDescription>{translations.description}</DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="h-[300px] px-4 pb-6">
          <div className="space-y-6">
            {contacts.map((contact, index) => (
              <div key={index} className={styles.card}>
                <img
                  src={getAvatarUrl(contact)}
                  alt={contact.name}
                  className="w-16 h-16 rounded-full mx-auto mb-2"
                />
                <p className="text-lg font-semibold">{contact.name}</p>
                <p className="text-gray-500">{contact.designation}</p>
                <p className="text-gray-500">{contact.phone}</p>

                <div className="flex justify-center gap-4 mt-4">
                  <a
                    href={`https://wa.me/${contact.phone.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappButton}
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    {translations.whatsappButtonText}
                  </a>
                  <a
                    href={`tel:${contact.phone}`}
                    className={styles.callButton}
                  >
                    <PhoneIcon className="w-5 h-5" />
                    {translations.callButtonText}
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