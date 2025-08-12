import {
  LiveKitRoom,
  GridLayout,
  useTracks,
  useLocalParticipant,
  useRoomContext,
  ParticipantTile,
  TrackLoop,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";

// Component to show all participants' video/screen share
function VideoGrid() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  if (tracks.length === 0) {
    return (
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        height: "100%",
        fontSize: "1.2rem",
        color: "#666"
      }}>
        No participants yet
      </div>
    );
  }

  return (
    <GridLayout 
      tracks={tracks}
      style={{ width: "100%", height: "100%" }}
    >
      <TrackLoop tracks={tracks}>
        <ParticipantTile />
      </TrackLoop>
    </GridLayout>
  );
}

// Controls for mic/camera/leave
function Controls() {
  const room = useRoomContext();
  const {
    isMicrophoneEnabled,
    isCameraEnabled,
    localParticipant,
  } = useLocalParticipant();

  const [leaving, setLeaving] = useState(false);

  const handleLeave = async () => {
    setLeaving(true);
    await room.disconnect();
    // Instead of reloading the page, just remove the token
    window.location.href = "/"; 
  };

  const toggleMicrophone = async () => {
    if (isMicrophoneEnabled) {
      await localParticipant.setMicrophoneEnabled(false);
    } else {
      await localParticipant.setMicrophoneEnabled(true);
    }
  };

  const toggleCamera = async () => {
    if (isCameraEnabled) {
      await localParticipant.setCameraEnabled(false);
    } else {
      await localParticipant.setCameraEnabled(true);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 12,
        zIndex: 1000,
      }}
    >
      <button onClick={toggleMicrophone} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        {isMicrophoneEnabled ? "Mute Mic" : "Unmute Mic"}
      </button>
      <button onClick={toggleCamera} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        {isCameraEnabled ? "Turn Off Camera" : "Turn On Camera"}
      </button>
      <button onClick={handleLeave} disabled={leaving} className="bg-red-500 text-white px-4 py-2 rounded-md">
        Leave
      </button>
    </div>
  );
}

// Main App
export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("https://livekittestingbackend-production.up.railway.app/get-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identity: "user123", // You can make this dynamic
            roomName: "my-room",
          }),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log("🚀 ~ fetchToken ~ data:", data);

        if (!data?.token || typeof data.token !== "string") {
          throw new Error("Invalid token received from server");
        }

        setToken(data.token);
      } catch (error) {
        console.error("Failed to fetch token:", error);
        setError(error instanceof Error ? error.message : "Failed to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: "2rem" }}>
        Connecting to room...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", paddingTop: "2rem", color: "red" }}>
        <h2>Connection Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return token ? (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <h1 className="text-4xl font-bold text-center p-4 bg-gray-100">LiveKit is working!</h1>
      <div style={{ flex: 1, position: "relative" }}>
        <LiveKitRoom
          serverUrl="wss://diet-meeting-1f2b0bfu.livekit.cloud"
          token={token}
          connect
          video
          audio
          style={{ height: "100%", position: "relative" }}
        >
          <VideoGrid />
          <Controls />
        </LiveKitRoom>
      </div>
    </div>
  ) : (
    <div style={{ textAlign: "center", paddingTop: "2rem" }}>
      No token available
    </div>
  );
}
