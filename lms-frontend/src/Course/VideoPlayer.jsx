import { forwardRef } from "react";

const VideoPlayer = forwardRef(({ videoUrl }, ref) => {
  return (
    <div className="aspect-video bg-black rounded-xl overflow-hidden">
      <video
        ref={ref}
        key={videoUrl}
        src={videoUrl}
        controls
        className="w-full h-full"
      />
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;