var path = require('path')
var webpack = require('webpack')
var PurifyCss = require('purifycss-webpack')
// 处理css多路径问题
var glob = require('glob-all')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    // 如果没有提取出来，用style-loader嵌入到html中
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            // 插入到dom 有几个css文件就会有几个style标签
                            insertInto: '#app',
                            // 只能有一个style标签
                            singleton: true,
                            // 形变函数，浏览器中执行js时，对css的处理
                            transform: './css.transform.js'
                        }
                    },
                    // 如果提取出来，怎么处理
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // minimize: true,
                                modules: true,
                                // class命名规则
                                localIdentName: '[path][name]_[local]_[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    // 合成一张图片
                                    require('postcss-sprites')({
                                        spritePath: '/img/sprites'
                                    }),
                                    require('postcss-cssnext')()
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    // 如果没有提取出来，用style-loader嵌入到html中
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            // 插入到dom 有几个css文件就会有几个style标签
                            insertInto: '#app',
                            // 只能有一个style标签
                            singleton: true,
                            // 形变函数，浏览器中执行js时，对css的处理
                            transform: './css.transform.js'
                        }
                    },
                    // 如果提取出来，怎么处理
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                                // modules:true,
                                // class命名规则
                                // localIdentName:'[path][name]_[local]_[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    // 合成一张图片
                                    require('postcss-sprites')({
                                        spritePath: '/img/sprites',
                                        // 解决多倍高清图片 视网膜屏幕
                                        // retina: true
                                    }),
                                    require('postcss-cssnext')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    // {
                    //     // 处理css中图片
                    //     loader: 'file-loader',
                    //     options: {
                    //         // 绝对路径
                    //         publicPath:'/webpack-edu/FileDeal/dist/img',
                    //         useRelativePath: true,
                    //         outputPath: '/'
                    //     }
                    // },
                    {
                        // base64
                        loader: 'url-loader',
                        options: {
                            // ext是后缀
                            name: '[name].min.[ext]',
                            // 小于150k使用base64位
                            limit: 130000,
                            // 绝对路径
                            publicPath: '/webpack-edu/FileDeal/dist/img/sprites',
                            useRelativePath: true,
                            outputPath: '/'
                        }
                    },
                    {
                        // 压缩图片
                        loader: 'img-loader',
                        options: {
                            pngquant: {
                                quality: 90
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css',
            // 默认false 指打包初始化的import的css, 异步的不打包
            allChunks: false
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