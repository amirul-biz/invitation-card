"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import CarouselUiConfig from "./speech-carousel-config/speech-carousel.config.ui";
import { fetchRsvp } from "./speech-carousel.server";

// Define RsvpData type
export type RsvpData = {
  name: string;
  speech: string;
  isAttend: boolean;
  total_person: number;
  avatarUrl: string;
  created_at: string;
};

export function SpeechCarousel() {
  const [rsvpList, setRsvpList] = useState<RsvpData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetchRsvp();
        setRsvpList(res);
      } catch (err) {
        console.error("Failed to load RSVP data", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {rsvpList.length > 0 ? (
        <div className="flex justify-center ">
          <CarouselUiConfig
            baseWidth={360}
            autoplay={true}
            autoplayDelay={7000}
            pauseOnHover={true}
            loop={true}
            round={false}
            items={rsvpList}
          />
        </div>
      ) : (
        <div className="flex p-2 justify-center ">
          <Card className="relative overflow-hidden p-4 border-gray-200 bg-white">
            <CardContent className="w-75 h-50"></CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default SpeechCarousel;
