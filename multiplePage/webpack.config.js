const webpack = require('webpack');
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpack = require('clean-webpack-plugin')
const ExtractTextWebpack=require('extract-text-webpack-plugin')

const baseConfig = {
    entry: {
        react: 'react'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:ExtractTextWebpack.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextWebpack({
            filename:'css/[name].[chunkhash].css'
        }),
        new CleanWebpack(path.resolve(__dirname, 'dist')),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'react',
            minChunks: Infinity
        })
    ]
}

const generatePage = function (
    {
        title = '',
        entry = '',
        template = './src/index.html',
        name = '',
        chunks = []
    } = {}) {
    return {
        entry,
        plugins:[
            new HtmlWebpackPlugin({
                chunks,
                title,
                template,
                filename:name+'.html'
            })
        ]
    }
}

const pages =[
    generatePage({
        title:'page A',
        entry:{
            a:'./src/pages/a'
        },
        name:'a',
        chunks:['react','a']
    }),
    generatePage({
        title:'page B',
        entry:{
            b:'./src/pages/b'
        },
        name:'b',
        chunks:['react','b']
    }),
    generatePage({
        title:'page C',
        entry:{
            c:'./src/pages/c'
        },
        name:'c',
        chunks:['react','c']
    })
]

//pageA和pageB的公共代码提出来
module.exports = pages.map(page=>merge(baseConfig,page))