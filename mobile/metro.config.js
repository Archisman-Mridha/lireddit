const { withNxMetro } = require("@nrwl/expo")
const { getDefaultConfig } = require("@expo/metro-config")

const defaultConfig = getDefaultConfig(__dirname)

module.exports = (async ( ) => {
    defaultConfig.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer")

    defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg")
    defaultConfig.resolver.sourceExts.push("svg")

    defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter((ext) => ext !== "cjs")
    defaultConfig.resolver.sourceExts.push("cjs")

    return withNxMetro(defaultConfig, {

        debug: false,
        extensions: [ ]
    })
})( )