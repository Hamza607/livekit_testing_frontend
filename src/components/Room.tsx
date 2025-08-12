import React, { useState } from 'react';
import { LiveKitRoom } from "@livekit/components-react";
import { VideoGrid } from './VideoGrid';
import { Controls } from './Controls';

interface RoomProps {
  token: string;
  serverUrl: string;
  roomName?: string;
}

export const Room: React.FC<RoomProps> = ({ token, serverUrl, roomName }) => {
  const [copied, setCopied] = useState(false);

  const copyRoomLink = async () => {
    const roomLink = `${window.location.origin}?room=${encodeURIComponent(roomName || '')}`;
    try {
      await navigator.clipboard.writeText(roomLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy room link:', err);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Video Meeting</h1>
          <div className="flex items-center space-x-4">
            {roomName && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Room:</span>
                <span className="text-sm font-medium text-gray-900">{roomName}</span>
                <button
                  onClick={copyRoomLink}
                  className="ml-2 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Connected</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex-1 relative bg-gray-900">
        <LiveKitRoom
          serverUrl={serverUrl}
          token={token}
          connect
          video
          audio
          className="h-full"
        >
          <VideoGrid />
          <Controls />
        </LiveKitRoom>
      </div>
    </div>
  );
};
