import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default (arg, env) => {
  process.env.NODE_ENV = env.NODE_ENV || arg.mode || 'development';
  return {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, "build")
    },
    devtool: 'inline-source-map',
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".cjs"],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
          }
        ]
      }),
      new HtmlWebpackPlugin(
        {
          inject: false,
          template: path.join(__dirname, 'public', 'index.html')
        }
      )  
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { esModule: false } }
          ]
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]'
            }
          }]
        },
        {
          test: /\.(jsx?|tsx?)$/,
          use: [{
            loader: 'babel-loader',
            options: {
              include: path.resolve(__dirname, 'src'),
              exclude: /(node_modules|bower_components|build)/,
            },
          }]
        },
        {
          // opal-webpack-bundler will compile and include ruby files in the pack
          test: /\.rb$/,
          use: [
            {
              loader: 'opal-webpack-bundler',
              options: {
                useBundler: true,
                paths: [path.resolve(__dirname, '../')],
                sourceMap: false,
                root: path.resolve(__dirname, '../')
              }
            }
          ]
        }
      ]
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
        publicPath: '/'
      },
      port: 9000
    }
  }
}
