const path = require('path');
const {DefinePlugin,HotModuleReplacementPlugin} = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');



process.env.NODE_ENV = process.env.NODE_ENV || 'development';


require('dotenv').config();


const htmlPlugin = new HtmlWebpackPlugin({   
    template: __dirname + '/public/index.html',
    filename: 'index.html',   
    inject: 'body' 
});

const miniCssPlugin = new MiniCssExtractPlugin(
  // chunk version for cache refresh
  // filename: 'style.[contentHash].css',
);

module.exports = (env) => {

    return {
        target:"web",
        entry: ['babel-polyfill', './src/index.js'],
        output: {
          path: path.resolve(__dirname, 'public'),
          // hashing for cache refresh
          // filename: 'main.[chunkHash].js',
          filename: '[name].js',
          publicPath: "/"
        },
        module: {
        rules: [{
          loader: 'babel-loader',
          test: /\.(js|jsx)$/, 
          exclude: /node_modules/,
          },
          {test: /\.s?css$/,
            use: [
              MiniCssExtractPlugin.loader, 
              'css-loader', 
              'sass-loader'
            ],
          },
          {
            test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
            use: 'url-loader',
            include: path.join(__dirname, 'public')
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: 'svg-url-loader',
                options: {
                  limit: 10000,
                },
                
              },
            ],
            include: path.join(__dirname, 'public')
          },
          {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
            use: ['@svgr/webpack'],
          },
        ]
        },
        optimization: {
          splitChunks: {
            chunks: 'all',
          },
        },
        plugins: [
          new HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
          htmlPlugin,
          miniCssPlugin,
          new DefinePlugin({
            'process.env': JSON.stringify(process.env)      
          })
        ],
        
        devtool: 'inline-source-map',
        devServer: {
            port: 9000,
            compress: true,
            historyApiFallback: true,
        },
        resolve: {
          alias: {
            "src/*": path.resolve(__dirname, "./*"),
            "base": path.resolve(__dirname, "../*"),
          },
          extensions: [".js", ".json", ".jsx", ".css","jpg"],
        }
    }
}