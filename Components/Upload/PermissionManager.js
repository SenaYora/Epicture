import React from 'react'
import { usePermissions, CAMERA, CAMERA_ROLL } from 'expo-permissions'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'

import { postsBackgroundColor } from '../../config/theme'
import CannotRead from '../../assets/icr-logo.png'

/**
 * @description Displays a placeholder if permissions are not given properly
 * @param {Object} children children native props
 * @param {Object} navigation Control object of the TabNavigation
 */
function PermissionManager({ children, navigation }) {
  const [permission, askForPermission] = usePermissions([CAMERA, CAMERA_ROLL], { ask: false });

  return (
    <View style={styles.main}>
      { (!permission || permission.status !== 'granted') &&
        <View style={styles.noPermissionBox}>
          <Image style={styles.image} source={CannotRead} />
          <Text style={styles.permissionText}>Please give us the permission to read your beautiful gallery !</Text>
          <TouchableOpacity style={styles.leftButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>No Thanks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightButton} onPress={askForPermission}>
            <Text style={styles.buttonText}>Allow</Text>
          </TouchableOpacity>
        </View>
      }
      { (permission && permission.status === 'granted') &&
        children
      }
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: postsBackgroundColor,
    justifyContent: 'center'
  },
  noPermissionBox: {
    backgroundColor: 'white',
    width: '80%',
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 25,
    position: 'relative',
  },
  image: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    resizeMode: "contain",
  },
  permissionText: {
    textAlign: 'center',
    fontWeight: '600',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 14,
    marginBottom: 60,
  },
  leftButton: {
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '50%',
    backgroundColor: '#1E1E1E',
    borderBottomLeftRadius: 25,
    justifyContent: 'center'
  },
  rightButton: {
    height: 50,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '50%',
    backgroundColor: '#6e6',
    borderBottomRightRadius: 25,
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  }
})

export default PermissionManager