import AsyncStorage from "@react-native-async-storage/async-storage"

export default class DiskCacheManager {
  static shared = new DiskCacheManager()
  private constructor() {}

  async store(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (error) {
      console.log(error)
    }
  }

  async retrieve(key: string) {
    try {
      return await AsyncStorage.getItem(key)
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
