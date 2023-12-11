import { Expose } from "class-transformer"

export default class News {
  title = ""
  author = ""
  @Expose({ name: "urlToImage" })
  imageUrl = ""
  description = ""
  url = ""
}
