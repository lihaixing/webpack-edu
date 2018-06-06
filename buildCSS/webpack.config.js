var path = require('path')
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath:'./dist/',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        // loader: 'style-loader/useable',
                        loader: 'style-loader',
                        options:{
                            // 插入到dom 有几个css文件就会有几个style标签
                            insertInto:'#app',
                            // 只能有一个style标签
                            singleton:true,
                            // 形变函数，浏览器中执行js时，对css的处理
                            transform:'./css.transform.js'
                        }
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
}