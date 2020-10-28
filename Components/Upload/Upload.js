import React from 'react'
import { View, StyleSheet } from 'react-native'

import ImagePicker from './ImagePicker'
import { postsBackgroundColor } from '../../config/theme'

/**
 * @description Container of the Upload Page
 */
function Upload() {
  return (
    <View style={styles.main}>
      <ImagePicker />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: postsBackgroundColor,
  }
})

export default Upload