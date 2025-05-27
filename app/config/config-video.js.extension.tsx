import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import type VideoJsPlayer from 'video.js/dist/types/player'; // ✅ default importimport 'video.js/dist/video-js.css';

interface VideoJSBackgroundProps {
  src: string;
}

const VideoJSBackground: React.FC<VideoJSBackgroundProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        autoplay: true,
        muted: true,
        loop: true,
        controls: false,
        responsive: true,
        fluid: true,
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="video-container fixed inset-0 z-0 transform scale-[1.4]">
      <video
        ref={videoRef}
        className="video-js vjs-default-skin object-cover w-full h-full"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoJSBackground;
