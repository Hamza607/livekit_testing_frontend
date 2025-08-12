import React from 'react';
import {
  GridLayout,
  useTracks,
  ParticipantTile,
  TrackLoop,
} from "@livekit/components-react";
import { Track } from "livekit-client";

export const VideoGrid: React.FC = () => {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  if (tracks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-xl text-gray-600">
        <div className="text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p>No participants yet</p>
          <p className="text-sm text-gray-500 mt-2">Share this room link with others to start the meeting</p>
        </div>
      </div>
    );
  }

  return (
    <GridLayout 
      tracks={tracks}
      className="w-full h-full"
    >
      <TrackLoop tracks={tracks}>
        <ParticipantTile />
      </TrackLoop>
    </GridLayout>
  );
};
