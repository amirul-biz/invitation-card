"use client";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import BaseBackgroundCountdown from "./elements/base-background/base-background-countdown.ui";
import BaseBackgroundMessage from "./elements/base-background/base-background-message";
import BottomDock from "./elements/bottom-navigation/bottom-navigation.ui";
import { CanvaDesign } from "./elements/canva-design/canva-dessign.ui";
import CountdownTimer from "./elements/count-down/count-down.ui";
import IsPlayMusicDialog from "./elements/play-button/play-button.ui";
import SpeechCarousel from "./elements/speech-carousel/speech-carousel.ui";
import { store } from "./store/store-state";
import { ServerProcessConfig } from "./config/config-app-server.process";
import { serverConfig } from "./config/config-app-environment";

export default function Home() {
  const [isAppStatusOk, setAppStatusOk] = useState<boolean | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      const result = await new ServerProcessConfig().isAppStatusOk(serverConfig);
      setAppStatusOk(result);
    };

    checkStatus();
  }, []);

  if (isAppStatusOk === null) {
    return <div>Loading...</div>; // Optional: add a spinner or splash screen
  }

  if (!isAppStatusOk) {
    return <div>⚠️ Server config is not valid</div>;
  }

  return (
    <Provider store={store}>
      <div className="relative w-full overflow-hidden">
        <IsPlayMusicDialog />
      </div>

      <div className="relative w-full overflow-hidden">
        <CanvaDesign />
      </div>

      {/* Countdown Section */}
      <div className="relative w-full overflow-hidden">
        <BaseBackgroundCountdown />
        <div className="my-8 absolute inset-0 flex justify-center items-center px-4 w-full h-full bg-white/0">
          <div className="max-w-screen-md w-full">
            <CountdownTimer />
          </div>
        </div>
      </div>

      {/* Speech Carousel Section */}
      <div className="relative w-full overflow-hidden">
        <BaseBackgroundMessage />
        <div className="my-4 absolute inset-0 flex justify-center items-center px-4 w-full h-full bg-white/0">
          <div className="max-w-screen-md w-full">
            <SpeechCarousel />
          </div>
        </div>
      </div>

      <div className="mb-5"></div>

      <div className="sticky bottom-0 left-0 right-0 bg-white border-t shadow-sm z-50">
        <BottomDock />
      </div>
    </Provider>
  );
}
