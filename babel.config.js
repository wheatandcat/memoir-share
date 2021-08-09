// @generated: @expo/next-adapter@2.1.52
// Learn more: https://docs.expo.io/guides/using-nextjs/

module.exports = {
  presets: ["@expo/next-adapter/babel"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          components: "./components",
          share: "./share",
          __mockData__: "./__mockData__",
        },
      },
    ],
  ],
  overrides: [
    {
      test: "./node_modules/react-native-reanimated/*",
      plugins: ["@babel/plugin-proposal-class-properties"],
    },
    {
      test: "./node_modules/@expo/vector-icons/*",
      plugins: ["@babel/plugin-proposal-class-properties"],
    },
    {
      test: "./node_modules/@expo-google-fonts/*",
      plugins: ["@babel/plugin-proposal-class-properties"],
    },
  ],
};
