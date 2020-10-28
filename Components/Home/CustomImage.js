import React from 'react'
import { Image, useWindowDimensions } from 'react-native'
import { Video } from 'expo-av'

/**
 * @function
 * @description Displays whether an Image or a Video depending on its type
 * @param {Object} item  Current item from the upper array
 * @param {Number} index  Index of the current item from the upper array
 * @param {Number} activeSlide  Index of the item active on screen
 */
function CustomImage({ item, index, activeItem }) {
  const width = useWindowDimensions().width
  const ratio = item.height / item.width

  if (item.type === "video/mp4")
    return (
      <Video
        source={{ uri: item.link }}
        shouldPlay={index === activeItem}
        isLooping={index === activeItem}
        isMuted={index !== activeItem}
        resizeMode={Video.RESIZE_MODE_CONTAIN}
        style={{
          width: item.width > width ? width : item.width,
          height: item.width > width ? width * ratio : item.height
        }}
      />
    );

  return (
    <Image
      source={{ uri: item.link }}
      style={{
        alignSelf: 'center',
        width: item.width > width ? width : item.width,
        height: item.width > width ? width * ratio : item.height
      }}
    />
  )
}

export default CustomImage