const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

// Shared Sentence Bank for 100% fair duels
const SHARED_SENTENCES = [
  "The official Guinness World Record for speed typing requires hitting three hundred words per minute in pure focus.",
  "Barbara Blackburn reached an astonishing peak typing speed of two hundred and twelve words per minute on a Dvorak keyboard.",
  "Sean Wrona broke online records on TypeRacer by typing continuously at speeds exceeding two hundred and fifty words per minute.",
  "At three hundred words per minute, your fingers strike twenty five characters every single second with zero hesitation.",
  "Only a true keyboard god can surpass the legendary barrier of three hundred words per minute.",
  "The quick brown fox jumps gracefully over the lazy sleeping dog as the countdown clock ticks to zero.",
  "Pack my box with five dozen liquor jugs before the speed demons arrive at midnight.",
  "Sphinx of black quartz, judge my sacred vow as I unleash maximum typing speed upon this keyboard.",
  "Lightning fast typists do not read individual letters, but perceive whole phrases in a continuous rhythm.",
  "To shatter the world record, every breath, keystroke, and neuron must move at the speed of light.",
  "Adrenaline surges through your veins as the cyber titan types at three hundred words per minute right beside you.",
  "Redline the engine, activate the nitro boost, and prove that human reflexes can surpass artificial intelligence.",
  "In this high stakes arena, only the swiftest keystrokes shall claim absolute victory and eternal glory.",
  "Precision without velocity is too slow, but velocity without precision leads to catastrophic errors.",
  "Can you match twenty five keystrokes per second and engrave your name into the Guinness Hall of Fame?"
];

function getRandomDuelSentence() {
  return SHARED_SENTENCES[Math.floor(Math.random() * SHARED_SENTENCES.length)];
}

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// Health check endpoint for hosting platforms (Render, Railway, Fly.io)
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    connections: wss.clients.size,
    uptime: process.uptime()
  });
});

// Fallback to index.html for single-page routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Live Multiplayer Matchmaking Hub
const waitingQueue = [];
const activeRooms = new Map();

function broadcastOnlineCount() {
  const count = Math.max(1450, 1450 + wss.clients.size * 3);
  const payload = JSON.stringify({ type: 'online_count', count });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

wss.on('connection', (ws) => {
  ws.id = 'player_' + Math.random().toString(36).substring(2, 9);
  ws.isAlive = true;

  ws.on('pong', () => { ws.isAlive = true; });

  // Send current online count upon joining
  broadcastOnlineCount();

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      // 1. Random Matchmaking Queue
      if (data.type === 'find_match') {
        ws.playerData = data.player || { name: 'Player', wpm: 85, avatar: '🏎️', flag: '🌐 LIVE' };

        if (waitingQueue.length > 0) {
          const opponentWs = waitingQueue.shift();

          if (opponentWs && opponentWs !== ws && opponentWs.readyState === WebSocket.OPEN) {
            const roomId = 'room_' + Date.now();
            const sentence = getRandomDuelSentence();
            activeRooms.set(roomId, [ws, opponentWs]);

            ws.roomId = roomId;
            opponentWs.roomId = roomId;

            // Notify both players with synchronized sentence
            ws.send(JSON.stringify({
              type: 'match_found',
              roomId: roomId,
              role: 'player',
              sentence: sentence,
              opponent: opponentWs.playerData
            }));

            opponentWs.send(JSON.stringify({
              type: 'match_found',
              roomId: roomId,
              role: 'rival',
              sentence: sentence,
              opponent: ws.playerData
            }));
            return;
          }
        }

        // Add to waiting queue if no opponent ready
        if (!waitingQueue.includes(ws)) {
          waitingQueue.push(ws);
        }
        ws.send(JSON.stringify({ type: 'queued', message: 'Scanning for online opponent...' }));
      }

      // 2. Room Code Join / Create
      else if (data.type === 'join_room') {
        const roomCode = (data.roomCode || '').toUpperCase().trim();
        ws.playerData = data.player || { name: 'Player', wpm: 85, avatar: '🏎️', flag: '🌐 LIVE' };
        ws.roomCode = roomCode;

        if (!activeRooms.has(roomCode)) {
          activeRooms.set(roomCode, [ws]);
          ws.send(JSON.stringify({ type: 'room_waiting', roomCode }));
        } else {
          const occupants = activeRooms.get(roomCode);
          if (occupants.length === 1) {
            const peer = occupants[0];
            occupants.push(ws);
            const sentence = getRandomDuelSentence();

            peer.send(JSON.stringify({
              type: 'match_found',
              roomCode: roomCode,
              sentence: sentence,
              opponent: ws.playerData
            }));

            ws.send(JSON.stringify({
              type: 'match_found',
              roomCode: roomCode,
              sentence: sentence,
              opponent: peer.playerData
            }));
          } else {
            ws.send(JSON.stringify({ type: 'room_full', message: 'Room already has 2 players.' }));
          }
        }
      }

      // 3. In-Game Keystroke / Progress / Emote Broadcast
      else if (data.type === 'progress' || data.type === 'emote') {
        const roomId = ws.roomId || ws.roomCode;
        if (roomId && activeRooms.has(roomId)) {
          const peers = activeRooms.get(roomId);
          peers.forEach((peer) => {
            if (peer !== ws && peer.readyState === WebSocket.OPEN) {
              peer.send(JSON.stringify(data));
            }
          });
        }
      }

      // 4. Next Round Synchronizer
      else if (data.type === 'next_round') {
        const roomId = ws.roomId || ws.roomCode;
        if (roomId && activeRooms.has(roomId)) {
          const sentence = getRandomDuelSentence();
          const peers = activeRooms.get(roomId);
          peers.forEach((peer) => {
            if (peer.readyState === WebSocket.OPEN) {
              peer.send(JSON.stringify({
                type: 'new_round_sentence',
                sentence: sentence,
                round: data.round
              }));
            }
          });
        }
      }

      // 5. Cancel Search
      else if (data.type === 'cancel_search') {
        const idx = waitingQueue.indexOf(ws);
        if (idx !== -1) waitingQueue.splice(idx, 1);
      }
    } catch (err) {
      console.error('WS Error:', err);
    }
  });

  ws.on('close', () => {
    const idx = waitingQueue.indexOf(ws);
    if (idx !== -1) waitingQueue.splice(idx, 1);

    const roomId = ws.roomId || ws.roomCode;
    if (roomId && activeRooms.has(roomId)) {
      const peers = activeRooms.get(roomId);
      peers.forEach((peer) => {
        if (peer !== ws && peer.readyState === WebSocket.OPEN) {
          peer.send(JSON.stringify({ type: 'opponent_disconnected' }));
        }
      });
      activeRooms.delete(roomId);
    }

    broadcastOnlineCount();
  });
});

// Ping-pong heartbeat to keep connections alive
setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

server.listen(PORT, () => {
  console.log(`🚀 TypeRush Live Server running at http://localhost:${PORT}`);
});
