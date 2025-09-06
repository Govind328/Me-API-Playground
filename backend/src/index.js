const express = require('express');
const bodyParser = require('body-parser');
const corsMiddleware = require('./middleware/cors');
const profileRoutes = require('./routes/profile');
const { initDatabase } = require('./database/db');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(corsMiddleware);


app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', profileRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Me-API Playground Backend',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      profile: '/api/profile',
      projects: '/api/projects?skill=javascript',
      skills: '/api/skills/top',
      search: '/api/search?q=python'
    }
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested route ${req.originalUrl} does not exist.`,
    availableEndpoints: [
      'GET /api/health',
      'GET /api/profile',
      'PUT /api/profile',
      'GET /api/projects?skill={skill}',
      'GET /api/skills/top',
      'GET /api/search?q={query}'
    ]
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong on the server.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});


initDatabase()
  .then(db => {
    app.set('db', db);
    console.log('Database initialized successfully');
    
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 API available at http://localhost:${PORT}/api`);
      console.log(`🔧 Health check at http://localhost:${PORT}/api/health`);
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down server gracefully...');
      server.close(() => {
        db.close((err) => {
          if (err) {
            console.error('Error closing database:', err);
            process.exit(1);
          }
          console.log('Database connection closed.');
          process.exit(0);
        });
      });
    });
  })
  .catch(err => {
    console.error('❌ Failed to initialize database:', err);
    process.exit(1);
  });

module.exports = app;