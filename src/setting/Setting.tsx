import React from "react"
import { StyleSheet, Switch, Text, View } from "react-native"
import AccountSetting from "../component/setting/AccountSetting"
import AppSetting from "../component/setting/AppSetting"
import { useContextOfAll } from "../Provider"
import { DarkTheme, DayTheme } from "../Themes"


export default function Setting() {
    const cont = useContextOfAll()
    const style = StyleSheet.create({
        title: {
            margin: 15, fontSize: 20,
            fontWeight: 'bold', color: cont.setting.theme.colors.text
        }
    })
    return <View>
        <Text style={style.title}>내 정보</Text>
        <AppSetting />
        <AccountSetting />
    </View>
}

// export default function Setting() {
//     // return <Text>세팅</Text>
//     const cont = useContextOfAll()
//     console.log("?")
//     return <Switch value={cont.setting.theme.dark} style={{padding: 50}}
//         onValueChange={() => {
//             console.log(cont.setting.theme.dark)
//             cont.setSetting(() => cont.setting.theme.dark ? {theme: DayTheme} : {theme: DarkTheme})}} />
// }

// function toggleTheme(cont) {
//     const setting = cont.setting
//     setting.theme = setting.theme.dark ? DayTheme : DarkTheme
//     console.log(setting)
//     console.log(cont.setSetting)
//     cont.setSetting(setting)
//     console.log(cont.setting)
// }