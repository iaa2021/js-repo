import express from 'express';
import http from 'http';
//import socketIo from 'socket.io'
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// In-memory store for analytics data (use a database in production)
const analyticsData = {
  pageViews: {},
  activeUsers: new Set(),
  events: []
};

// Track page views
app.use((req, res, next) => {
  const page = req.path;
  analyticsData.pageViews[page] = (analyticsData.pageViews[page] || 0) + 1;
  
  // Emit update to all connected clients
  io.emit('analytics:update', {
    type: 'pageView',
    data: { page, count: analyticsData.pageViews[page] }
  });
  
  next();
});

// Track custom events
app.post('/track', express.json(), (req, res) => {
  const { event, data } = req.body;
  const eventId = uuidv4();
  const timestamp = new Date().toISOString();
  
  const eventData = { id: eventId, event, data, timestamp };
  analyticsData.events.push(eventData);
  
  // Keep only the last 1000 events
  if (analyticsData.events.length > 1000) {
    analyticsData.events.shift();
  }
  
  // Emit event to all connected clients
  io.emit('analytics:event', eventData);
  
  res.status(201).json({ success: true, eventId });
});

// WebSocket connection handling
io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId || 'anonymous';
  analyticsData.activeUsers.add(userId);
  
  // Send initial data to the newly connected client
  socket.emit('analytics:init', {
    pageViews: analyticsData.pageViews,
    activeUsers: analyticsData.activeUsers.size,
    recentEvents: analyticsData.events.slice(-50)
  });
  
  // Update all clients about the new active user count
  io.emit('analytics:update', {
    type: 'activeUsers',
    data: analyticsData.activeUsers.size
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    analyticsData.activeUsers.delete(userId);
    io.emit('analytics:update', {
      type: 'activeUsers',
      data: analyticsData.activeUsers.size
    });
  });
  
  // Handle custom events from the client
  socket.on('analytics:event', (data) => {
    const eventId = uuidv4();
    const timestamp = new Date().toISOString();
    const eventData = { id: eventId, ...data, timestamp, userId };
    
    analyticsData.events.push(eventData);
    if (analyticsData.events.length > 1000) {
      analyticsData.events.shift();
    }
    
    io.emit('analytics:event', eventData);
  });
});

// API to get analytics data
app.get('/api/analytics', (req, res) => {
  res.json({
    pageViews: analyticsData.pageViews,
    activeUsers: analyticsData.activeUsers.size,
    totalEvents: analyticsData.events.length,
    recentEvents: analyticsData.events.slice(-50)
  });
});

// Serve the dashboard
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Analytics server running on port ${PORT}`);
  console.log(`Dashboard available at http://localhost:${PORT}/dashboard.html`);
});