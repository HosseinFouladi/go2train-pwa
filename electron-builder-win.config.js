module.exports = {
    productName: "GO2TRain",
    appId: "com.go2train.com",
    directories: {
      output: "build/win"
    },
    files: [
      "dist/**/*",
      "main.js",
      "preload.js"
    ],
    win: {
      icon: "src/assets/icons/favicon.ico",
      target: ["nsis", "zip"]
    }
  };