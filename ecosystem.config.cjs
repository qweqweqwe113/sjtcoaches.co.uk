module.exports = {
  apps: [
    {
      name: "sjtcoaches",
      script: "node-server.mjs",
      interpreter: "node",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
