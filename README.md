# LiveKit Video Meeting App

A modern, well-structured React application for video meetings using LiveKit. Users can create or join rooms by entering a room name and their identity.

## Features

- ✅ **Room Creation & Joining**: Users can create new rooms or join existing ones
- ✅ **Real-time Video/Audio**: Full video and audio communication
- ✅ **Modern UI**: Clean, responsive interface with Tailwind CSS
- ✅ **Well-structured Code**: Modular components and reusable hooks
- ✅ **Error Handling**: Comprehensive error handling and user feedback
- ✅ **TypeScript**: Full TypeScript support for better development experience

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── RoomForm.tsx     # Form for joining/creating rooms
│   ├── VideoGrid.tsx    # Video display grid
│   ├── Controls.tsx     # Meeting controls (mic, camera, leave)
│   ├── Room.tsx         # Main room interface
│   ├── ErrorDisplay.tsx # Error display component
│   └── index.ts         # Component exports
├── hooks/               # Custom React hooks
│   └── useRoom.ts       # Room state management
├── services/            # API and external services
│   └── api.ts          # API service for token management
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Components

### RoomForm
- Handles room creation and joining
- Collects user identity and room name
- Provides loading states and validation

### VideoGrid
- Displays all participants' video streams
- Handles screen sharing
- Shows placeholder when no participants

### Controls
- Microphone toggle (mute/unmute)
- Camera toggle (on/off)
- Leave room functionality
- Modern icon-based interface

### Room
- Main video meeting interface
- Integrates LiveKit room with components
- Provides connection status

### ErrorDisplay
- User-friendly error messages
- Retry and clear functionality
- Consistent error handling

## Hooks

### useRoom
- Manages room state (token, roomName, identity)
- Handles token fetching and error states
- Provides room joining and leaving functions

## Services

### ApiService
- Centralized API communication
- Token fetching for LiveKit
- Room creation endpoints
- Environment-based URL configuration

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Backend URL**
   Update the `baseUrl` in `src/services/api.ts` to point to your LiveKit backend server.

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Usage

1. **Join a Room**
   - Enter your name and room name
   - Click "Join Room" to connect
   - The app will automatically create the room if it doesn't exist

2. **Meeting Controls**
   - Use the microphone button to mute/unmute
   - Use the camera button to turn video on/off
   - Click the leave button to exit the meeting

3. **Sharing**
   - Share the room URL with others to invite them
   - All participants will appear in the video grid

## Environment Configuration

The app automatically switches between development and production URLs:

- **Development**: `http://localhost:3000`
- **Production**: `https://livekittestingbackend-production.up.railway.app`

## Dependencies

- **@livekit/components-react**: LiveKit React components
- **livekit-client**: LiveKit client library
- **react-icons**: Icon library
- **tailwindcss**: CSS framework
- **typescript**: Type safety

## Backend Requirements

Your backend should provide these endpoints:

- `POST /get-token` - Returns LiveKit token for room access
- `POST /create-room` - Creates a new room (optional)

## Contributing

1. Follow the existing component structure
2. Use TypeScript for all new code
3. Add proper error handling
4. Test thoroughly before submitting

## License

MIT License - feel free to use this code for your own projects!
