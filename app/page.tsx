// app/page.tsx
"use client";
import  BaseBackgroundCountdown  from "./elements/base-background/base-background-countdown.ui";
import BaseBackgroundMessage from "./elements/base-background/base-background-message";
import BottomDock from "./elements/bottom-navigation/bottom-navigation.ui";
import { CanvaDesign } from "./elements/canva-design/canva-dessign.ui";
import CountdownTimer from "./elements/count-down/count-down.ui";
import IsPlayMusicDialog from "./elements/play-button/play-button.ui";
import SpeechCarousel from "./elements/speech-carousel/speech-carousel.ui";

export default function Home() {
  return (
    <>
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
    </>
  );
}




// "use client";

// import { Form } from "./api/api-email/api-email-form";
// import React from "react";

// export default function Home() {

//   const [name, setName] = React.useState('');
//   const [email, setEmail] = React.useState('');
//   const [loading, setLoading] = React.useState(false);
//   const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setName(event.target.value);
//   };

//   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(event.target.value);
//   };
 

//   const onFormSubmitted  =(event: React.FormEvent) => {
//       event.preventDefault();
//       setLoading(true);
//       fetch('/api/api-email', {
//           method: 'POST',
//           cache: 'no-cache',
//           body: JSON.stringify({
//             name,
//             email
//           }),
//           headers: {
//               'Content-Type': 'application/json'
//           }
//       })
//       .then(res => res.json())
//       .then(data => {
//           setLoading(false);
//           setEmail('');
//           setName('');
//           console.log(data);
//       });

      
//   }
//   return (
//    <React.Fragment> 
//         <Form name={name} email={email} isLoading={loading} nameChange={handleNameChange} emailChange={handleEmailChange} onsubmit={onFormSubmitted}/>  
//    </React.Fragment>
//   );
// }
