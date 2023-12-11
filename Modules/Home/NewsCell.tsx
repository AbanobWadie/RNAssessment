import { Ionicons } from "@expo/vector-icons"
import {
  Dimensions,
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native"
import { Colors } from "../../Utils/Colors"
import React from "react"
import { I18n } from "i18n-js"

interface props {
  title: string
  author: string
  imageUrl: string
  colors: Colors
  i18n: I18n
  onPress: () => void
}

export default function NewsCell({
  title,
  author,
  imageUrl,
  colors,
  i18n,
  onPress,
}: props) {
  function buttonState(isPressed: boolean) {
    const buttonStyle: StyleProp<ViewStyle> = [
      styles.container,
      {
        backgroundColor: colors.secondaryColor,
        flexDirection: useLeftToRight() ? "row" : "row-reverse",
      },
    ]
    return isPressed ? [...buttonStyle, styles.pressed] : buttonStyle
  }

  function useLeftToRight() {
    return i18n.locale === "en"
  }

  return (
    <Pressable style={({ pressed }) => buttonState(pressed)} onPress={onPress}>
      <Image
        style={styles.image}
        source={{ uri: imageUrl }}
        resizeMode="cover"
      />
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.textColor }]}>{title}</Text>
        <Text style={[styles.subTitle, { color: colors.subTitleColor }]}>
          {author}
        </Text>
      </View>
      <Ionicons
        name={useLeftToRight() ? "chevron-forward" : "chevron-back"}
        size={35}
        color={colors?.tabBarIconColor}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingRight: 5,
    margin: 15,
    borderRadius: 15,
  },
  pressed: {
    opacity: 0.5,
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 16,
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  image: {
    height: Dimensions.get("window").width / 3,
    width: Dimensions.get("window").width / 4,
    borderRadius: 20,
  },
})
