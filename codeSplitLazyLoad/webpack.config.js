var webpack =require('webpack');
var path=require('path')

//pageA和pageB的公共代码提出来
module.exports={
    entry:{
        'pageA':'./src/pageA',
        'pageB':'./src/pageB',
        // 插件
        'vendor':['lodash']
    },
    output:{
        // _dirname 表示当前运行的路径 path是要打包到的路径
        path:path.resolve(__dirname,'./dist'),
        // 加载文件时的路径
        publicPath:'./dist/',
        filename:'[name].bundle.js',
        chunkFilename:'[name].chunk.js'
    },
    plugins:[
        // 合起来写
        new webpack.optimize.CommonsChunkPlugin({
            async:'async-common',
            children:true,
            minChunks:2
        })
        // ,
        // new webpack.optimize.CommonsChunkPlugin({
        //     names:['vendor','manifest'],
        //     minChunks:Infinity
        // })
    ]
}