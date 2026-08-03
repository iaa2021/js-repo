import express from 'express';
import routes from './routes/productRoutes';
import errorHandler from './middleware/errorHandler';
import logger from './middleware/logger';
import config from './config.js';

const app = express();

// Middleware
app.use(express.json());
app.use(logger);
app.use('/api/products', productRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'product-catalog', timestamp: new Date() });
});

// Routes
app.use('/api/products', routes.productRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.PORT, () => {
  console.log(`Product catalog service running on port ${config.PORT}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  // Close database connections, etc.
  process.exit(0);
});