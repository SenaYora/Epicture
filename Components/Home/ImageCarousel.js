import React, { Fragment, useState } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { TouchableOpacity, useWindowDimensions, Text, View } from 'react-native'
import { Icon } from 'native-base'

import CustomImage from './CustomImage'
import { globalBlueColor } from '../../config/theme'

/**
 * @function
 * @description An Item rendered by the Carousel. Display Image and Description of current item from the upper array
 * @param {Object} item  Current item from the upper array
 * @param {Number} index  Index of the current item from the upper array
 * @param {Number} activeSlide  Index of the item active on screen
 * @param {Bool} displayDesc  True if there is more than 1 item in the upper array, define if the description has to be displayed
 * @param {Bool} fullDisplay True if the comment should be displayed entirely
 * @param {Function} setFullDisplay Set the fullDisplay value in a higher level component
 */
const CarouselItem = ({ item, index, activeSlide, displayDesc, fullDisplay, setFullDisplay }) => {
  return (
    <Fragment>
      <CustomImage item={item} index={index} activeItem={activeSlide} />
      { item.description && item.description !== "" && displayDesc &&
        <View style={{ height: fullDisplay ? null : 200, position: 'relative' }}>
          <Text style={{ fontWeight: 'bold', color: '#444', paddingLeft: 20 }} >IMAGE DESCRIPTION:</Text>
          <Text style={{ paddingLeft: 20, paddingRight: 50 }}>
            {item.description}
          </Text>
          <TouchableOpacity style={{ position: 'absolute', right: 15, bottom: 0 }} onPress={() => setFullDisplay(prev => !prev)}>
            <Icon name={fullDisplay ? "ios-remove-circle" : "ios-add-circle"} style={{ color: globalBlueColor }} />
          </TouchableOpacity>
        </View>
      }
    </Fragment>
  )
}

/**
 * @function
 * @description A Carousel which permit to slide between images in a post if there is more than 1
 * @param {Array} itemArray An array of items 'image' to display
 */
function ImageCarousel({ itemArray }) {
  const [activeSlide, setAcitveSlide] = useState(0)
  const [fullDisplay, setFullDisplay] = useState(false)
  const width = useWindowDimensions().width

  return (
    <View style={{ position: 'relative' }}>
      <Carousel
        data={itemArray}
        renderItem={({ item, index }) =>
          <CarouselItem
            item={item}
            index={index}
            activeSlide={activeSlide}
            displayDesc={itemArray.length > 1}
            fullDisplay={fullDisplay}
            setFullDisplay={setFullDisplay}
          />
        }
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => setAcitveSlide(index)}
      />
      <Pagination
        dotsLength={itemArray.length}
        activeDotIndex={activeSlide}
      />
    </View>
  );
}

export default ImageCarousel