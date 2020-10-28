import React, { Fragment } from 'react'
import { ImageBackground } from 'react-native'
import { Video } from 'expo-av'

export const BackgroundImage = ({ children, uri }) => (
  <ImageBackground
    source={{ uri }}
    style={{ width: '100%', height: '100%' }}
    imageStyle={{ borderRadius: 15, borderColor: '#3333', borderWidth: 1 }}
  >
    {children}
  </ImageBackground>
)

export const BackgroundVideo = ({ children, uri }) => (
  <Fragment>
    <Video
      source={{ uri }}
      shouldPlay
      isLooping
      isMuted
      resizeMode={Video.RESIZE_MODE_CONTAIN}
      style={{ width: '100%', height: '100%', position: 'absolute', borderRadius: 15, borderColor: '#3333', borderWidth: 1 }}
    />
    {children}
  </Fragment>
)
