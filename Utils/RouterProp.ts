import { NavigationProp, RouteProp } from "@react-navigation/native"

export default interface RouterProps {
  navigation: NavigationProp<any, any>
  route: RouteProp<any, any>
}
