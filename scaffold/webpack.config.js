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
      extensions: [".js", ".jsx", ".ts", ".tsx", ".cjs", ".rb"],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
          }
        ]
      })
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
              limit: 8000,
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
