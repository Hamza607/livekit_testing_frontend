import  { useEffect } from 'react';
import { RoomForm, Room, ErrorDisplay } from './components';
import { useRoom } from './hooks/useRoom';
import { LIVEKIT_SERVER_URL } from './config/constants';

export default function App() {
  const { 
    token, 
    roomName, 
    identity, 
    loading, 
    error, 
    joinRoom, 
    leaveRoom, 
    clearError 
  } = useRoom();
    console.log("🚀 ~ App ~ identity:", identity,leaveRoom)

  // Handle URL parameters for room invitations
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomFromUrl = urlParams.get('room');
    
    if (roomFromUrl && !token && !loading) {
      // Pre-fill the room name from URL
      // The user will still need to enter their name and submit
      console.log('Room invitation detected:', roomFromUrl);
    }
  }, [token, loading]);

  // If we have a token, show the room
  if (token && roomName) {
    return (
      <Room 
        token={token} 
        serverUrl={LIVEKIT_SERVER_URL}
        roomName={roomName}
      />
    );
  }

  // If there's an error, show error display
  if (error) {
    return (
      <ErrorDisplay 
        error={error}
        onRetry={() => clearError()}
        onClear={() => clearError()}
      />
    );
  }

  // Show the room form for joining/creating rooms
  return (
    <RoomForm 
      onSubmit={joinRoom}
      loading={loading}
    />
  );
}
