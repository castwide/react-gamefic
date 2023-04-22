const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (arg, env) => {
  process.env.NODE_ENV = env.NODE_ENV || arg.mode || 'development';
  return {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, "build")
    },
    devtool: 'inline-source-map',
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".cjs", ".rb"]
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
                [
                  require.resolve('babel-preset-react-app'),
                  {
                    absoluteRuntime: false
                  },
                ],
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
