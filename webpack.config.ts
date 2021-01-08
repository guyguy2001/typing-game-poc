const CopyWebpackPlugin = require('copy-webpack-plugin');
import * as webpack from 'webpack';

import * as path from 'path';
const publicFolder = 'public';

// The files that will be exported using CopyWebpackPlugin
let assetsToCopy = [
  {
    from: path.resolve('src/assets'),
    to: path.resolve('public/assets'),
  },
  {
    from: path.resolve('src', 'html'),
    to: path.resolve('public'),
  },
  {
    from: path.join(__dirname, 'node_modules/pixi.js/dist/pixi.js'),
    to: path.join(__dirname, publicFolder, 'js'),
  },
  {
    from: path.join(__dirname, 'node_modules/pixi.js/dist/pixi.min.js'),
    to: path.join(__dirname, publicFolder, 'js'),
  },
  {
    from: path.join(__dirname, 'node_modules/pixi-spine/bin/pixi-spine.js'),
    to: path.join(__dirname, publicFolder, 'js'),
  },
  {
    from: path.join(__dirname, 'node_modules/puremvc/lib/puremvc-1.0.1.js'),
    to: path.join(__dirname, publicFolder, 'js'),
  },
];

const config: webpack.Configuration = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, publicFolder),
    filename: 'js/bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(path.join(__dirname, 'node_modules'))],
    alias: {
      '@': path.resolve('src'),
    }
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
  plugins: [new CopyWebpackPlugin({ patterns: assetsToCopy })],
  externals: {
    'pixi.js': {
      root: 'PIXI',
    },
    'pixi-spine': {
      root: 'PIXI.spine',
    },
    puremvc: {
      root: 'puremvc',
    },
  },
//  watchOptions: {
//    poll: true,
//    ignored: /node_modules/,
// },
};

export default config;