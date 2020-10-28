import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

import {
  drawerBackgroundColor,
  globalBlueColor,
  drawerReverseTextColor,
  drawerTextColor
} from '../../config/theme'

const SortArray = ({ array, setArray, isSorted }) =>
  <View style={{ flexDirection: 'row', width: '100%' }}>
    {array.map((e, i) => (
      <TouchableOpacity
        style={e.value === isSorted ? styles.buttonSelected : styles.buttonNotSelected}
        key={i}
        onPress={() => { setArray(e.value) }}
      >
        <Text style={{ color: e.value !== isSorted ? drawerTextColor : drawerReverseTextColor, fontWeight: '700' }}>{e.name}</Text>
      </TouchableOpacity>
    ))}
  </View>

const styles = StyleSheet.create({
  buttonSelected: {
    width: '50%',
    height: 30,
    backgroundColor: globalBlueColor,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonNotSelected: {
    width: '50%',
    height: 30,
    backgroundColor: drawerBackgroundColor,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default SortArray