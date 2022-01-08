import React, { createContext, useContext, useState } from "react"
import type { FC } from "react"
import { Theme } from "@react-navigation/native"
import { DarkTheme } from "./Themes"

export type FontSizeContextType = {
    user: {
        _id: string,
        school: string,
        pinnedPost: string[]
    },
    setUser: any,
    setting: {
        theme: Theme
    },
    setSetting: any
}

const defaultContext = {
    user: {
        _id: '61d87ae9fe46c6f094b969fe',
        school: "몰입캠프 13기",
        pinnedPost: ["게시판0", "게시판1", "게시판2, 게시판3", "게시판4"]
    }, setUser: undefined,
    setting: {
        theme: DarkTheme
    }, setSetting: undefined
}
const ContextOfAll = createContext<FontSizeContextType>(defaultContext)

export const Provider: FC<{}> = ({ children }) => {
    const [user, setUser] = useState({
        _id: '61d87ae9fe46c6f094b969fe',
        school: "몰입캠프 13기",
        pinnedPost: ["게시판0", "게시판1", "게시판2, 게시판3", "게시판4"]
    })
    const [setting, setSetting] = useState({ theme: DarkTheme })
    const value = { user, setUser, setting, setSetting }
    return (
        <ContextOfAll.Provider value={value}>
            {children}
        </ContextOfAll.Provider>
    );
}

export const useContextOfAll = () => {
    return useContext(ContextOfAll)
}