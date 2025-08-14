# Wheelshare Backend

This is the backend for the Wheelshare app. It provides REST endpoints to create and fetch wheels, and uses Socket.IO for real-time spin synchronization between users.

## Features
- Create a new wheel with options
- Fetch a wheel by ID
- Real-time spin events using Socket.IO
- In-memory storage (no database required)

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
3. The server will run on port 3001 by default.

## API Endpoints
- `POST /api/wheels` — Create a new wheel (body: `{ options: ["Option 1", "Option 2", ...] }`)
- `GET /api/wheels/:id` — Get a wheel by ID

## Socket.IO Events
- `join-wheel` — Join a wheel room (payload: wheelId)
- `spin` — Broadcast a spin result (payload: `{ wheelId, result }`)
- `spin-result` — Receive a spin result (payload: result)

---
This backend is intended for development/demo purposes. For production, add persistent storage and authentication as needed.
