var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: '[name]Conf.bundle.js'
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
                                minimize: true,
                                modules:true,
                                // class命名规则
                                localIdentName:'[path][name]_[local]_[hash:base64:5]'
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
                            loader: 'less-loader'
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css'
        })
    ]
}