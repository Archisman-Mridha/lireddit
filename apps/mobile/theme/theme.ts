import { extendTheme } from "native-base"
import { Dimensions } from "react-native"
import { sharedTheme } from "@./frontend"

export const NativeBaseTheme= extendTheme({

    colors: {
        primary: {

            "400": sharedTheme.colors.blue
        }
    },

    components: {
        ScrollView: {
            baseStyle: {

                paddingX: "12.5px"
            },

            defaultProps: {

                showsHorizontalScrollIndicator: false,
                showsVerticalScrollIndicator: false
            }
        },

        Image: {
            baseStyle: {

                width: Dimensions.get("window").width - 25,
                aspectRatio: 1,
                resizeMode: "contain",
                height: "auto"
            }
        },

        Input: {
            baseStyle: {

                height: "47.5px",
                fontFamily: "montserrat-medium",
                borderRadius: "5px",
                paddingLeft: "7.5px",
                marginBottom: "15px",

                _invalid: {

                    marginBottom: "0px"
                }
            },

            defaultProps: {

                borderWidth: 1.5
            }
        },

        Icon: {
            defaultProps: {

                size: "20px"
            }
        },

        FormControlErrorMessage: {
            baseStyle: {

                marginBottom: "15px",
                _text: {

                    fontFamily: "montserrat-medium"
                }
            }
        },

        Button: {
            baseStyle: {

                alignSelf: "flex-start",
                borderRadius: "35px",
                height: "45px",

                _text: {

                    fontFamily: "montserrat-medium"
                }
            },

            defaultProps: {

                backgroundColor: "#0A84FF",
            }
        },

        Text: {
            baseStyle: {

                fontFamily: "montserrat-medium"
            }
        }
    }
})