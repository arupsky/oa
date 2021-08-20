
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postCssImport = require('postcss-import');
const path = require('path');

module.exports = {
    resolve: {
      alias: {
        Modules: path.resolve(__dirname, 'node_modules'),
        Components: path.resolve(__dirname, '../assets/js/components'),
        Externals: path.resolve(__dirname, '../assets/js/external'),
        Helpers: path.resolve(__dirname, '../assets/js/helpers')
      }
    },
    entry: ['../assets/js/main.js','../assets/css/global.css'],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'main.min.js',
        publicPath: './'
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()]
    },
    externals: {
      jquery: 'jQuery'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'global.min.css'
      }),
      new CopyPlugin({
        patterns: [
          { 
            from: path.resolve(__dirname, '../assets/img/'), 
            to: path.resolve(__dirname, '../dist/assets/img'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options : {
                publicPath : '../../'
              }
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions:{
                  plugins:[
                    postCssImport(),
                    autoprefixer(),
                    cssnano()
                  ]
                }
              }
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          loader: 'file-loader',
          options: {
            name:  '[name].[ext]',
            outputPath: 'assets/img/loader'
          },
        }
      ],
    },
}
