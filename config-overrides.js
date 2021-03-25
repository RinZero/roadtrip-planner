const path = require('path');
function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      components: resolve(__dirname, './src/components/'),
      containers: resolve(__dirname, './src/containers/'),
      utils: resolve(__dirname, './src/utils/'),
      store: resolve(__dirname, './src/store/'),
    },
  }
  return config
}
