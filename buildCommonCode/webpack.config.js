var webpack =require('webpack');
var path=require('path')
module.exports={
    entry:{
        // 会把两个文件的公共代码提出来
        'pageA':'./src/pageA',
        'pageB':'./src/pageB'
    },
    output:{
        // _dirname 表示当前运行的路径
        path:path.resolve(__dirname,'./dist'),
        filename:'[name].bundle.js',
        chunkFilename:'[name].chunk.js'
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            minChunks:2
        })
    ]
}