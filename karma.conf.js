// Karma configuration
// Generated on Mon Jun 05 2017 10:59:55 GMT+0900 (대한민국 표준시)
var webpack = require('karma-webpack');
var jshint = require('karma-jshint');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    browserConsoleLogOption: {
        level: 'debug',
        format: '%b %T: %m',
        terminal: true
    },


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'test/**/*.spec.js'
    ],

    plugins: [
        webpack,
        jshint,
        'karma-jasmine',
        'karma-chrome-launcher'
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/**/*.js' : ['jshint'],
        'test/**/*.spec.js' : ['webpack']
    },

    jshint: {
        options: {
            curly: true,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            boss: true,
            devel: true,
            eqnull: true,
            browser: true,
            globals: {}
        },
        summary: true
    },

    webpack: {
        module: {
            loaders: [{
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]
        },
        watch: true
    },

    webpackMiddleware: {
        noInfo: true
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
