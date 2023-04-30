module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
         // Принудительное использование встроенного CSS
    css: {
        extract: false
    },
         // Расширяем конфигурацию webpack, добавляя компоненты для компиляции
    chainWebpack: config => {
        config.module
            .rule('js')
            .include
            .add('/colorPicker')
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                                 // Изменить его параметры ...
                return options
            })
    }
}