import DiskCacheManager from "../../Managers/DiskCacheManager"
import Constants from "../../Utils/Constants"

export async function getLanguage() {
  return DiskCacheManager.shared.retrieve(Constants.language)
}

export async function setLanguage(language: string) {
  DiskCacheManager.shared.store(Constants.language, language)
}

export async function getAppearance() {
  return DiskCacheManager.shared.retrieve(Constants.appearance)
}

export async function setAppearance(appearance: string) {
  DiskCacheManager.shared.store(Constants.appearance, appearance)
}
