"use client";

import * as React from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  weddingCountdownConfig,
  CountdownConfig,
} from "../../config/config-app-environment";
import SpeechCarousel from "../speech-carousel/speech-carousel.ui";

export default function CountdownTimer({
  config = weddingCountdownConfig,
}: {
  config?: CountdownConfig;
}) {
  const [eventDateInClientTZ, setEventDateInClientTZ] =
    React.useState<Date | null>(null);

  React.useEffect(() => {
    const eventDate = new Date(config.event.date);
    setEventDateInClientTZ(eventDate);
  }, [config.event.date]);

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      return (
        <div className="text-center space-y-2">
          <Badge className="text-lg py-2 px-4 rounded-full bg-green-100 text-green-800">
            {config.ui.completedMessage}
          </Badge>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-4 gap-3 text-center m-4">
          <TimeBox value={days} label={config.ui.timeBoxLabels.days} />
          <TimeBox value={hours} label={config.ui.timeBoxLabels.hours} />
          <TimeBox value={minutes} label={config.ui.timeBoxLabels.minutes} />
          <TimeBox value={seconds} label={config.ui.timeBoxLabels.seconds} />
        </div>
      );
    }
  };

  if (!eventDateInClientTZ) return null;

  return (
    <div className="w-full max-w-md px-1 pt-6 pb-19">
      <Card
        className="w-full max-w-md aspect-[9/18] bg-black/10 backdrop-blur-md 
             border border-white/20 shadow-xl rounded-3xl text-white 
             px-6 py-8 flex flex-col justify-center mb-1 mx-auto opacity-90"
      >
        <CardHeader className="text-center space-y-1 p-0 mb-4">
          <CardTitle className="text-2xl font-bold tracking-wide">
            {config.event.name}
          </CardTitle>
          <CardDescription className="text-gray-200 text-sm">
            {eventDateInClientTZ.toLocaleString("ms-MY", {
              dateStyle: "full",
              timeStyle: "short",
              timeZone: config.event.timeZone,
            })}
          </CardDescription>
          <CardDescription className="text-gray-300 font-semibold text-sm">
            Tempat: {config.event.location}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Countdown date={eventDateInClientTZ} renderer={renderer} />
        </CardContent>

        <CardContent className="flex justify-center">
          <SpeechCarousel />
        </CardContent>

        <CardContent className="text-center text-gray-300 text-xs mt-4 p-0">
          <p className="italic">{config.prayer.text}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center bg-white/20 border border-white/30 rounded-xl p-3 shadow-sm">
      <div className="text-2xl font-mono font-bold text-white">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-gray-200">
        {label}
      </div>
    </div>
  );
}
