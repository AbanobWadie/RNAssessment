import { FlatList, StyleSheet, View } from "react-native"
import NewsCell from "./NewsCell"
import useColor, { Colors, lightColors } from "../../Utils/Colors"
import { useLayoutEffect, useState } from "react"
import { getLanguage, getNews } from "./HomeViewModel"
import News from "./News"
import { Searchbar } from "react-native-paper"
import RouterProps from "../../Utils/RouterProp"
import { translations } from "../../Utils/Languages"
import { useIsFocused } from "@react-navigation/native"
import { I18n } from "i18n-js"

export default function HomeView({ navigation }: RouterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [NewsList, setNewsList] = useState<News[]>([])

  const [colors, setColors] = useState<Colors>(lightColors)
  useColor().then(colors => {
    setColors(colors)
  })

  const [i18n, setI18n] = useState<I18n>(new I18n(translations))

  useLayoutEffect(() => {
    getLanguage().then(language => {
      if (language === null)
        setI18n(old => {
          old.locale = "en"
          return old
        })
      else
        setI18n(old => {
          old.locale = language
          return old
        })
    })

    getNews(searchQuery, i18n)
      .then(news =>
        setNewsList(news.filter(item => item.title !== "[Removed]"))
      )
      .catch(({ message }) => console.log(message))
  }, [searchQuery, i18n.locale, useIsFocused()])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t("home"),
      tabBarLabel: i18n.t("home"),
      headerStyle: { backgroundColor: colors.mainColor },
      tabBarStyle: {
        backgroundColor: colors.tabBarColor,
        borderTopColor: colors.tabBarColor,
      },
      tabBarActiveTintColor: colors.tabBarIconColor,
    })
  }, [colors, i18n.locale])

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}>
      <Searchbar
        style={[styles.searchbar, { backgroundColor: colors.secondaryColor }]}
        elevation={0}
        placeholder={i18n.t("search")}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="grey"
        iconColor={colors.textColor}
        selectionColor={colors.mainColor}
      />

      <FlatList
        data={NewsList}
        keyExtractor={item => item.url}
        renderItem={({ item }) => (
          <NewsCell
            title={item.title}
            author={item.author}
            imageUrl={item.imageUrl}
            colors={colors}
            i18n={i18n}
            onPress={() =>
              navigation.navigate("newsDetails", {
                news: item,
                colors: colors,
                i18n: i18n,
              })
            }
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    marginHorizontal: 10,
    marginVertical: 10,
    color: "white",
  },
})
