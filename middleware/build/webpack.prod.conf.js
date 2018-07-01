const path = require('path')
const webpack = require('webpack')
const PurifyCss = require('purifycss-webpack')
// 处理css多路径问题
const glob = require('glob-all')
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    plugins: [
        // 每次打包先清除目录
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new HtmlInlineChunkPlugin({
            // 将引入的manifest文件直接写到script标签中
            inlineChunks: ['manifest']
        }),

        new PurifyCss({
            paths: glob.sync([
                path.join(__dirname, './*.html'),
                path.join(__dirname, './src/*.js'),
                path.join(__dirname, './*.js')
            ])
        }),
        // 无用js被去掉，同时代码被压缩
        new webpack.optimize.UglifyJsPlugin()
    ]
}