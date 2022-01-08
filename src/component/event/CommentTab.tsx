import React, { FC } from 'react'
import { Text } from 'react-native'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

export const CommentTab: FC<{}> = () => {
    const TabNavigator = createMaterialTopTabNavigator(
        {
          Home: {
            screen: HomeScreen,
            navigationOptions: {
              tabBarLabel: 'Home',
              tabBarIcon: ({tintColor}) => (
                <View>
                  <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
                </View>
              ),
              initialRouteName: 'Home',
              activeColor: '#C71585',
              inactiveColor: '#226557',
              barStyle: {backgroundColor: '#FFC0CB'},
            },
          },
          Chat: {
            screen: ChatScreen,
            navigationOptions: {
              tabBarLabel: 'Chat',
              tabBarIcon: ({tintColor}) => (
                <View>
                  <Icon
                    style={[{color: tintColor}]}
                    size={25}
                    name={'ios-chatboxes'}
                  />
                </View>
              ),
              activeColor: '#4B0082',
              inactiveColor: '#226557',
              barStyle: {backgroundColor: '#B0C4DE'},
            },
          },
          Settings: {
            screen: SettingsScreen,
            navigationOptions: {
              tabBarLabel: 'Settings',
              tabBarIcon: ({tintColor}) => (
                <View>
                  <Icon
                    style={[{color: tintColor}]}
                    size={25}
                    name={'ios-settings'}
                  />
                </View>
              ),
              activeColor: '#006400',
              inactiveColor: '#226557',
              barStyle: {backgroundColor: '#8FBC8F'},
            },
          },
        },
        {
          animationEnabled: true,
          swipeEnabled: true,
          tabBarOptions: {
            pressColor: 'black',
            style: {
              backgroundColor: 'white',
            },
            indicatorStyle: {
              backgroundColor: 'black',
            },
            activeTintColor: '#000',
            inactiveTintColor: '#d1cece',
            showLabel: false,
            showIcon: true,
          },
        },
      );
      return TabNavigator
}