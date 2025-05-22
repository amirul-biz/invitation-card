"use client";

import { useState } from "react";
import { BOTTOM_DOCK_ITEMS, DockItemKey } from "../../config/config-app-environment";
import { CalendarDrawer } from "./calendar/calendar.ui";
import { LocationDrawer } from "./location/location.ui";
import { ContactDrawer } from "./contact/contact.ui";
import { MoneyGiftDrawer } from "./money-gift/money-gift.ui";
import { RSVPModal } from "../rsvp-form/rsvp-form.ui";
import { TentativeDrawer } from "./tentative/tentative.ui";

export default function BottomDock() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<Record<DockItemKey, boolean>>({
    calendar: false,
    moneyGift: false,
    location: false,
    contact: false,
    rsvp: false,
    tentative: false
  });

  const openDrawer = (key: DockItemKey) => {
    setIsDrawerOpen((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm z-50">
      <div className="flex justify-around items-center py-2">
        {BOTTOM_DOCK_ITEMS.filter((item) => item.show).map((item) => (
          <button
            key={item.key}
            onClick={() => openDrawer(item.key)}
            className="flex-1 flex flex-col items-center text-gray-500 hover:text-black"
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Drawer components (must stay rendered) */}
      <CalendarDrawer
        open={isDrawerOpen.calendar}
        onOpenChange={(open) => setIsDrawerOpen((prev) => ({ ...prev, calendar: open }))}
      />
      <MoneyGiftDrawer
        open={isDrawerOpen.moneyGift}
        onOpenChange={(open) => setIsDrawerOpen((prev) => ({ ...prev, moneyGift: open }))}
      />
      <LocationDrawer
        open={isDrawerOpen.location}
        onOpenChange={(open) => setIsDrawerOpen((prev) => ({ ...prev, location: open }))}
      />
      <ContactDrawer
        open={isDrawerOpen.contact}
        onOpenChange={(open) => setIsDrawerOpen((prev) => ({ ...prev, contact: open }))}
      />
      <RSVPModal
        open={isDrawerOpen.rsvp}
        onOpenChange={(open) => setIsDrawerOpen((prev) => ({ ...prev, rsvp: open }))}
      />
      <TentativeDrawer  open={isDrawerOpen.tentative}
        onOpenChange={(open) => setIsDrawerOpen((prev) => ({ ...prev, tentative: open }))}
      />
      
    </div>
  );
}
