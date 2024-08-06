const path = require('path');

module.exports = (env, args) => {
  process.env.NODE_ENV = env.NODE_ENV || args.mode || 'development';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
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
          test: /\.(tsx?)$/,
          use: [
            { loader: 'ts-loader' },
          ]
        },
      ]
    },
    externals: {
      // Use the React dependencies of the peer project instead of using our own React.
      "react": "react",
      "react-dom": "react-dom"
    }
  }
};
