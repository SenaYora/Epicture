import React, { Fragment, useEffect, useState } from 'react'
import { Modal, TouchableOpacity, StyleSheet, FlatList, View, Text, ImageBackground } from 'react-native'
import { Icon } from 'native-base'

import InfoModal from '../../Home/InfoModal'
import { BackgroundImage, BackgroundVideo } from '../BackgroundItem'

import { getFavorites, getGalleryAlbumById, getGalleryImageById } from '../../../API/API'
import { drawerBackgroundColor } from '../../../config/theme'

/**
 * @description An Item rendered by upper FlatList if it is a public post
 * @param {String} token Access token to permit the user to call Imgur API
 * @param {Object} item Current item of the upper array
 * @param {Bool} isModalOpen True if the modal should be open, define in an higher level component
 * @param {Function} setIsModalOpen set isModalOpen in an higher level component
 */
const FavoriteGalleryItem = ({ token, item, isModalOpen, setIsModalOpen }) => {
  const [gallery, setGallery] = useState(null)
  const type = gallery && (item.is_album ? gallery.images.find(e => e.id === gallery.cover).type : gallery.type)
  const uri = gallery && (item.is_album ? gallery.images.find(e => e.id === gallery.cover).link : gallery.link)
  const mp4 = gallery && (item.is_album ? gallery.images.find(e => e.id === gallery.cover).mp4 : gallery.mp4)

  useEffect(() => {
    (async () => {
      if (item.is_album) {
        const rep = await getGalleryAlbumById(token, item.id)
        setGallery(rep.data)
      } else {
        const rep = await getGalleryImageById(token, item.id)
        setGallery(rep.data)
      }
    })()
  }, [])

  const setVoteById = (id, value, previousValue) => {
    const _data = { ...gallery }
    _data.vote = value
    if (value === "up" && previousValue === "up")
      _data.ups -= 1
    if (value === "up" && previousValue === "veto")
      _data.ups += 1
    else if (value === "up" && previousValue === "down") {
      _data.ups += 1
      _data.downs -= 1
    }
    else if (value === "down" && previousValue === "down")
      _data.downs -= 1
    else if (value === "down" && previousValue === "veto")
      _data.downs += 1
    else if (value === "down" && previousValue === "up") {
      _data.ups -= 1
      _data.downs += 1
    }
    else if (value === "veto" && previousValue === "up")
      _data.ups -= 1
    else if (value === "veto" && previousValue === "down")
      _data.downs -= 1
    setGallery(_data)
  }

  const setFavoriteById = (id, value) => {
    const _data = { ...gallery }
    _data.favorite = value
    _data.favorite_count += value ? 1 : -1
    setGallery(_data)
  }

  if (!gallery)
    return <Fragment />

  return (
    <Fragment>
      {type !== 'video/mp4' &&
        < BackgroundImage uri={uri}>
          <TouchableOpacity transparent style={{ width: '100%', height: '100%' }} onPress={() => setIsModalOpen(prev => !prev)} />
        </BackgroundImage>
      }
      {type === 'video/mp4' &&
        < BackgroundVideo uri={mp4}>
          <TouchableOpacity transparent style={{ width: '100%', height: '100%' }} onPress={() => setIsModalOpen(prev => !prev)} />
        </ BackgroundVideo>
      }
      <Modal transparent visible={isModalOpen} animationType={"slide"}>
        <InfoModal setModalState={setIsModalOpen} item={gallery} setFavoriteById={() => null} setVoteById={setVoteById} setFavoriteById={setFavoriteById} />
      </Modal>
    </Fragment >
  )
}

/**
 * @description An Item rendered by upper FlatList
 * @param {String} token Access token to permit the user to call Imgur API
 * @param {Object} item Current item of the upper array
 * @param {Bool} last True if current item is the last item of the upper array
 * @param {Function} setVoteById set vote values of an higher level component
 * @param {Function} setFavoriteById set favorite values of an higher level component
 */
