import { StyleSheet, Switch, Text, View } from "react-native"
import useColor, { Colors, lightColors } from "../../Utils/Colors"
import { useLayoutEffect, useState } from "react"
import { translations } from "../../Utils/Languages"
import {
  getAppearance,
  getLanguage,
  setAppearance,
  setLanguage,
} from "./SettingsViewModel"
import { useIsFocused } from "@react-navigation/native"
import { I18n } from "i18n-js"
import RouterProps from "../../Utils/RouterProp"

export default function SettingsView({ navigation }: RouterProps) {
  const [languageSwitch, setLanguageSwitch] = useState(true)
  const [appearanceSwitch, setAppearanceSwitch] = useState(true)

  const [colors, setColors] = useState<Colors>(lightColors)
  useColor().then(colors => {
    setColors(colors)
  })

  const [i18n, setI18n] = useState<I18n>(new I18n(translations))

  useLayoutEffect(() => {
    getLanguage().then(language => {
      if (language === null) setLanguageSwitch(true)
      else {
        setI18n(old => {
          old.locale = language
          return old
        })
        setLanguageSwitch(language === "en")
      }
    })

    getAppearance().then(appearance => {
      if (appearance === null) setAppearanceSwitch(true)
      else setAppearanceSwitch(appearance === "light")
    })
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t("settings"),
      tabBarLabel: i18n.t("settings"),
      headerStyle: { backgroundColor: colors.mainColor },
      tabBarStyle: {
        backgroundColor: colors.tabBarColor,
        borderTopColor: colors.tabBarColor,
      },
      tabBarActiveTintColor: colors.tabBarIconColor,
    })
  }, [colors, i18n.locale])

  function saveLanguage(value: boolean) {
    setLanguageSwitch(value)
    setLanguage(value ? "en" : "ar")
    setI18n(old => {
      old.locale = value ? "en" : "ar"
      return old
    })
  }

  function saveAppearance(value: boolean) {
    setAppearanceSwitch(value)
    setAppearance(value ? "light" : "dark")
  }

  function useLeftToRight() {
    return i18n.locale === "en"
  }

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}>
      <View
        style={[
          styles.titleContainer,
          { flexDirection: useLeftToRight() ? "row" : "row-reverse" },
        ]}>
        <Text style={[styles.title, { color: colors.textColor }]}>
          {i18n.t("language")}
        </Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.subTitle, { color: colors.textColor }]}>
            {i18n.t("arabic")}
          </Text>
          <Switch
            trackColor={{
              true: colors.mainColor,
              false: colors.mainColor,
            }}
            ios_backgroundColor={colors.mainColor}
            value={languageSwitch}
            onValueChange={saveLanguage}
          />
          <Text style={[styles.subTitle, { color: colors.textColor }]}>
            {i18n.t("english")}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.titleContainer,
          { flexDirection: useLeftToRight() ? "row" : "row-reverse" },
        ]}>
        <Text style={[styles.title, { color: colors.textColor }]}>
          {i18n.t("appearance")}
        </Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.subTitle, { color: colors.textColor }]}>
            {i18n.t("dark")}
          </Text>
          <Switch
            trackColor={{
              true: colors.mainColor,
              false: colors.mainColor,
            }}
            ios_backgroundColor={colors.mainColor}
            value={appearanceSwitch}
            onValueChange={saveAppearance}
          />
          <Text style={[styles.subTitle, { color: colors.textColor }]}>
            {i18n.t("light")}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subTitle: {
    fontSize: 17,
    marginHorizontal: 10,
  },
})
