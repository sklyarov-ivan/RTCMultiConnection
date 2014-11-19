module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['mocha','chai'],

    files: [
      './RTCMultiConnection.js',
      'test/**/*.js'
    ],

    exclude: [],

    port: 8080,
    browsers: ['Chrome'],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      './RTCMultiConnection.js': ['coverage']
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage'
    },

    plugins: [
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-chai',
      'karma-coverage'
    ]
  });
}