"use client";

import { updateMessage } from "@/app/store/store-rsvp/store-rsvp-slice";
import { AppDispatch, RootState } from "@/app/store/store-state";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarouselUiConfig from "./speech-carousel-config/speech-carousel.config.ui";
import { fetchRsvpData, GETRsvpData } from "../rsvp-form/rsvp-form.server";

// Define RsvpData type
export type RsvpData = {
  name: string;
  speech: string;
  isAttend: boolean;
  totalPerson: number;
  avatarUrl?: string;
  created_at: string;
};

export function SpeechCarousel() {
  const rsvpMessages = useSelector((state: RootState) => state.rsvpMessage);
  const dispatchRsvpMessages = useDispatch<AppDispatch>();

  useEffect(() => {
    async function fetchData() {
      try {
        const rsvpDataList = (await fetchRsvpData()) as GETRsvpData[];
        dispatchRsvpMessages(updateMessage(rsvpDataList));
      } catch (err) {
        console.error("Failed to load RSVP data", err);
      }
    }
    fetchData();
  }, []);

  const carouselKey = rsvpMessages.length;

  return (
    <>
      <div>
        {rsvpMessages.length > 0 ? (
          <div className="flex justify-center">
            <CarouselUiConfig
              key={carouselKey}
              baseWidth={360}
              autoplay={true}
              autoplayDelay={7000}
              pauseOnHover={true}
              loop={true}
              round={false}
              items={rsvpMessages}
            />
          </div>
        ) : (
          <div className="flex p-2 justify-center">
            <Card className="relative overflow-hidden p-6 border border-gray-200 bg-white rounded-md shadow-sm w-80">
              <CardContent className="flex items-center justify-center h-40">
                <p className="text-gray-500 text-lg font-medium select-none">
                  Tiada ucapan
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}

export default SpeechCarousel;
