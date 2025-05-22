"use client";
import { backgroundVideoConfig } from "@/app/config/config-app-environment";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";

export function IsPlayMusicDialog() {
  const [open, setOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/song.mp3");
    audioRef.current.loop = true;
    setOpen(true);
    document.getElementById("playButton")?.click();
  }, []);

  const handlePlayMusic = () => {
    audioRef.current?.play();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogHeader></DialogHeader>
      <DialogTitle></DialogTitle>
      <DialogContent className="w-screen h-screen max-w-none max-h-none rounded-none p-0 m-0 overflow-hidden">
        <div className="h-full flex flex-col relative">
          {/* Video Background - Absolutely Fills Entire Space */}
          <div className="absolute inset-[-1px] -z-10 bg-black">
            <video
              src={backgroundVideoConfig.url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-fill p-0 m-0"
            />
          </div>

          {/* CTA Button (Centered at Bottom) */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
            <DialogFooter className="p-6 bg-white/5 rounded-full sm:justify-center gap-4 border border-white/20 backdrop-blur-sm">
              <DialogClose asChild>
                <Button
                  id="playButton"
                  className="bg-white/90 hover:bg-white text-gray-900 px-8 py-4 text-lg rounded-full font-medium tracking-wide transition-all hover:scale-105 shadow-lg"
                  onClick={handlePlayMusic}
                >
                  Buka Jemputan
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default IsPlayMusicDialog;