import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Search from './Home/Search'
import Profile from './Profile/Profile'
import Upload from './Upload/Upload'
import PermissionManager from './Upload/PermissionManager'

const Tab = createBottomTabNavigator();

const iconList = [
  {
    tab: "Home",
    icon: "md-home",
    iconFocused: "md-home"
  },
  {
    tab: "Upload",
    icon: "ios-camera",
    iconFocused: "ios-camera"
  },
  {
    tab: "Profile",
    icon: "ios-person",
    iconFocused: "ios-person"
  },
]

/**
 * @function
 * @description Wrapper of the Upload & Permission Component
 * @param {Object} navigation Control object of the TabNavigation
 */
const UploadWrapper = ({ navigation }) => (
  <PermissionManager navigation={navigation}>
    <Upload />
  </PermissionManager>
)

/**
 * @function
 * @description Navigation component to sswitch between pages
 * @param {Function} disconnectAccount Function to trigger the disonnection of the user
 */
function Navigation({ disconnectAccount }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const { icon, iconFocused } = iconList.find(e => e.tab == route.name)
            return <Ionicons name={focused ? iconFocused : icon} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={Search} />
        <Tab.Screen name="Upload" component={UploadWrapper} />
        <Tab.Screen name="Profile">
          {() => <Profile disconnectAccount={disconnectAccount} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation