import React, { Fragment, useState } from 'react';
import { Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Right } from 'native-base'
import { Video } from 'expo-av'

import InfoModal from './InfoModal'

import { globalBlueColor, titleTextColor, homeBackgroundColor } from '../../config/theme'

/**
 * @function
 * @description Displays an Image or a Video depending on its type
 * @param {Object} info An object containing current item's informations
 */
function CustomImage({ info }) {
  const uri = !info.images ? info.link : info.images[0].link
  const type = !info.images ? info.type : info.images[0].type

  if (type === "video/mp4")
    return <Video source={{ uri }} style={styles.video} shouldPlay isLooping isMuted resizeMode={Video.RESIZE_MODE_CONTAIN} />
  return <Image source={{ uri }} style={styles.image} />
}

/**
 * @function
 * @description Displays a card with basic current item's informations. Open a modal on click
 * @param {Object} info An object containing current item's informations
 * @param {Function} setFavoriteById A function to set favorite values depending on the id in a higher level component
 * @param {Function} setVoteById A function to set vote values depending on the id in a higher level component
 */
function Gallery({ info, setFavoriteById, setVoteById }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Fragment>
      <Modal transparent visible={isModalOpen} animationType={"slide"}>
        <InfoModal setModalState={setIsModalOpen} item={info} setFavoriteById={setFavoriteById} setVoteById={setVoteById} />
      </Modal>
      <TouchableOpacity style={styles.item} onPress={() => setIsModalOpen(true)}>
        <Card>
          <CardItem>
            <Left>
              <Text numberOfLines={1} style={styles.titleText}>{info.title}</Text>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <CustomImage info={info} />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon name="heart" style={{ color: globalBlueColor }} />
                <Text style={{ color: globalBlueColor }}>{info.favorite_count} Favorite{info.favorite_count ? 's' : ''}</Text>
              </Button>
            </Left>
            <Right>
              <Button transparent>
                <Icon name="chatbubbles" style={{ color: globalBlueColor }} />
                <Text style={{ color: globalBlueColor }}>{info.comment_count} comment{info.comment_count ? 's' : ''}</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: homeBackgroundColor,
  },
  titleText: {
    color: titleTextColor,
    fontWeight: '700',
  },
  image: {
    height: 300,
    width: null,
    flex: 1,
    resizeMode: 'contain'
  },
  video: {
    height: 300,
    width: '100%',
    resizeMode: 'center',
    flex: 1
  }
})

export default Gallery