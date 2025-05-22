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
  
  // import config and types
import { TENTATIVE_SCHEDULE, TENTATIVE_TEXT } from "@/app/config/config-app-environment";
  
  export interface TentativeDrawerInterface {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }
  
  export function TentativeDrawer({ open, onOpenChange }: TentativeDrawerInterface) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger />
        <DrawerContent className="max-w-lg mx-auto rounded-t-2xl shadow-xl p-0">
          <DrawerHeader className="text-center px-6 pt-6">
            <DrawerTitle className="text-xl font-bold tracking-tight flex justify-center items-center gap-2 text-gray-800">
              <CalendarClockIcon className="w-5 h-5 text-red-500" />
              {TENTATIVE_TEXT.title}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-500">
              {TENTATIVE_TEXT.description}
            </DrawerDescription>
          </DrawerHeader>
  
          <div className="relative px-6 py-6">
            <div className="absolute left-9 top-6 bottom-6 w-0.5 bg-gray-200" />
  
            <div className="space-y-6">
              {TENTATIVE_SCHEDULE.map((item, index) => (
                <div key={index} className="flex items-start gap-4 relative">
                  <div className="w-4 h-4 rounded-full bg-red-500 mt-1.5 relative z-10" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.time}</p>
                    <p className="text-sm text-gray-600">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <DrawerFooter className="px-6 pb-6">
            <DrawerClose asChild>
              <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
                {TENTATIVE_TEXT.closeButton}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  