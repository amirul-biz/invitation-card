import { CalendarIcon, ClockIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TenativeInvitation() {
  return (
    <Card className="w-full max-w-md aspect-[9/18] bg-black/10 backdrop-blur-md rounded-3xl
                    border border-white/20 shadow-xl text-white relative overflow-hidden 
                    px-6 py-8 flex flex-col justify-between opacity-92">
      <CardContent className="relative z-10 p-0 flex flex-col justify-between h-full">

        {/* Arabic Prayer */}
        <div className="text-center">
          <p className="text-2xl sm:text-3xl font-arabic tracking-wider">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>
          <p className="mt-2 text-xs sm:text-sm italic">
            Dengan nama Allah Yang Maha Pengasih Lagi Maha Penyayang
          </p>
        </div>

        {/* Invitation Text */}
        <div className="flex-grow flex flex-col justify-center">
          <div className="text-center my-6 space-y-1">
            <p className="text-base sm:text-lg">YB Khairul Azeem bin Mamat</p>
            <p className="text-xs italic">dan</p>
            <p className="text-base sm:text-lg">Puan Juana binti Ahmad</p>
            <p className="text-xs mt-4">ingin menjemput</p>
            <p className="text-xs mt-1">Dato'/Datin/Tuan/Puan/Encik/Cik seisi sekeluarga</p>
            <p className="text-xs">ke majlis perkahwinan putera kami</p>
          </div>

          {/* Couple Names */}
          <div className="text-center my-6 space-y-1">
            <p className="text-xl sm:text-2xl font-bold">Amirul Irfan bin Khairul Azeem</p>
            <p className="text-xs italic">serta pasangannya</p>
            <p className="text-xl sm:text-2xl font-bold">Nur Izhatie Aisyah binti Ishak</p>
          </div>

          {/* Date & Time */}
          <div className="space-y-3 text-center text-sm sm:text-base">
            <div className="flex items-center justify-center space-x-2">
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Sabtu, 20 September 2025</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>26 Rabiulawal 1447H</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>11:30 AM - 4:00 PM</span>
            </div>
          </div>
        </div>

        {/* Quran Verse */}
        <div className="text-center text-xs sm:text-sm italic mt-6">
          <p>
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup..."
          </p>
          <p>(Surah Ar-Rum: 21)</p>
        </div>
      </CardContent>
    </Card>
  );
}
