import { useColorScheme } from "react-native"
import DiskCacheManager from "../Managers/DiskCacheManager"
import Constants from "./Constants"

export type Colors = {
  mainColor: string
  textColor: string
  secondaryColor: string
  tabBarColor: string
  tabBarIconColor: string
  backgroundColor: string
  subTitleColor: string
}

export const lightColors: Colors = {
  mainColor: "#019EAD",
  textColor: "#019EAD",
  secondaryColor: "white",
  tabBarColor: "#DFDFDF",
  tabBarIconColor: "#019EAD",
  backgroundColor: "#F2F2F7",
  subTitleColor: "#C26042",
}

export const darkColors: Colors = {
  mainColor: "#004951",
  textColor: "white",
  secondaryColor: "#1F2124",
  tabBarColor: "#3F3F3F",
  tabBarIconColor: "#019EAD",
  backgroundColor: "black",
  subTitleColor: "#C26042",
}

export default async function useColor() {
  // const colorTheame = useColorScheme()
  const appearance = await DiskCacheManager.shared.retrieve(
    Constants.appearance
  )
  return appearance === "light" ? lightColors : darkColors
}
