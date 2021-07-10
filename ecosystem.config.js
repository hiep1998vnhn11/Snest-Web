module.exports = {
  apps: [
    {
      name: 'Snest',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      PORT: 3002
    }
  ]
}
