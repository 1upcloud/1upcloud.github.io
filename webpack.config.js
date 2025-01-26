const path = require('path');

module.exports = {
  entry: './src/js/app.js',
  mode: 'development', // Set mode to 'development' for easier debugging
  output: {
    path: `${__dirname}/dist`,
    filename: 'js/app.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000, // The port you want to use
    open: true, // Automatically opens the browser
  }
};
