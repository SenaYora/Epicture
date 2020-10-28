import React from 'react'
import { ImageBackground, View, Image, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Icon, Subtitle, Title, Button } from 'native-base'

/**
 * @description Displays header of profile information page
 * @param {Object} data An object containing informations about the user currently logs in
 * @param {Array} categories An array of available categories to displays as profile informations
 * @param {String} selectedCategory Name of the current selected category
 * @param {Function} setCategory Function to set selectedCategory in a higher level component
 */
function InfoProfile({ data, categories, selectedCategory, setCategory }) {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: data.cover }} style={styles.imageBackground}>
        <View style={{ flexDirection: 'row', marginLeft: 30, marginTop: 50, alignItems: 'center' }}>
          <Image source={{ uri: data.avatar + `&nocache=${data.avatar_name}` }} style={styles.pp} />
          <View style={{ marginLeft: 25 }}>
            <Title style={{ fontWeight: 'bold', fontSize: 24, width: '200%' }}>
              {data.url}
            </Title>
            <Subtitle style={{ fontWeight: 'bold', fontSize: 14 }}>
              {data.reputation} pts
              {"   •   "}
              {data.reputation_name}
            </Subtitle>
          </View>
        </View>
        <Button transparent onPress={navigation.openDrawer} style={styles.drawerButton}>
          <Icon name='menu' style={{ fontSize: 33, color: 'white' }} />
        </Button>
        <View style={styles.categoryContainer}>
          {categories.map((e, i) =>
            <Button transparent key={i} style={{ flexDirection: 'column' }} onPress={() => setCategory(e.name)}>
              <Text style={{ fontSize: 14, color: 'white', fontWeight: e.name === selectedCategory ? '700' : '500' }}>{e.label}</Text>
              {e.name === selectedCategory &&
                <View style={styles.selectedCategory} />
              }
            </Button>
          )}
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    position: 'relative',
  },
  drawerButton: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  pp: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 1000,
  },
  categoryContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  selectedCategory: {
    width: '100%',
    height: 5,
    borderRadius: 4,
    backgroundColor: 'white'
  }
})

export default InfoProfile