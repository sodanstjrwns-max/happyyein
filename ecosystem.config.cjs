module.exports = {
  apps: [
    {
      name: 'yein-dental',
      script: 'npx',
      args: 'wrangler pages dev dist --d1=yein-dental-db --r2=yein-dental-images --local --ip 0.0.0.0 --port 3000',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
