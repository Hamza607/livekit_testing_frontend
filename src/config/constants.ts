// LiveKit Configuration
export const LIVEKIT_SERVER_URL = "wss://diet-meeting-1f2b0bfu.livekit.cloud";

// API Configuration
export const API_CONFIG = {
  development: {
    baseUrl: 'http://localhost:3000'
  },
  production: {
    baseUrl: 'https://livekittestingbackend-production.up.railway.app'
  }
} as const;

// App Configuration
export const APP_CONFIG = {
  maxRoomNameLength: 50,
  maxIdentityLength: 30,
  defaultRoomName: 'meeting-room',
  defaultIdentity: 'Anonymous'
} as const;
