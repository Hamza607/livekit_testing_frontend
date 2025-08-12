import React, { useState, useEffect } from 'react';
import { APP_CONFIG } from '../config/constants';
import { LoadingSpinner } from './LoadingSpinner';

interface RoomFormProps {
  onSubmit: (roomName: string, identity: string) => void;
  loading?: boolean;
}

export const RoomForm: React.FC<RoomFormProps> = ({ onSubmit, loading = false }) => {
  const [roomName, setRoomName] = useState('');
  const [identity, setIdentity] = useState('');

  // Check for room name in URL parameters (for invitations)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomFromUrl = urlParams.get('room');
    
    if (roomFromUrl) {
      setRoomName(decodeURIComponent(roomFromUrl));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedRoomName = roomName.trim();
    const trimmedIdentity = identity.trim();
    
    if (trimmedRoomName && trimmedIdentity) {
      // Validate length limits
      if (trimmedRoomName.length > APP_CONFIG.maxRoomNameLength) {
        alert(`Room name must be ${APP_CONFIG.maxRoomNameLength} characters or less`);
        return;
      }
      
      if (trimmedIdentity.length > APP_CONFIG.maxIdentityLength) {
        alert(`Name must be ${APP_CONFIG.maxIdentityLength} characters or less`);
        return;
      }
      
      onSubmit(trimmedRoomName, trimmedIdentity);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Join or Create a Room
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter a room name to join or create a new room
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="identity" className="sr-only">
                Your Name
              </label>
              <input
                id="identity"
                name="identity"
                type="text"
                required
                maxLength={APP_CONFIG.maxIdentityLength}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Your Name"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="roomName" className="sr-only">
                Room Name
              </label>
              <input
                id="roomName"
                name="roomName"
                type="text"
                required
                maxLength={APP_CONFIG.maxRoomNameLength}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !roomName.trim() || !identity.trim()}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <LoadingSpinner size="sm" text="Connecting..." className="text-white" />
              ) : (
                'Join Room'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
