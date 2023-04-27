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
          use: 'style-loader'
        },
        {
          test: /\.css$/,
          use: 'css-loader'
        },
        {
          test: /\.(tsx?)$/,
          loader: 'ts-loader',
          // options: {
          //   configFile: path.resolve(__dirname, 'tsconfig.json'),
          //   compilerOptions: {
          //     outDir: path.join(__dirname, 'build')
          //   }
          // }
        },
        // {
        //   test: /\.(jsx?|tsx?)$/,
        //   loader: 'babel-loader',
        //   // options: {
        //   //   customize: require.resolve(
        //   //     'babel-preset-react-app/webpack-overrides'
        //   //   ),
        //   //   presets: [
        //   //     [
        //   //       require.resolve('babel-preset-react-app'),
        //   //       {
        //   //         // runtime: hasJsxRuntime ? 'automatic' : 'classic',
        //   //         absoluteRuntime: false
        //   //       },
        //   //     ],
        //   //   ],
        //   //   include: path.resolve(__dirname, 'src'),
        //   //   exclude: /(node_modules|bower_components|build)/,
        //   // },
        // },
      ]
    },
    externals: {
      // Use the React dependencies of the peer project instead of using our own React.
      "react": "react",
      "react-dom": "react-dom"
    }
  }
};
