/**
 * PM2 Ecosystem Configuration
 * CRITICAL: Optimized for VPS with limited resources
 * 
 * This configuration:
 * - Uses cluster mode to utilize all CPU cores
 * - Sets memory limits to prevent OOM crashes
 * - Configures auto-restart on crashes
 * - Limits max memory per instance
 * - Optimizes for production performance
 */

module.exports = {
  apps: [
    {
      name: 'dev-enterprises',
      script: 'npm',
      args: 'start',
      cwd: './',
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster', // CRITICAL: Cluster mode distributes load across cores
      
      // Memory management - prevent OOM crashes
      max_memory_restart: '500M', // Restart if memory exceeds 500MB per instance
      
      // Auto-restart configuration
      autorestart: true,
      watch: false, // Disable file watching in production (saves CPU)
      max_restarts: 10, // Max restarts in 1 minute
      min_uptime: '10s', // Consider app stable after 10 seconds
      
      // Environment variables
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      
      // Logging
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      
      // Advanced optimizations
      kill_timeout: 5000, // Graceful shutdown timeout
      listen_timeout: 10000, // Time to wait for app to start
      shutdown_with_message: true,
      
      // CPU and memory limits (if your VPS supports it)
      // Uncomment if using PM2 Plus or PM2 Enterprise
      // pmx: true,
      // pm2_plus: true,
    },
  ],
};

