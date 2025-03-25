const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/ts/setup.ts',
  experiments: {
    outputModule: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'setup.mjs',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'module',
    },
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'src/data/data.json', to: 'data.json' },
        { from: 'src/data/data-toth.json', to: 'data-toth.json' },
        { from: 'src/data/data-aod.json', to: 'data-aod.json' },
        { from: 'src/data/data-ItA.json', to: 'data-ItA.json' },
        { from: 'src/data/data-bard.json', to: 'data-bard.json' },
        { from: 'src/data/custom-mods.json', to: 'custom-mods.json' },
        { from: 'src/data/profile.json', to: 'profile.json' },
        { from: 'src/components/Dead_Drop_Orders_1.html', to: 'Dead_Drop_Orders_1.html' },
        { from: 'src/components/Dead_Drop_Orders_2.html', to: 'Dead_Drop_Orders_2.html' },
        { from: 'src/components/Dead_Drop_Orders_3.html', to: 'Dead_Drop_Orders_3.html' },
        { from: 'src/components/Dead_Drop_Orders_4.html', to: 'Dead_Drop_Orders_4.html' },
        { from: 'src/components/Dead_Drop_Orders_5.html', to: 'Dead_Drop_Orders_5.html' },
        { from: 'src/components/Dead_Drop_Orders_6.html', to: 'Dead_Drop_Orders_6.html' },
        { from: 'src/components/Dead_Drop_Orders_7.html', to: 'Dead_Drop_Orders_7.html' },
        { from: 'src/components/Dead_Drop_Orders_8.html', to: 'Dead_Drop_Orders_8.html' },
        { from: 'src/components/GlobalDroptableOverview.template.html', to: 'GlobalDroptableOverview.template.html' },
        { from: 'src/components/King_Olafs_Verse.html', to: 'King_Olafs_Verse.html' },
        { from: 'src/components/recommendation_letter.html', to: 'recommendation_letter.html' },
        { from: 'src/components/The_Black_Horse_Courier_Waterfront_HTML.html', to: 'The_Black_Horse_Courier_Waterfront_HTML.html' },
        { from: 'src/components/The_Five_Tenents.html', to: 'The_Five_Tenents.html' },
        { from: 'src/components/Thieves_Orders.html', to: 'Thieves_Orders.html' },
        { from: 'src/assets', to: 'assets', noErrorOnMissing: true }
      ]
    })
  ],
  module: {
    generator: {
      'asset/resource': {
        publicPath: 'assets/',
        outputPath: 'assets/',
        filename: '[name][ext]',
      },
    },
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
};