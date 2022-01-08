import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import HomeNavigator from "./home/HomeNavigator"
import EventNavigator from "./event/EventNavigator"
import MessageNavigator from "./message/MessageNavigator"
import SettingNavigator from "./setting/SettingNavigator"
import { useContextOfAll } from "./Provider"

export default function MainNavigator() {
  const Stack = createBottomTabNavigator()
  const cont = useContextOfAll()

  const color = cont.setting.theme.colors.text

  const scOpt = ({ route }) => {
    return {
      headerShown: false,
      tabBarIcon: ({ focused, size }) => {
        const { name } = route
        return <Icon name={foo[name] + (focused ? '' : '-outline')}
          size={size + (focused ? 6 : 0)} color={color} />
      },
      tabBarActiveTintColor: color,
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true
    }
  }

  return <NavigationContainer theme={cont.setting.theme}>
    <Stack.Navigator screenOptions={scOpt}>
      <Stack.Screen name="홈" component={HomeNavigator} />
      <Stack.Screen name="이벤트" component={EventNavigator} />
      <Stack.Screen name="쪽지" component={MessageNavigator} />
      <Stack.Screen name="설정" component={SettingNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
}

// 아래는 리펙토링 전

interface Foo {
  [key: string]: string;
}
let foo: Foo = {
  '홈': 'home',
  '이벤트': 'calendar-text', //cards //widgets // gift // gamepad-circle //flash
  '쪽지': 'chat-processing', //bell-ring
  '설정': 'cog'
}