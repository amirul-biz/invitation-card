// app/page.tsx
"use client";
import { Provider } from "react-redux";
import BaseBackgroundCountdown from "./elements/base-background/base-background-countdown.ui";
import BaseBackgroundMessage from "./elements/base-background/base-background-message";
import BottomDock from "./elements/bottom-navigation/bottom-navigation.ui";
import CanvaDesign from "./elements/canva-design/canva-dessign.ui";
import CountdownTimer from "./elements/count-down/count-down.ui";
import IsPlayMusicDialog from "./elements/play-button/play-button.ui";
import SpeechCarousel from "./elements/speech-carousel/speech-carousel.ui";
import { store } from "./store/store-state";
import MainInvitationPage from "./elements/main-invitation-card/main-invitation.ui";
import TenativeInvitation from "./elements/main-invitation-card/tenative-invitation.ui";

// export default function Home() {
//   return (
//     <>
//       <Provider store={store}>
//           <div className="relative w-full overflow-hidden">
//         <IsPlayMusicDialog />
//       </div>

//       <div className="relative w-full overflow-hidden">
//         <CanvaDesign />
//       </div>

//       {/* Countdown Section */}
//       <div className="relative w-full overflow-hidden">
//         <BaseBackgroundCountdown />
//         <div className="my-8 absolute inset-0 flex justify-center items-center px-4 w-full h-full bg-white/0">
//           <div className="max-w-screen-md w-full">
//             <CountdownTimer />
//           </div>
//         </div>
//       </div>

//       {/* Speech Carousel Section */}
//       <div className="relative w-full overflow-hidden">
//         <BaseBackgroundMessage />
//         <div className="my-4 absolute inset-0 flex justify-center items-center px-4 w-full h-full bg-white/0">
//           <div className="max-w-screen-md w-full">
//             <SpeechCarousel />
//           </div>
//         </div>
//       </div>

//       <div className="mb-5"></div>

//       <div className="sticky bottom-0 left-0 right-0 bg-white border-t shadow-sm z-50">
//         <BottomDock />
//       </div>
//       </Provider>

//     </>
//   );
// }

export default function Home() {
  return (
    <Provider store={store}>
      <div className="relative w-full min-h-screen overflow-hidden">
        {/* Background video layer */}
        <div className="fixed inset-0 z-0 transform scale-[1.4]">
          <iframe
            className="w-full h-full object-cover"
            src="https://www.youtube.com/embed/FLKHzuTIHYw?autoplay=1&mute=1&loop=1&playlist=FLKHzuTIHYw&controls=0&modestbranding=1&showinfo=0&rel=0"
            title="YouTube Shorts"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>

        {/* Opening Content */}
        <div className="relative z-10 w-full overflow-hidden">
          <IsPlayMusicDialog />
        </div>

        {/* First Page And Second Page Content */}
        <div className="w-full min-h-screen p-6 bg-transparent overflow-y-auto overflow-x-hidden flex flex-col items-center">
          <MainInvitationPage />
          <TenativeInvitation />
          <CountdownTimer />
        </div>

        {/* Bottom Dock */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t shadow-sm z-50">
          <BottomDock />
        </div>
      </div>
    </Provider>
  );
}
