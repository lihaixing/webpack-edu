const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry: {
        'lodash': ['lodash']
    },
    output: {
        // 打包到什么地方
        path: path.join(__dirname, 'src/dll/'),
        filename: '[name].dll.js',
        // 怎么引用
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            // 打包出来放什么地方
            path: path.join(__dirname, 'src/dll/', '[name]-manifest.json'),
            name: '[name]'
        }),
        new webpack.optimize.UglifyJsPlugin({
            parallel:true,
            cache:true
        })
    ]
}