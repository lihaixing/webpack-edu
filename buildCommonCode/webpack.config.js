var webpack =require('webpack');
var path=require('path')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HappyPack = require('happypack')
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
        // 'vendor':['lodash']
    },
    output:{
        // _dirname 表示当前运行的路径
        path:path.resolve(__dirname,'./dist'),
        // 采用chunkhash,解决长缓存问题，只有改变了hash值才变
        filename:'[name].[chunkhash].bundle.js',
        chunkFilename:'[name].[chunkhash].chunk.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'happypack/loader?id=seaStar',
                // 缩小范围，可加快打包速度
                include:path.resolve(__dirname,'src'),
                exclude: '/node_modules/'
            }
        ]
    },
    plugins:[
        // 解决模块增加或减少引起的hash值变化问题
        new webpack.NamedChunksPlugin(),
        new webpack.NamedModulesPlugin(),
        new HappyPack({
            id:'seaStar',
            // 真实的loader
            loaders:[
                {
                    loader:'babel-loader',
                    options:{
                        // 这个插件解决动态import报错的问题
                        plugins:['syntax-dynamic-import']
                    }
                }
            ]
        }),
        // 引用打包的第三方
        new webpack.DllReferencePlugin({
            manifest:require('./src/dll/lodash-manifest.json')
        }),
        // 分析打包结果
        new BundleAnalyzerPlugin(),
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