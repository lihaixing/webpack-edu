var path = require('path')
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: '[name].bundle.js',
        chunkFilename:'[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        // loader: 'style-loader/useable',
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
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            modules:true,
                            // class命名规则
                            localIdentName:'[path][name]_[local]_[hash:base64:5]'
                        }
                    },
                      // postcss 放在css-loader之前
                      {
                        loader:'postcss-loader',
                        options:{
                            ident:'postcss',
                            plugins:[
                                // 可以放在最前面
                                require('autoprefixer')()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // 注意loader是从后往前执行的，先是less转成css，然后css嵌入到js中，最后将css嵌入到html中
                    {
                        // loader: 'style-loader/useable',
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
                    {
                        loader: 'css-loader',
                        options: {
                            // minimize: true,
                            // modules:true,
                            // class命名规则
                            // localIdentName:'[path][name]_[local]_[hash:base64:5]'
                        }
                    },  // postcss 放在css-loader之前
                    {
                        loader:'postcss-loader',
                        options:{
                            ident:'postcss',
                            plugins:[
                                // 可以放在最前面
                                // require('autoprefixer')(),
                                // css-next中已经包含了autoprefixer
                                require('postcss-cssnext')()
                            ]
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            }
        ]
    }
}