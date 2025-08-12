import { useState, useCallback } from 'react';
import { apiService } from '../services/api';

export interface RoomState {
  token: string | null;
  roomName: string | null;
  identity: string | null;
  loading: boolean;
  error: string | null;
}

export const useRoom = () => {
  const [state, setState] = useState<RoomState>({
    token: null,
    roomName: null,
    identity: null,
    loading: false,
    error: null,
  });

  const joinRoom = useCallback(async (roomName: string, identity: string) => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const response = await apiService.getToken(identity, roomName);
      
      setState({
        token: response.token,
        roomName,
        identity,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to join room',
      }));
    }
  }, []);

  const leaveRoom = useCallback(() => {
    setState({
      token: null,
      roomName: null,
      identity: null,
      loading: false,
      error: null,
    });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
    }));
  }, []);

  return {
    ...state,
    joinRoom,
    leaveRoom,
    clearError,
  };
};
