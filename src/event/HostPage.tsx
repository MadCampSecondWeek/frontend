import React from 'react'
import { useEffect } from 'react';
import { View } from 'react-native';

export default function HostPage() {
    useEffect(() => {
        getJSON(setData, select)
    }, [select]);

    const renderItem = ({ item }) => (
        <Item currentData={item} />
    )    

    const Item = ({ currentData }) => <View />

    return 
}