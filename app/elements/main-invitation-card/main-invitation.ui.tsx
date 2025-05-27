import { Card, CardContent } from "@/components/ui/card";
import { PhoneIcon } from "lucide-react";

export default function MainInvitationPage() {
  return (
    <Card className="w-full max-w-md aspect-[9/18] bg-black/10 backdrop-blur-md 
                    rounded-3xl border border-white/20 shadow-xl text-white relative 
                    overflow-hidden mb-8 px-6 py-8 flex flex-col justify-center opacity-92">
      
      {/* Decorative Blur Elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-rose-200/10 blur-2xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-teal-200/10 blur-2xl" />

      <CardContent className="relative z-10 flex flex-col justify-between h-full p-0">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-lg sm:text-md md:text-xl mb-2 ballet-title">
            WALIMATULURUS
          </h1>
          <div className="w-20 h-0.5 bg-white/50 mx-auto my-4" />
        </div>

        {/* Couple Names */}
        <div className="flex flex-col items-center mb-8 space-y-2">
          <p className="text-xl sm:text-2xl font-light">Amirul</p>
          <p className="text-base sm:text-lg font-light">dan</p>
          <p className="text-xl sm:text-2xl font-light">Aisyah</p>
        </div>

        {/* Date */}
        <div className="text-center mb-8">
          <p className="text-lg sm:text-xl font-medium">SABTU,</p>
          <p className="text-xl sm:text-2xl font-bold">20 SEPTEMBER 2025</p>
        </div>

        {/* Venue */}
        <div className="text-center mb-8">
          <p className="text-lg sm:text-xl font-serif">SEBENING EMBUN</p>
          <p className="text-base sm:text-lg">GARDEN EVENT GLASS HALL</p>
        </div>

        {/* RSVP */}
        <div className="mt-auto pt-6 text-center border-t border-white/20">
          <div className="flex justify-center items-center space-x-2">
            <PhoneIcon className="w-5 h-5" />
            <span className="text-base sm:text-lg">RSVP AMIRUL</span>
          </div>
          <p className="text-base sm:text-lg mt-1">+019-664 3494</p>
        </div>
      </CardContent>
    </Card>
  );
}
