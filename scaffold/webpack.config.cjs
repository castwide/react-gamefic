const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (arg, env) => {
  process.env.NODE_ENV = arg.mode || env.mode || 'development';
  const inDevelopment = (process.env.NODE_ENV == 'development');

  return {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, "build")
    },
    devtool: inDevelopment ? 'inline-source-map' : false,
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".cjs", ".rb"],
      alias: {
        // These aliases are necessary to fix invalid hook errors from multiple
        // running instances of React.
        'react': path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom')
      }
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
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react'
              ],
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
                paths: %(paths),
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
