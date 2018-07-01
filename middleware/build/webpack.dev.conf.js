const webpack = require('webpack')
const proxy = require('./proxy')
const historyApiFallback = require('./historyfallback')
module.exports = {
    devtool: 'source-map',
    devServer: {
        port: 9001,
        inline: true,
        // historyApiFallback:true, //访问单页面，不会404
        historyApiFallback: historyApiFallback,
        // 代理接口 安装的时候注掉
        proxy: proxy,
        hot: true,
        hotOnly: true,
        overlay: true
    },
    plugins:[
        // 模块热更新相关
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}