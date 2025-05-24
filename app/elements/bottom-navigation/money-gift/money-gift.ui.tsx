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
import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { moneyGiftConfig } from "../../../config/config-app-environment";

export interface CalendarDrawerInterface {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MoneyGiftDrawer({
  open,
  onOpenChange,
}: CalendarDrawerInterface) {
  const { accountName, accountNumber, bankName, qrCodeImageUrl, translations } = moneyGiftConfig;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(accountNumber);
    toast.success(translations.copySuccessMessage);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-center">
          <DrawerTitle>{translations.title}</DrawerTitle>
          <DrawerDescription>
            {translations.description}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col items-center px-4 py-6 space-y-4 text-center">
          {/* QR Code Image */}
          <Image
            src={qrCodeImageUrl}
            alt="DuitNow QR"
            width={200}
            height={200}
            className="rounded-md border"
          />

          {/* Account Owner Name */}
          <div className="text-lg font-semibold">{accountName}&nbsp;<span className="text-base text-gray-600">({bankName})</span></div>


          {/* Account Number with Copy Button */}
          <div className="flex items-center gap-2">
            <span className="text-base font-mono">{accountNumber}</span>
            <button
              onClick={handleCopy}
              className="text-blue-600 hover:text-blue-800 transition"
              aria-label="Copy account number"
            >
              <FaCopy />
            </button>
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