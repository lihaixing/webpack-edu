module.exports = {
    '/api': {
        target: 'https://www.hao123.com',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
            '^/searchrecom': '/api/searchrecom'
        }
    },
    '/aj': {
        target: 'https://weibo.com',
        changeOrigin: true,
        logLevel: 'debug',
        headers: {
            'Cookie': 'SINAGLOBAL=5838003596212.333.1506271633025; UM_distinctid=162f3903227346-0a0f0855733b3e-6b1b1279-15f900-162f3903228324; _s_tentry=www.hankcs.com; Apache=7743095934172.042.1528737329072; ULV=1528737329240:21:1:1:7743095934172.042.1528737329072:1524412460279; YF-Ugrow-G0=9642b0b34b4c0d569ed7a372f8823a8e; login_sid_t=e6c96368b9e2fa62ef100e450f1cd338; cross_origin_proto=SSL; YF-V5-G0=c072c6ac12a0526ff9af4f0716396363; SSOLoginState=1529164311; un=13453452359; YF-Page-G0=091b90e49b7b3ab2860004fba404a078; wvr=6; UOR=,,www.hao123.com; WBStorage=5548c0baa42e6f3d|undefined; wb_view_log=1600*9001; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9Whl9qVrlTjRzRU6R5HlIApo5JpX5K2hUgL.Fo24Sh.ce0B4SKM2dJLoIf2LxK.L1hBL1hzLxK-L1KqL1hMLxKnLBoBLB.eLxK-L12-LB--LxK-LB--L1-zLxK-L1-zL1-eLxK-L1K2L1K5LxK-L1h.L12zLxKqLBoML1hBt; ALF=1561124537; SCF=AgAJy1ETPHgQx9HFMLtFpRwPEzIyvJ6vnA71Ffnac-uyH1Z49yWSp1Cae-c08HhC-kgdxqzHKcFknWj6rYjvtCQ.; SUB=_2A252L9trDeRhGedH71sX8yrFzjuIHXVVXUujrDV8PUNbmtAKLUWnkW9NUKHT6VlnPthSIX9JSZIW0z_JpHoUQVbB; SUHB=09P8zKw2Sm6ct8'
        }
    }
}