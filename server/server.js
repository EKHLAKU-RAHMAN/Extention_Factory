import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import extensionRoutes from "./routes/extensionRoutes.js";

dotenv.config();

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"]
    }
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "TOO_MANY_REQUESTS",
    message: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('combined', {
    stream: {
      write: (message) => console.log(message.trim())
    }
  }));
}

// Ensure required directories exist
const ensureDirectories = () => {
  const dirs = ['temp', 'zips'];
  dirs.forEach(dir => {
    const dirPath = path.join(process.cwd(), 'server', dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created directory: ${dirPath}`);
    }
  });
};

ensureDirectories();

// Static file serving for downloads
app.use('/api/downloads', express.static(path.join(process.cwd(), 'server', 'zips'), {
  maxAge: '1h', // Cache for 1 hour
  etag: true
}));

// API routes
app.use("/api/extension", extensionRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    memory: process.memoryUsage(),
    services: {
      gemini: process.env.GEMINI_API_KEY ? 'configured' : 'not_configured'
    }
  };

  res.status(200).json(healthCheck);
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Extension Factory API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "/health",
      generate: "/api/extension/generate",
      download: "/api/extension/download/:filename"
    }
  });
});

// 404 handler - must be placed after all other routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: "NOT_FOUND",
    message: "Endpoint not found"
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    success: false,
    error: err.name || "INTERNAL_ERROR",
    message: isDevelopment ? err.message : "Internal server error",
    ...(isDevelopment && { stack: err.stack })
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
🚀 Extension Factory Server Started
📍 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
⏰ Started at: ${new Date().toISOString()}
📊 Health check: http://localhost:${PORT}/health
🔗 API docs: http://localhost:${PORT}/
  `);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});

export default app;