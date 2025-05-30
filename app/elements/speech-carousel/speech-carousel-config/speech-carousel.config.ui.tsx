import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { JSX, useEffect, useRef, useState } from "react";
// replace icons with your own if needed
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, Quote } from "lucide-react";
import { RsvpData } from "../speech-carousel.ui";

export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  icon: JSX.Element;
}

export interface CarouselProps {
  items?: RsvpData[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function CarouselUiConfig({
  items = [],
  baseWidth = 0,
  autoplay = false,
  autoplayDelay = 0,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps): JSX.Element {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1; // Animate to clone.
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <Card ref={containerRef} className="p-3 border-gray-100 bg-white">
      {/* <CardHeader>
        <span className="text-center text-2xl font-bold text-black">
          Senarai Ucapan
        </span>
      </CardHeader> */}
      <motion.div
        className="flex h-80"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${
            currentIndex * trackItemOffset + itemWidth / 2
          }px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const outputRange = [90, 0, -90];
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          return (
            <motion.div
              key={index}
              className={`relative shrink-0 flex flex-col ${
                round
                  ? " bg-white border-0"
                  : " bg-white border border-gray-400 rounded-[12px]"
              } overflow-hidden cursor-grab active:cursor-grabbing`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : "100%",
                rotateY: rotateY,
                ...(round && { borderRadius: "50%" }),
              }}
              transition={effectiveTransition}
            >
              <CardContent className="flex flex-col gap-4 p-4 md:p-6 min-h-[150px]">
                {/* Hadir Text */}
                {item.isAttend ? (
                  <Badge
                    variant="outline"
                    className="border-gray-400 text-black"
                  >
                    <div className="flex items-center text-sm text-green-600 mx-2">
                      <CheckCircle2 className="w-4 h-4" />
                      &nbsp;
                      <span>
                        Hadir{" "}
                        {item.totalPerson === 1
                          ? "seorang"
                          : `${item.totalPerson} orang`}
                      </span>
                    </div>
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-gray-400 text-black"
                  >
                    <div className="flex items-center text-sm text-yellow-600 mx-2">
                      <CheckCircle2 className="w-4 h-4" />
                      &nbsp;
                      <span>Ucapan</span>
                    </div>
                  </Badge>
                )}

                {/* Avatar and Info Section */}
                <div className="flex items-center gap-3">
                  <Avatar className="bg-white">
                    <AvatarImage
                      src={item.avatarUrl || "https://via.placeholder.com/150"}
                      alt={item.name}
                    />
                    <AvatarFallback>
                      {item.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-center">
                    <span className="text-lg md:text-2xl font-bold text-gray-800 break-words">
                      {item.name}
                    </span>
                  </div>
                </div>

                {/* Quote and Speech */}

                <div className="h-80 w-full py-3 bg-gray-200 my-2 rounded-md border-black">
                  <ScrollArea className="h-20 px-3 overflow-auto">
                    <div className="flex items-start">
                      <Quote className="w-4 h-4 text-gray-400 mr-2 mt-1 shrink-0" />
                      <p className="font-sans text-sm text-gray-800 italic break-words">
                        {item.speech}
                      </p>
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
              <CardFooter>
                <div className="my-3">
                  <Label className="font-base bold text-sm">
                    {new Date(item.createdAt).toLocaleDateString("ms-MY", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Label>
                </div>
              </CardFooter>
            </motion.div>
          );
        })}
      </motion.div>

    </Card>
  );
}
