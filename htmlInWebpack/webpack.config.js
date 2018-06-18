var path = require('path')
var webpack = require('webpack')
var PurifyCss = require('purifycss-webpack')
// 处理css多路径问题
var glob = require('glob-all')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        // 指定了根目录
        path: path.resolve(__dirname, 'dist'),
        // publicPath: './',
        publicPath: '/',
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].chunk.js'
    },
    devtool:'source-map',
    devServer: {
        port: 9001,
        inline: true,
        // historyApiFallback:true, //访问单页面，不会404
        historyApiFallback: {
            rewrites: [
                {
                    // from: '/pages/a',
                    from: '/^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/',
                    // to: '/pages/a.html'
                    to: function (context) {
                        return context.match[2] + '.html'
                    }
                }
            ]
        },
        // 代理接口
        proxy: {
            '/api': {
                target: 'https://www.hao123.com',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    '^/searchrecom': '/api/searchrecom'
                }
            },
            '/aj': {
                target: 'https://weibo.com',
                changeOrigin: true,
                logLevel: 'debug',
                headers: {
                    'Cookie': 'SINAGLOBAL=5838003596212.333.1506271633025; UM_distinctid=162f3903227346-0a0f0855733b3e-6b1b1279-15f900-162f3903228324; _s_tentry=www.hankcs.com; Apache=7743095934172.042.1528737329072; ULV=1528737329240:21:1:1:7743095934172.042.1528737329072:1524412460279; YF-Ugrow-G0=9642b0b34b4c0d569ed7a372f8823a8e; login_sid_t=e6c96368b9e2fa62ef100e450f1cd338; cross_origin_proto=SSL; YF-V5-G0=c072c6ac12a0526ff9af4f0716396363; SSOLoginState=1529164311; un=13453452359; YF-Page-G0=091b90e49b7b3ab2860004fba404a078; wb_view_log=1600*9001; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9Whl9qVrlTjRzRU6R5HlIApo5JpX5K2hUgL.Fo24Sh.ce0B4SKM2dJLoIf2LxK.L1hBL1hzLxK-L1KqL1hMLxKnLBoBLB.eLxK-L12-LB--LxK-LB--L1-zLxK-L1-zL1-eLxK-L1K2L1K5LxK-L1h.L12zLxKqLBoML1hBt; ALF=1560835264; SCF=AgAJy1ETPHgQx9HFMLtFpRwPEzIyvJ6vnA71Ffnac-uyvGaBza3nE8CECueMnFy0BFsQk3kAnGBoLSeLQeHUJx4.; SUB=_2A252IzEQDeRhGedH71sX8yrFzjuIHXVVWSXYrDV8PUNbmtANLVTgkW9NUKHT6Tjag6u-e6dMSWJXatJftpGTHW2S; SUHB=0U1IDzaMQCHwka; wvr=6; UOR=,,www.hao123.com'
                }
            }
        },
        hot: true,
        hotOnly: true,
        overlay:true
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
                test: /\.js$/,
                include:path.resolve(__dirname,'src'),
                exclude:path.resolve(__dirname,'static'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['babel-preset-env']
                            ]
                        }
                    },
                    // 必须放在babel-loader之前执行
                    {
                        loader: 'eslint-loader',
                        options: {
                            formatter:require('eslint-friendly-formatter')
                        }
                    }
                ],
                exclude: '/node_modules/' //排除
            },
            // {
            //     test: /\.css$/,
            //     use: ExtractTextWebpackPlugin.extract({
            //         // 如果没有提取出来，用style-loader嵌入到html中
            //         fallback: {
            //             loader: 'style-loader',
            //             options: {
            //                 // 插入到dom 有几个css文件就会有几个style标签
            //                 insertInto: '#app',
            //                 // 只能有一个style标签
            //                 singleton: true,
            //                 // 形变函数，浏览器中执行js时，对css的处理
            //                 transform: './css.transform.js'
            //             }
            //         },
            //         // 如果提取出来，怎么处理
            //         use: [
            //             {
            //                 loader: 'css-loader',
            //                 options: {
            //                     // minimize: true,
            //                     modules: true,
            //                     // class命名规则
            //                     localIdentName: '[path][name]_[local]_[hash:base64:5]'
            //                 }
            //             },
            //             {
            //                 loader: 'postcss-loader',
            //                 options: {
            //                     ident: 'postcss',
            //                     plugins: [
            //                         // 合成一张图片
            //                         require('postcss-sprites')({
            //                             spritePath: '/img/sprites'
            //                         }),
            //                         require('postcss-cssnext')()
            //                     ]
            //                 }
            //             }
            //         ]
            //     })
            // },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // 插入到dom 有几个css文件就会有几个style标签
                            insertInto: '#app',
                            // 只能有一个style标签
                            // singleton: true,
                            // 形变函数，浏览器中执行js时，对css的处理
                            transform: './css.transform.js',
                            sourceMap:true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // minimize: true,
                            modules: true,
                            sourceMap:true,
                            // class命名规则
                            localIdentName: '[path][name]_[local]_[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap:true,
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
            },
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({ //css提取出去就不能用热跟新了
                    // 如果没有提取出来，用style-loader嵌入到html中
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            // 插入到dom 有几个css文件就会有几个style标签
                            insertInto: '#app',
                            // 只能有一个style标签
                            // singleton: true,
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
                            limit: 30000,
                            // 引用路径
                            publicPath: './img/sprites',
                            // 表示将相对路径放到dist目录下，如果这里设置成false,需要自己设置路径
                            // useRelativePath: true,
                            outputPath: 'img/sprites'
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
                            publicPath: './fonts',
                            // useRelativePath: true,
                            outputPath: 'fonts'
                        }
                    }
                ]
            },
            // {
            //     // 找到使用jquery模块 此处用法和 new webpack.ProvidePlugin 方法一致
            //     test: path.resolve(__dirname, 'src/app.js'),
            //     use: [
            //         {
            //             loader: 'imports-loader',
            //             options: {
            //                 $: 'jquery'
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src']
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            // 默认会把所有entry中的js载入到html,现在可以指定
            // chunks: ['app'],
            minify: {
                // 压缩空格
                collapseWhitespace: true
            },
            inject: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new HtmlInlineChunkPlugin({
            // 将引入的manifest文件直接写到script标签中
            inlineChunks: ['manifest']
        }),
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
        // new webpack.optimize.UglifyJsPlugin(),
        // 通过npm install jquery时使用, js中也不需要再import；也可以通过本地引用，不过需要通过别名路径解析
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        // 每次打包先清除目录
        new CleanWebpackPlugin(['dist']),

        // 模块热更新相关
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()

    ]
}