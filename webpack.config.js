const path = require('path');

module.exports = {
 // Your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Cleans the output directory before each build
  },
  mode: 'development', // Set mode to 'development' for easier debugging
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000, // The port you want to use
    open: true, // Automatically opens the browser
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // Add loaders for CSS if needed
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
