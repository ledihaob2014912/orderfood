const { defineConfig } = require("@vue/cli-service");
const path = require('../ct313hm01-project-backend-ledihaob2014912/backend');
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  outputDir: path.resolve(__dirname, '../backend/public'),
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:8081'
      }
    }
  }
}
