import { Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_800ExtraBold, useFonts } from "@expo-google-fonts/montserrat"

export function useLoadFonts( ) {
    const [ isFontsLoaded ]= useFonts({

        "montserrat-medium": Montserrat_500Medium,
        "montserrat-semibold": Montserrat_600SemiBold,
        "montserrat-bold": Montserrat_700Bold,
        "montserrat-extrabold": Montserrat_800ExtraBold
    })

    return isFontsLoaded
}