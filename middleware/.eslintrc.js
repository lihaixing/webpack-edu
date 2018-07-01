module.exports = {
    root: true,
    extends: 'standard', // 需要安装额外规则插件
    plugins: [
        'html'
    ],
    env: {
        browser: true, // 浏览器环境
        node: true
    },
    globals: {
        // 将$设置成全局变量，否则会提示$没有被定义
        $: true
    },
    rules: {
        // 自定义规则 表示4个空格，默认2个空格
        indent: ['error', 4],
        // 代码结尾不需要换行
        'eol-last': ['error', 'never']
    }
}