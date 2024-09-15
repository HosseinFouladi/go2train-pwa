module.exports = {
    productName: "GO2TRain",
    appId: "com.go2train.com",
    directories: {
      output: "build/mac"
    },
    files: [
      "dist/**/*",
      "main.js",
      "preload.js"
    ],
    mac: {
      icon: "src/assets/icons/favicon.icns",
      target: ["dmg", "zip"]
    }
  };