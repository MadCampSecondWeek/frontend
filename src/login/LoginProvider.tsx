import React, { createContext, useContext, useState } from "react"
import type { FC } from "react"

export type FontSizeContextType = {
    schoolName: string,
    setSchoolName: any,
    schoolCode: string,
    setSchoolCode: any
}

const defaultContext = {
    schoolName: '학교를 선택해주세요',
    setSchoolName: undefined,
    schoolCode: '-1',
    setSchoolCode: undefined
}

const ContextOfAll = createContext<FontSizeContextType>(defaultContext)

export const LoginProvider: FC<{}> = ({ children }) => {
    const [schoolName, setSchoolName] = useState('학교를 선택해주세요')
    const [schoolCode, setSchoolCode] = useState('-1')
    const value = { schoolName, setSchoolName, schoolCode, setSchoolCode }
    return (
        <ContextOfAll.Provider value={value}>
            {children}
        </ContextOfAll.Provider>
    );
}

export const useContextOfLogin = () => {
    return useContext(ContextOfAll)
}