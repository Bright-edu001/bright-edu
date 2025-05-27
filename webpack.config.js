const path = require("path");
const webpack = require("webpack");

module.exports = {
  // 配置 bundle splitting
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
        common: {
          name: "common",
          minChunks: 2,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },

  // 模組解析優化
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@styles": path.resolve(__dirname, "src/styles"),
    },
  },

  // 生產環境優化
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
};
