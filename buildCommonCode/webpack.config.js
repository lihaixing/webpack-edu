var webpack =require('webpack');
var path=require('path')
// pageA pageB common
// module.exports={
//     entry:{
//         // 会把两个文件的公共代码提出来
//         'pageA':'./src/pageA',
//         'pageB':'./src/pageB'
//     },
//     output:{
//         // _dirname 表示当前运行的路径
//         path:path.resolve(__dirname,'./dist'),
//         filename:'[name].bundle.js',
//         chunkFilename:'[name].chunk.js'
//     },
//     plugins:[
//         new webpack.optimize.CommonsChunkPlugin({
//             name:'common',
//             minChunks:2
//         })
//     ]
// }

// 将插件和公共代码都打包进来 pageA pageB vendor
// module.exports={
//     entry:{
//         'pageA':'./src/pageA',
//         'pageB':'./src/pageB',
//         // 插件
//         'vendor':['lodash']
//     },
//     output:{
//         // _dirname 表示当前运行的路径
//         path:path.resolve(__dirname,'./dist'),
//         filename:'[name].bundle.js',
//         chunkFilename:'[name].chunk.js'
//     },
//     plugins:[
//         new webpack.optimize.CommonsChunkPlugin({
//             name:'vendor',
//             minChunks:Infinity
//         })
//     ]
// }

// 将插件和公共代码区分开来 pageA pageB vendor manifest
// module.exports={
//     entry:{
//         'pageA':'./src/pageA',
//         'pageB':'./src/pageB',
//         // 插件
//         'vendor':['lodash']
//     },
//     output:{
//         // _dirname 表示当前运行的路径
//         path:path.resolve(__dirname,'./dist'),
//         filename:'[name].bundle.js',
//         chunkFilename:'[name].chunk.js'
//     },
//     plugins:[
//         new webpack.optimize.CommonsChunkPlugin({
//             name:'vendor',
//             minChunks:Infinity
//         }),
//         new webpack.optimize.CommonsChunkPlugin({
//             name:'manifest',
//             minChunks:Infinity
//         })
//     ]
// }

//pageA和pageB的公共代码提出来
module.exports={
    entry:{
        'pageA':'./src/pageA',
        'pageB':'./src/pageB',
        // 插件
        'vendor':['lodash']
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
            chunks:['pageA','pageB'],
            minChunks:2
        }),
        // 合起来写
        new webpack.optimize.CommonsChunkPlugin({
            names:['vendor','manifest'],
            minChunks:Infinity
        })
    ]
}