import { plainToInstance } from "class-transformer"
import ApiManager from "../../Managers/ApiManager"
import NetworkManager, { HttpMethod } from "../../Managers/NetworkManager"
import News from "./News"
import DiskCacheManager from "../../Managers/DiskCacheManager"
import Constants from "../../Utils/Constants"
import { I18n } from "i18n-js"

export async function getLanguage() {
  return DiskCacheManager.shared.retrieve(Constants.language)
}

export async function getNews(searchText: string, i18n: I18n) {
  const params = {
    q: searchText ? searchText : i18n.t("searchText"),
    language: i18n.locale,
    searchIn: "title",
  }
  const respose = await NetworkManager(ApiManager.news, HttpMethod.get, params)

  return plainToInstance(News, respose.data.articles as [])
}
