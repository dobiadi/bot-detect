const path = require('path');

module.exports = [
  {
    entry: './src/index.ts',
    output: {
      filename: 'botdetect-clean.min.js',
      library: {
        name: "BotDetect",
        type: "umd",
        export: "default"
      },
      path: path.resolve(__dirname, 'dist'),
    },
    mode: "production",
    target: ["web", "es5"],
    resolve: {
      extensions: [".ts", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
            options: {
              configFile: ".swcrc-clean"
            }
          }
        }
      ],
    },
  },
  {
    entry: './src/index.ts',
    output: {
      filename: 'botdetect.min.js',
      library: {
        name: "BotDetect",
        type: "umd",
        export: "default"
      },
      path: path.resolve(__dirname, 'dist'),
    },
    mode: "production",
    target: ["web", "es5"],
    resolve: {
      extensions: [".ts", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
            options: {
              configFile: ".swcrc-polyfill"
            }
          }
        }
      ],
    },
  }
];
