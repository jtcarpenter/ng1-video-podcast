// Karma configuration
// Generated on Fri Jan 22 2016 15:02:57 GMT+0000 (GMT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        "node_modules/angular/angular.min.js",
        "node_modules/angular-ui-router/release/angular-ui-router.min.js",
        "node_modules/angular-resource/angular-resource.min.js",
        "node_modules/angular-mocks/angular-mocks.js",
        "app/app.js",
        "app/components/components.js",
        "app/components/vpodnav.view.html",
        "app/components/vpodplayer.view.html",
        "app/header/header.js",
        "app/nav/nav.js",
        "app/player/player.js",
        "tests/*.js"
    ],

    plugins: [
        'karma-jasmine',
        'karma-spec-reporter',
        'karma-coverage',
        'ng-html2js',
        'karma-chrome-launcher',
        'karma-phantomjs-launcher',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
        moduleName: 'templates',
        stripPrefix: 'app/'
    },

    coverageReporter: {
        type : 'text',
        dir : 'coverage/'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],


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
    // browsers: ['Chrome'],
    browsers : ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
