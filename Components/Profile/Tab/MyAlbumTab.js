import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, FlatList, View, Text, Modal } from 'react-native'
import { Icon } from 'native-base'

import { BackgroundImage, BackgroundVideo } from '../BackgroundItem'
import InfoModal from '../../Home/InfoModal'

import { getMyAlbums, getGalleryAlbumById, getMyAlbumById } from '../../../API/API'
import { drawerBackgroundColor } from '../../../config/theme'

/**
 * @description An Item rendered by upper FlatList
 * @param {String} token Access token to permit the user to call Imgur API
 * @param {Object} item Current item of the upper array
 * @param {Bool} last True if current item is the last item of the upper array
 */
const AlbumItem = ({ token, item, last }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [gallery, setGallery] = useState(null)

  useEffect(() => {
    (async () => {
      if (item.in_gallery) {
        const rep = await getGalleryAlbumById(token, item.id)
        setGallery(rep.data)
      } else {
        const rep = await getMyAlbumById(token, item.id)
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
    return <View style={{ ...styles.itemContainer, height: last ? 200 : 120 }} />

  return (
    <View style={{ ...styles.itemContainer, height: last ? 200 : 120 }}>
      { gallery.images.find(e => e.id === gallery.cover).type !== 'video/mp4' &&
        < BackgroundImage uri={gallery.images.find(e => e.id === gallery.cover).link}>
          <TouchableOpacity transparent style={{ width: '100%', height: '100%' }} onPress={() => setIsModalOpen(prev => !prev)} />
        </BackgroundImage>
      }
      { gallery.images.find(e => e.id === gallery.cover).type === 'video/mp4' &&
        < BackgroundVideo uri={gallery.images.find(e => e.id === gallery.cover).link}>
          <TouchableOpacity transparent style={{ width: '100%', height: '100%' }} onPress={() => setIsModalOpen(prev => !prev)} />
        </ BackgroundVideo>
      }
      <View style={{ ...styles.itemInfo, height: last ? 40 : 30 }}>
        {gallery.in_gallery &&
          <Fragment>
            <View style={styles.infoCat}>
              <Icon name="eye" style={styles.icon} />
              <Text style={styles.text}>{gallery.views}</Text>
            </View>
            <View style={styles.infoCat}>
              <Icon name="ios-arrow-up" style={{ ...styles.icon, marginRight: 5 }} />
              <Text style={styles.text}>{gallery.ups - gallery.downs}</Text>
              <Icon name="ios-arrow-down" style={{ ...styles.icon, marginLeft: 5 }} />
            </View>
          </Fragment>
        }
        {!gallery.in_gallery &&
          <Text style={{ color: 'white', padding: 10, fontSize: 14, fontWeight: 'bold' }}>Hidden</Text>
        }
      </View>
      <Modal transparent visible={isModalOpen} animationType={"slide"}>
        <InfoModal setModalState={setIsModalOpen} item={gallery} setFavoriteById={() => null} setVoteById={setVoteById} setFavoriteById={setFavoriteById} />
      </Modal>
    </View >
  )
}

/**
 * @description Tab which displays all albums (private or public) posted by the user
 * @param {String} token Access token to permit the user to call Imgur API
 */
function MyAlbumTab({ token }) {
  const [albums, setAlbums] = useState(null)

  useEffect(() => {
    (async () => {
      const rep = await getMyAlbums(token)
      setAlbums(rep.data)
    })()
  }, [])

  return (
    <View style={styles.container}>
      { albums &&
        <FlatList
          data={albums.slice(1)}
          renderItem={({ item, index }) => <AlbumItem token={token} item={item} last={index === albums.length - 2 && !(albums.length % 2)} />}
          ListHeaderComponent={() => <AlbumItem token={token} item={albums[0]} last />}
          keyExtractor={album => album.id}
          numColumns={2}
          style={{ marginTop: 10 }}
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
    borderColor: 'black',
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
    marginLeft: 5
  }
})

export default MyAlbumTab