const path = require('path')
var webpack = require('webpack')
const productionConfig = require('./webpack.prod.conf')
const developmentConfig = require('./webpack.dev.conf')
const merge = require('webpack-merge')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const generateConfig = env => {
    const scriptLoader = [
        {
            loader: 'babel-loader',
        }
    ].concat(env === 'production'
        ? []
        : [
            {
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            }
        ])
    // 简单写法
    // const scriptLoader = ['babel-loader'].concat(env === 'production'
    //     ? []
    //     : ['eslint-loader']
    const extractLess = new ExtractTextWebpackPlugin({
        filename: '[name].min.css'
    })
    const cssLoaders = [
        {
            loader: 'css-loader',
            options: {
                minimize: env === 'production',
                sourceMap: env === 'development'
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                sourceMap: env === 'development',
                plugins: [
                    require('postcss-cssnext')()
                ].concat(env === 'development'
                    ? []
                    : [
                        require('postcss-sprites')({
                            spritePath: '/img/sprites'
                        })
                    ])
            }
        },
        {
            loader: 'less-loader',
            options: {
                sourceMap: env === 'development'
            }
        }
    ]
    const styleLoader = env === 'production' ? extractLess.extract({
        fallback: 'style-loader',
        use: cssLoaders
    }) : [
        {
            loader: 'style-loader'
        }
    ].concat(cssLoaders)
    const fileLoader = env === 'development'
        ? [
            {
                loader: 'file-loader',
                options: {
                    // publicPath: '/webpack-edu/FileDeal/dist/img',
                    // useRelativePath: true,
                    name: '[name].min.[ext]',
                    outputPath: 'img/'
                }
            }
        ]
        : [
            {
                loader: 'url-loader',
                options: {
                    name: '[name].min.[ext]',
                    limit: 30000,
                    // 引用路径
                    // publicPath: './img',
                    // useRelativePath: true,
                    outputPath: 'img'
                }
            }
        ]
    return {
        entry: {
            app: './src/app.js'
        },
        output: {
            // 指定了根目录
            path: path.resolve(__dirname, '../dist'),
            // publicPath: './',
            publicPath: '/',
            filename: 'js/[name].bundle.js',
            chunkFilename: 'js/[name].chunk.js'
        },
        // 目录解析
        resolve: {
            alias: {
                // 加$表示解析的是一个文件名，而不是目录  这里告诉从哪里找jquery(默认是从node_modules中)
                jquery$: path.resolve(__dirname, '../static/jquery.min.js')
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, 'src'),
                    exclude: path.resolve(__dirname, 'static'),
                    use: scriptLoader,
                    exclude: '/node_modules/' //排除
                },
                {
                    test: /\.less$/,
                    use: styleLoader
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: fileLoader.concat(env === 'production'
                        ? [
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
                        : []
                    )
                },
                {
                    test: /\.(eot|woff2|woff|ttf|svg)$/,
                    use: fileLoader
                },
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
            extractLess,
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html',
                minify: {
                    collapseWhitespace: env === 'production'
                },
                inject: true
            }),
            // 通过npm install jquery时使用, js中也不需要再import；也可以通过本地引用，不过需要通过别名路径解析
            new webpack.ProvidePlugin({
                $: 'jquery'
            })
        ]
    }
}

module.exports = env => {
    let config = env === 'production'
        ? productionConfig
        : developmentConfig
    return merge(generateConfig(env), config)
}