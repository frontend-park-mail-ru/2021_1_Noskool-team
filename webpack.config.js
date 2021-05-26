const path = require('path');
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

function srcPath(subdir) {
    return path.join(__dirname, "src", subdir);
}

module.exports = {
    entry: './src/index.ts',
    devServer: {
        contentBase: path.join(__dirname, 'out'),
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.worker\.js$/,
                use: [
                    { loader: 'worker-loader' },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader",
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /.(jpg|jpeg|png|svg)$/,
                use: ['file-loader'],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            components: srcPath('components'),
            jsx: srcPath('jsx'),
            pages: srcPath('pages'),
            types: srcPath('types'),
            actions: srcPath('actions'),
            constants: srcPath('constants'),
            modules: srcPath('modules'),
            utils: srcPath('utils'),
            store: srcPath('store'),
            assets: srcPath('assets'),
        }
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build'),
    },
    mode: "development",
    plugins: [
        new WorkboxWebpackPlugin.InjectManifest({
            swSrc: "./src/sw.js",
            swDest: "sw.js"
        })
    ]   
};