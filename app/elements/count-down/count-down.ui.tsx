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
import { weddingCountdownConfig, CountdownConfig } from "../../config/config-app-environment";

export default function CountdownTimer({ config = weddingCountdownConfig }: { config?: CountdownConfig }) {
  const [eventDateInClientTZ, setEventDateInClientTZ] = React.useState<Date | null>(null);

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
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-1 text-center">
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
    <div className="flex justify-center px-4 py-10">
      <Card className="w-full max-w-md bg-white text-black shadow-lg border border-gray-200">
        <CardHeader className="text-center space-y-2">
          {/* <Badge variant="outline" className="text-black border-gray-400">
            {config.ui.badgeText}
          </Badge> */}
          <CardTitle className="text-2xl font-bold text-black">
            {/* {config.event.name} */}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {/* {eventDateInClientTZ.toLocaleString("ms-MY", {
              dateStyle: "full",
              timeStyle: "short",
              timeZone: config.event.timeZone,
            })} */}
          </CardDescription>
          <CardDescription className="text-gray-600 font-semibold">
            {/* Tempat: {config.event.location} */}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Countdown date={eventDateInClientTZ} renderer={renderer} />
        </CardContent>

        <CardContent className="space-y-2 text-center text-gray-600 text-xs mt-1">
          <p className="italic">{config.prayer.text}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center bg-white border border-gray-300 rounded-lg shadow-sm p-3">
      <div className="text-2xl font-mono font-bold text-black">{value}</div>
      <div className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </div>
    </div>
  );
}