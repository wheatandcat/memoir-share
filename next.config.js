const { withExpo } = require("@expo/next-adapter");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["react-native-web"]);
const withImages = require("next-images");

const nextConfig = {
  images: {
    disableStaticImages: true,
  },
};

module.exports = withPlugins(
  [withTM, withFonts, withImages, [withExpo, { projectRoot: __dirname }]],
  nextConfig
);

function withFonts(nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
        );
      }

      const enableSvg = nextConfig.enableSvg || false;

      let testPattern = /\.(woff(2)?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/;

      if (enableSvg)
        testPattern = /\.(woff(2)?|eot|ttf|otf|svg)(\?v=\d+\.\d+\.\d+)?$/;

      config.module.rules.push({
        test: testPattern,
        // Next.js already handles url() in css/sass/scss files
        issuer: /\.\w+(?<!(s?c|sa)ss)$/i,
        use: [
          {
            loader: require.resolve("url-loader"),
            options: {
              esModule: false,
              limit: 50000,
              name: "./static/fonts/[name].[ext]",
            },
          },
        ],
      });

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
}
