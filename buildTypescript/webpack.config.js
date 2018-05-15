module.exports={
    entry:{
        app:'./src/app.ts'
    },
    output:{
        filename:'[name].[hash:8].js'
    },
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                // use:'babel-loader',
                use:{
                    loader:'ts-loader',
                    // options:{
                    //     presets:[
                    //         ['babel-preset-env',{
                    //         targets:{
                    //             // 对那些浏览器进行编译
                    //             browsers:['last 2 versions']
                    //             // 还可以制定浏览器 此时es6并没有被转化过来，因为此版本支持es6
                    //             // chrome:'52'
                    //         }
                    //     }]
                    // ]
                    // }
                }
                // exclude:'/node_modules/' //排除
            }
        ]
    }
}