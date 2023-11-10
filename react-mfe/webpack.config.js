const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = (options) => {
  return {
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      publicPath: "http://localhost:4202/",
      uniqueName: "child-react",
    },
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
                presets: ["@babel/react", "@babel/env"],
              },
            },
          ],
        },
      ],
    },
    optimization: {
      splitChunks: false,
    },
    experiments: {
      outputModule: true,
    },
    plugins: [
      new ModuleFederationPlugin({
        library: { type: "module" },
        name: "childReact",
        filename: "remoteEntry.js",
        exposes: {
          "./web-components": "./src/app.js",
        },
      }),
    ],
    devServer: {
      port: 4202,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    },
  };
};
