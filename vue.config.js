//2018-10-19 add
const webpack = require("webpack")
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    publicPath: process.env.NODE_ENV === 'production' ?
        '/' : '/', // 基本路径
    outputDir: undefined, // 输出文件目录
    assetsDir: undefined,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: (config) => { //https://github.com/vuejs/vue-cli/issues/979


        // A, remove the plugin
        config.plugins.delete('prefetch');


        // console.log(config),
        // sleep();

        // or:
        // B. Alter settings:
        /*config.plugin('prefetch').tap(options => {
        	options.fileBlackList.push([/myasyncRoute(.)+?\.js$/])
        	return options
        })*/
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({ //https://webpack.js.org/plugins/provide-plugin/
                jQuery: "jquery",
                $: "jquery",
            }),
        ]
    },
    runtimeCompiler: undefined,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    parallel: undefined,
    css: undefined,
    devServer: { // webpack-dev-server 相关配置
        // host: '0.0.0.0',
        port: 8082,
        https: false,
        open: true,
        hotOnly: true,
        proxy: {
            '/apis': {
                target: 'http://10.1.3.239:8080/',
                changeOrigin: true,
                pathRewrite: {
                    '^/apis': '/' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            },
        }, // 设置代理

    },
    // 第三方插件配置
    pluginOptions: {},
    //多页面 pages: {}
}
