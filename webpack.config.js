import path from "path";
import { fileURLToPath } from "url";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const production = process.env.NODE_ENV === "production";

const config = {
  // Change to an array for multiple files as entry points
  entry: {
    main: "./src/js/main.js",
    home: "./src/js/home.js",
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "public", "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        // processed last to first!
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: "bundle.css" })], // this replaces the styleloader (TODO remove) used for css
  // test this works!
  resolve: {
    alias: {
      "@": path.join(__dirname, "src/"),
    },
  },
  devtool: "inline-source-map",
  // devServer will build JS in memory and keep in memory so public/dist/bundle.js file wouldnt be used
  mode: "development",
  //   devServer: {
  //   watchFiles: ["src/**/*"],
  //     path: path.join(__dirname, "public", "dist"),
  //     port: 8080,
  //   },
};

if (production) {
  config.mode = "production";
  // config.devtool = // TODO
}

export default config;
