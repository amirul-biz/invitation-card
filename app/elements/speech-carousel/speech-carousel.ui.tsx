// "use client";

// import { updateMessage } from "@/app/store/store-rsvp/store-rsvp-slice";
// import { AppDispatch, RootState } from "@/app/store/store-state";
// import { Card, CardContent } from "@/components/ui/card";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import CarouselUiConfig from "./speech-carousel-config/speech-carousel.config.ui";
// import { fetchRsvp } from "./speech-carousel.server";

// // Define RsvpData type
// export type RsvpData = {
//   name: string;
//   speech: string;
//   isAttend: boolean;
//   total_person: number;
//   avatarUrl?: string;
//   created_at: string;
// };

// export function SpeechCarousel() {
//   const rsvpMessages = useSelector((state: RootState) => state.rsvpMessage);
//   const dispatchRsvpMessages = useDispatch<AppDispatch>();

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetchRsvp();
//         dispatchRsvpMessages(updateMessage(res));
//       } catch (err) {
//         console.error("Failed to load RSVP data", err);
//       }
//     }
//     fetchData();
//   }, []);

//   const carouselKey = rsvpMessages.length;

//   return (
//     <>
//       <div>
//         {rsvpMessages.length > 0 ? (
//           <div className="flex justify-center">
//             <CarouselUiConfig
//               key={carouselKey}
//               baseWidth={360}
//               autoplay={true}
//               autoplayDelay={7000}
//               pauseOnHover={true}
//               loop={true}
//               round={false}
//               items={rsvpMessages}
//             />
//           </div>
//         ) : (
//           <div className="flex p-2 justify-center">
//             <Card className="relative overflow-hidden p-6 border border-gray-200 bg-white rounded-md shadow-sm w-80">
//               <CardContent className="flex items-center justify-center h-40">
//                 <p className="text-gray-500 text-lg font-medium select-none">
//                   Tiada ucapan
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default SpeechCarousel;

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store-state";
import { updateMessage } from "@/app/store/store-rsvp/store-rsvp-slice";
import CarouselUiConfig from "./speech-carousel-config/speech-carousel.config.ui";
import { fetchRsvp } from "./speech-carousel.server";

export type RsvpData = {
  name: string;
  speech: string;
  isAttend: boolean;
  total_person: number;
  avatarUrl?: string;
  created_at: string;
};

export function SpeechCarousel() {
  const rsvpMessages = useSelector((state: RootState) => state.rsvpMessage);
  const dispatchRsvpMessages = useDispatch<AppDispatch>();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetchRsvp();
        dispatchRsvpMessages(updateMessage(res));
      } catch (err) {
        console.error("Failed to load RSVP data", err);
      }
    }
    fetchData();
  }, []);

  const carouselKey = rsvpMessages.length;

  return (
      <div className="w-100 h-full">
        {rsvpMessages.length > 0 ? (
          // <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl text-white relative overflow-hidden flex flex-col justify-between w-full h-full">
          //   <CardContent className="relative z-10 p-6 flex flex-col justify-between h-full w-full">
          //     <CarouselUiConfig
          //       key={carouselKey}
          //       baseWidth={335}      // This can be adjusted or removed if CarouselUiConfig respects container size
          //       autoplay={true}
          //       autoplayDelay={7000}
          //       pauseOnHover={true}
          //       loop={true}
          //       round={false}
          //       items={rsvpMessages}
          //     />
          //   </CardContent>
        // </Card>
                      <CarouselUiConfig
                key={carouselKey}
                baseWidth={335}      // This can be adjusted or removed if CarouselUiConfig respects container size
                autoplay={true}
                autoplayDelay={7000}
                pauseOnHover={true}
                loop={true}
                round={false}
                items={rsvpMessages}
              />
        ) : (
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl text-white flex items-center justify-center w-full h-full px-6 py-8">
            <CardContent className="p-0 text-center w-full">
              <p className="text-white/80 text-lg font-medium select-none">
                Tiada ucapan
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    
  );


}


export default SpeechCarousel;


