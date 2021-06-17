// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  devServer: (devServerConfig) => {
    return {
      ...devServerConfig,
      proxy: [
        {
          context: ["/api"],
          target: process.env.SERVER_DOMAIN
            ? process.env.SERVER_DOMAIN + ":" + process.env.SERVER_PORT
            : "http://localhost:5000",
          changeOrigin: true,
        },
        {
          context: ["/sounds"],
          target: process.env.SERVER_DOMAIN
            ? process.env.SERVER_DOMAIN + ":" + process.env.SERVER_PORT
            : "http://localhost:5000",
          changeOrigin: true,
        },
      ],
    };
  },
};
