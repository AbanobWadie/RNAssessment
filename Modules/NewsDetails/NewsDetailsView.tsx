import {
  Dimensions,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import RouterProps from "../../Utils/RouterProp"
import News from "../Home/News"
import useColor, { Colors, lightColors } from "../../Utils/Colors"
import { useLayoutEffect, useState } from "react"
import { I18n } from "i18n-js"

export default function NewsDetails({
  navigation,
  route: { params },
}: RouterProps) {
  const news = params?.news as News
  const colors = params?.colors as Colors
  const i18n = params?.i18n as I18n

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t("newsDetails"),
      headerStyle: { backgroundColor: colors.mainColor },
      tabBarStyle: {
        backgroundColor: colors.tabBarColor,
        borderTopColor: colors.tabBarColor,
      },
      tabBarActiveTintColor: colors.tabBarIconColor,
    })
  }, [colors])

  function buttonState(isPressed: boolean) {
    const buttonStyle = [
      styles.linkContainer,
      { borderBottomColor: colors.textColor },
    ]
    return isPressed ? [...buttonStyle, styles.pressed] : buttonStyle
  }

  function useLeftToRight() {
    return i18n.locale === "en"
  }

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}>
      <View
        style={[
          styles.headerContainer,
          { flexDirection: useLeftToRight() ? "row" : "row-reverse" },
        ]}>
        <Image
          style={styles.image}
          source={{ uri: news.imageUrl }}
          resizeMode="stretch"
        />
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              {
                color: colors.textColor,
                textAlign: useLeftToRight() ? "left" : "right",
              },
            ]}>
            {news.title}
          </Text>
          <Text
            style={[
              styles.subTitle,
              {
                color: colors.subTitleColor,
                textAlign: useLeftToRight() ? "left" : "right",
              },
            ]}>
            {news.author}
          </Text>
        </View>
      </View>
      <ScrollView>
        <Text
          style={[
            styles.descriptionTitle,
            {
              color: colors.textColor,
              textAlign: useLeftToRight() ? "left" : "right",
            },
          ]}>
          {i18n.t("description")}
        </Text>
        <Text
          style={[
            styles.description,
            {
              color: colors.textColor,
              textAlign: useLeftToRight() ? "left" : "right",
            },
          ]}>
          {news.description}
        </Text>
        <Pressable
          style={({ pressed }) => buttonState(pressed)}
          onPress={() => Linking.openURL(news.url)}>
          <Text
            style={[
              styles.link,
              {
                color: colors.textColor,
                textAlign: useLeftToRight() ? "left" : "right",
              },
            ]}>
            {i18n.t("seeMore")}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  image: {
    height: Dimensions.get("window").width / 2,
    width: Dimensions.get("window").width / 2.8,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  description: {
    fontSize: 18,
    marginTop: 20,
  },
  pressed: {
    opacity: 0.5,
  },
  linkContainer: {
    // borderBottomWidth: 1,
    // width: 91,
  },
  link: {
    marginTop: 20,
    fontSize: 18,
  },
})
