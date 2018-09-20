// //vue.config.js
// const path = require('path')
// const debug = process.env.NODE_ENV !== 'production'
// // const VueConf = require('./src/assets/js/libs/vue_config_class')
// // const vueConf = new VueConf(process.argv)
// module.exports={
//     // outputDir: 'dist', // 构建输出目录
//     // assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
//     // lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | 'error'
//     // runtimeCompiler: true, // 运行时版本是否需要编译
//     // transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
//     // productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
//     // configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
//     //     // if (debug) { // 开发环境配置
//     //     //     config.devtool = 'cheap-module-eval-source-map'
//     //     // } else { // 生产环境配置
//     //     // }
//     //     Object.assign(config, { // 开发生产共同配置
//     //         resolve: {
//     //             alias: {
//     //                 '@': path.resolve(__dirname, './src'),
//     //                 '@c': path.resolve(__dirname, './src/components'),
//     //                 'vue$': 'vue/dist/vue.esm.js',
//     //                 'assets':resolve('../../assets')
//     //             }
//     //         }
//     //     })
//     // },
//     // chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
//     //     if (debug) {
//     //         // 本地开发配置
//     //     } else {
//     //         // 生产开发配置
//     //     }
//     // },
//     css: { // 配置高于chainWebpack中关于css loader的配置
//       //  modules: true, // 是否开启支持‘foo.module.css’样式
//      //   extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
//      //   sourceMap: false, // 是否在构建样式地图，false将提高构建速度
//         loaderOptions: { // css预设器配置项
//             css: {
//                 localIdentName: '[name]-[hash]',
//                 camelCase: 'only'
//             },
//             stylus: {}
//         }
//     },
//     parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
//     pluginOptions: { // 第三方插件配置
//     },
//     pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
//     },
//     devServer: {
//         open: true,
//         host: '0.0.0.0',
//         port: 8080,
//         https: false,
//         hotOnly: false,
//         proxy: {
//             '': {
//                 target: 'http://www.youbian.link/api/v2',
//                 ws: true,
//                 changOrigin: true
//             }
//         },
//         before: app => {}
//     }
    module.exports = {
    // 基本路径
    baseUrl: './',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    //     configureWebpack: {
    //         plugins: [
    //             new webpack.optimize.UglifyJsPlugin({
    //                 compress:{
    //                     warnings: false,
    //                     drop_debugger: true,
    //                     drop_console: true
    //                 }
    //             })
    //         ]
    //     },
    // // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
       // extract: true,
        // 开启 CSS source maps?
     //   sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            postcss:{
                'postcss-theme-variables':{
                    vars: {
                        orange: '#f85'
                    },
                    prefix: '$'
                }
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
     //   modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }

}