const FavoriteItem = ({ token, item, last, setVoteById, setFavoriteById }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <View style={{ ...styles.itemContainer, height: last ? 200 : 120 }}>
      { item.in_gallery &&
        <FavoriteGalleryItem token={token} item={item} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      }
      { !item.in_gallery && item.type !== 'video/mp4' &&
        < BackgroundImage uri={item.link}>
          <TouchableOpacity transparent style={{ width: '100%', height: '100%' }} onPress={() => setIsModalOpen(prev => !prev)} />
        </BackgroundImage>
      }
      { !item.in_gallery && item.type === 'video/mp4' &&
        < BackgroundVideo uri={item.link}>
          <TouchableOpacity transparent style={{ width: '100%', height: '100%' }} onPress={() => setIsModalOpen(prev => !prev)} />
        </ BackgroundVideo>
      }
      <View style={{ ...styles.itemInfo, height: last ? 40 : 30 }}>
        <View style={styles.infoCat}>
          <Icon name="eye" style={styles.icon} />
          <Text style={styles.text}>{item.views}</Text>
        </View>
        <View style={styles.infoCat}>
          <Icon name="ios-arrow-up" style={styles.icon} />
          <Text style={styles.text}>{item.ups - item.downs}</Text>
          <Icon name="ios-arrow-down" style={styles.icon} />
        </View>
      </View>
      { !item.in_gallery &&
        <Modal transparent visible={isModalOpen} animationType={"slide"}>
          <InfoModal setModalState={setIsModalOpen} item={item} setFavoriteById={() => null} setVoteById={setVoteById} setFavoriteById={setFavoriteById} />
        </Modal>
      }
    </View >
  )
}

/**
 * @description Tab which displays all liked posts (private or public) of the user
 * @param {String} token Access token to permit the user to call Imgur API
 */
function MyFavoritesTab({ token }) {
  const [favorites, setFavorites] = useState(null)

  useEffect(() => {
    (async () => {
      const rep = await getFavorites(token)
      setFavorites(rep.data)
    })()
  }, [])

  const setVoteById = (id, value, previousValue) => {
    const _data = [...favorites]
    _data.find(e => e.id === id).vote = value
    if (value === "up" && previousValue === "up")
      _data.find(e => e.id === id).ups -= 1
    if (value === "up" && previousValue === "veto")
      _data.find(e => e.id === id).ups += 1
    else if (value === "up" && previousValue === "down") {
      _data.find(e => e.id === id).ups += 1
      _data.find(e => e.id === id).downs -= 1
    }
    else if (value === "down" && previousValue === "down")
      _data.find(e => e.id === id).downs -= 1
    else if (value === "down" && previousValue === "veto")
      _data.find(e => e.id === id).downs += 1
    else if (value === "down" && previousValue === "up") {
      _data.find(e => e.id === id).ups -= 1
      _data.find(e => e.id === id).downs += 1
    }
    else if (value === "veto" && previousValue === "up")
      _data.find(e => e.id === id).ups -= 1
    else if (value === "veto" && previousValue === "down")
      _data.find(e => e.id === id).downs -= 1
    setFavorites(_data)
  }

  const setFavoriteById = (id, value) => {
    const _data = [...favorites]
    _data.find(e => e.id === id).favorite = value
    _data.find(e => e.id === id).favorite_count += value ? 1 : -1
    setFavorites(_data)
  }

  return (
    <View style={styles.container}>
      { favorites &&
        <FlatList
          data={favorites.slice(1)}
          renderItem={({ item, index }) => <FavoriteItem token={token} item={item} last={index === favorites.length - 2 && !(favorites.length % 2)} setVoteById={setVoteById} setFavoriteById={setFavoriteById} />}
          ListHeaderComponent={() => <FavoriteItem token={token} item={favorites[0]} last setVoteById={setVoteById} setFavoriteById={setFavoriteById} />}
          keyExtractor={favorite => favorite.id}
          numColumns={2}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '70%',
    padding: 20,
  },
  itemContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: drawerBackgroundColor,
    margin: 10,
    borderRadius: 15,
  },
  itemInfo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#333a',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoCat: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    color: 'white',
    fontSize: 17,
  },
  text: {
    color: 'white',
    fontSize: 13,
    marginLeft: 5,
    marginRight: 5
  }
})

export default MyFavoritesTab