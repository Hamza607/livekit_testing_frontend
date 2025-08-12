import { API_CONFIG } from '../config/constants';

export interface TokenResponse {
  token: string;
  roomName?: string;
}

export interface RoomRequest {
  identity: string;
  roomName: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl =   API_CONFIG.production.baseUrl
    // this.baseUrl = import.meta.env.PROD 
    //   ? API_CONFIG.production.baseUrl
    //   : API_CONFIG.development.baseUrl;
  }

  async getToken(identity: string, roomName: string): Promise<TokenResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/get-token`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          identity,
          roomName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data?.token || typeof data.token !== "string") {
        throw new Error("Invalid token received from server");
      }

      return data;
    } catch (error) {
      console.error("Failed to fetch token:", error);
      throw error;
    }
  }

  async createRoom(roomName: string): Promise<{ room: any }> {
    try {
      const response = await fetch(`${this.baseUrl}/create-room`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          roomName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to create room:", error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
