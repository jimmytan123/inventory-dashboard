// A JavaScript file that allows users to declare their applications, services, and deployment hosts for PM2
module.exports = {
  apps: [
    {
      name: 'inventory-app',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
        ENV_VAR1: 'environment-variable',
      },
    },
  ],
};
