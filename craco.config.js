module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Ignora gli avvisi per il pacchetto @mediapipe/tasks-vision
      webpackConfig.ignoreWarnings = [
        {
          module: /@mediapipe\/tasks-vision/,
          message: /Failed to parse source map/,
        },
      ];
      return webpackConfig;
    },
  },
}; 