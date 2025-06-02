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
import { CalendarClockIcon } from "lucide-react";

import {
  TENTATIVE_SCHEDULE,
  TENTATIVE_TEXT,
} from "@/app/config/config-app-environment";

export interface TentativeDrawerInterface {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TentativeDrawer({
  open,
  onOpenChange,
}: TentativeDrawerInterface) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger />
      <DrawerContent className="max-w-lg mx-auto rounded-t-2xl shadow-xl p-0">
        <div className="flex flex-col max-h-[80vh]">
          {/* Header */}
          <DrawerHeader className="text-center px-6 pt-6">
            <DrawerTitle className="text-xl font-bold tracking-tight flex justify-center items-center gap-2 text-gray-800">
              <CalendarClockIcon className="w-5 h-5 text-red-500" />
              {TENTATIVE_TEXT.title}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-500">
              {TENTATIVE_TEXT.description}
            </DrawerDescription>
          </DrawerHeader>

          {/* Timeline Section (scrollable part) */}
          <div className="relative px-6">
            {/* Vertical line */}
            <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-gray-200" />

            {/* Scrollable timeline */}
            <div className="overflow-y-auto max-h-[calc(80vh-200px)] py-6 pr-2">
              <div className="space-y-6">
                {TENTATIVE_SCHEDULE.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 relative">
                    <div className="relative z-10 flex flex-col items-center">
                      {/* Red Dot */}
                      <div className="w-4 h-4 rounded-full bg-red-500 mt-1.5" />
                      {/* Connector Line (only if not last item) */}
                      {index < TENTATIVE_SCHEDULE.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gray-200" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {item.time}
                      </p>
                      <p className="text-sm text-gray-600">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <DrawerFooter className="px-6 pb-6 pt-2">
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onOpenChange(false)}
              >
                {TENTATIVE_TEXT.closeButton}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
  
}
