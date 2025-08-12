import React, { useState } from 'react';
import {
  useRoomContext,
  useLocalParticipant,
} from "@livekit/components-react";
import { 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaVideo, 
  FaVideoSlash, 
  FaPhoneSlash 
} from 'react-icons/fa';

export const Controls: React.FC = () => {
  const room = useRoomContext();
  const {
    isMicrophoneEnabled,
    isCameraEnabled,
    localParticipant,
  } = useLocalParticipant();

  const [leaving, setLeaving] = useState(false);

  const handleLeave = async () => {
    setLeaving(true);
    try {
      await room.disconnect();
      window.location.href = "/";
    } catch (error) {
      console.error("Error leaving room:", error);
      window.location.href = "/";
    }
  };

  const toggleMicrophone = async () => {
    try {
      if (isMicrophoneEnabled) {
        await localParticipant.setMicrophoneEnabled(false);
      } else {
        await localParticipant.setMicrophoneEnabled(true);
      }
    } catch (error) {
      console.error("Error toggling microphone:", error);
    }
  };

  const toggleCamera = async () => {
    try {
      if (isCameraEnabled) {
        await localParticipant.setCameraEnabled(false);
      } else {
        await localParticipant.setCameraEnabled(true);
      }
    } catch (error) {
      console.error("Error toggling camera:", error);
    }
  };

  return (
    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-50">
      <button
        onClick={toggleMicrophone}
        className={`p-4 rounded-full transition-all duration-200 ${
          isMicrophoneEnabled
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-red-500 hover:bg-red-600 text-white'
        }`}
        title={isMicrophoneEnabled ? 'Mute Microphone' : 'Unmute Microphone'}
      >
        {isMicrophoneEnabled ? (
          <FaMicrophone className="w-5 h-5" />
        ) : (
          <FaMicrophoneSlash className="w-5 h-5" />
        )}
      </button>

      <button
        onClick={toggleCamera}
        className={`p-4 rounded-full transition-all duration-200 ${
          isCameraEnabled
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-red-500 hover:bg-red-600 text-white'
        }`}
        title={isCameraEnabled ? 'Turn Off Camera' : 'Turn On Camera'}
      >
        {isCameraEnabled ? (
          <FaVideo className="w-5 h-5" />
        ) : (
          <FaVideoSlash className="w-5 h-5" />
        )}
      </button>

      <button
        onClick={handleLeave}
        disabled={leaving}
        className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Leave Room"
      >
        <FaPhoneSlash className="w-5 h-5" />
      </button>
    </div>
  );
};
