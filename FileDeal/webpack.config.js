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
        publicPath: 'dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    // 目录解析
    resolve: {
        alias: {
            // 加$表示解析的是一个文件名，而不是目录  这里告诉从哪里找jquery(默认是从node_modules中)
            jquery$: path.resolve(__dirname, 'static/jquery.min.js')
        }
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
                        // base64 url-loader包含了file-loader的功能
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
            },
            {
                test: /\.(eot|woff2|woff|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // ext是后缀
                            name: '[name].min.[ext]',
                            limit: 1000,
                            // 绝对路径
                            publicPath: '/webpack-edu/FileDeal/dist/fonts',
                            useRelativePath: true,
                            outputPath: '/'
                        }
                    }
                ]
            },
            {
                // 找到使用jquery模块 此处用法和 new webpack.ProvidePlugin 方法一致
                test: path.resolve(__dirname, 'src/app.js'),
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            $: 'jquery'
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
        new webpack.optimize.UglifyJsPlugin(),
        // 通过npm install jquery时使用, js中也不需要再import；也可以通过本地引用，不过需要通过别名路径解析
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // })
    ]
}