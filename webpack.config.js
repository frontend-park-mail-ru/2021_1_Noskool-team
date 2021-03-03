const path = require('path');

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
            jsx: srcPath('jsx')
        }
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'out'),
    },
    mode: "development"
};