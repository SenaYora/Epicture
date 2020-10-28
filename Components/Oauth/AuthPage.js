import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { WebView } from 'react-native-webview';
import { Container, Header, Left, Body, Right, Title } from 'native-base';

import Config from '../../config/config'
import { androidHeaderColor, headerBackgroundColor } from '../../config/theme'

/**
 * @function
 * @description A Page where the user can login
 * @param {Function} setAccountParams Function to set account parameters when connection is completed
 */
function AuthPage({ setAccountParams }) {
  const onNavigationStateChange = (navigationState) => {
    const paramString = navigationState.url.split("#");
    const params = {}

    if (paramString.length === 2 && paramString[0] === "https://apidocs.imgur.com/") {
      paramString[1].split('&').forEach(e => {
        const param = e.split('=')
        params[param[0]] = param[1]
      })
      params["expiration_date"] = parseInt(params.expires_in) * 1000 + new Date().getTime()
      AsyncStorage.setItem('account_params', JSON.stringify(params))
      setAccountParams({ ...params })
    }
  };

  return (
    <Container>
      <Header rounded style={{ backgroundColor: headerBackgroundColor}} androidStatusBarColor={androidHeaderColor}>
        <Left />
        <Body>
          <Title style={{ color: 'black' }}>Signin to Imgur</Title>
        </Body>
        <Right />
      </Header>
      <WebView
        source={{
          uri: `https://api.imgur.com/oauth2/authorize?client_id=${Config.clientID}&response_type=token`,
          method: "GET"
        }}
        onNavigationStateChange={onNavigationStateChange}
        incognito
      />
    </Container>
  )
}

export default AuthPage