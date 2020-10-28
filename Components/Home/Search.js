import React, { useEffect, useState } from 'react';
import { Header, Button, Text, Item, Input, Icon, Picker, Right, Spinner } from 'native-base';
import { View, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import Gallery from './Gallery'

import { start, searchGallery, sortGallery } from '../../API/API'
import { headerBackgroundColor, androidHeaderColor, spinnerColor } from '../../config/theme'

/**
 * @function
 * @description Start by requesting the most Popular posts to Imgur. Enable the user to search posts by keyword. He can also filter items by Popularity or more... This component displays the array returned by Imgur and open a Modal when an Item is pressed
 */
function Search() {
  const [searchedText, setSearchedText] = useState("")
  const [section, setSection] = useState("top")
  const [sort, setSort] = useState("viral")
  const [data, setData] = useState(null)
  const [accountParams, setAccoutParams] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      const acc = JSON.parse(await AsyncStorage.getItem("account_params"))
      start(acc.access_token).then(rep => setData(rep.data))
      setAccoutParams(acc)
    })()
  }, [])

  const onSectionChange = (value) => {
    setIsLoading(true)
    if (searchedText.length > 0) {
      searchGallery(accountParams.access_token, searchedText, sort).then(rep => { setData(rep.data); setIsLoading(false) })
    } else {
      sortGallery(accountParams.access_token, value, sort).then(rep => { setData(rep.data); setIsLoading(false) })
    }
    setSection(value)
  }

  const onSortChange = (value) => {
    setIsLoading(true)
    if (searchedText.length > 0) {
      searchGallery(accountParams.access_token, searchedText, value).then(rep => { setData(rep.data); setIsLoading(false) })
    } else {
      sortGallery(accountParams.access_token, section, value).then(rep => { setData(rep.data); setIsLoading(false) })
    }
    setSort(value)
  }

  const loadSearch = () => {
    setIsLoading(true)
    if (searchedText.length > 0) {
      searchGallery(accountParams.access_token, searchedText, sort).then(rep => { setData(rep.data); setIsLoading(false) })
    } else {
      sortGallery(accountParams.access_token, section, sort).then(rep => { setData(rep.data); setIsLoading(false) })
    }
  }

  const setFavoriteById = (id, value) => {
    const _data = [...data]
    _data.find(e => e.id === id).favorite = value
    _data.find(e => e.id === id).favorite_count += value ? 1 : -1
    setData(_data)
  }

  const setVoteById = (id, value, previousValue) => {
    const _data = [...data]
    _data.find(e => e.id === id).vote = value
    if (value === "up" && previousValue === "up")
      _data.find(e => e.id === id).ups -= 1
    else if (value === "up" && previousValue === "veto")
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
    setData(_data)
  }

  return (
    <View>
      <Header searchBar iosBarStyle="light-content" style={{ backgroundColor: headerBackgroundColor }} androidStatusBarColor={androidHeaderColor}>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onChangeText={setSearchedText}
            onSubmitEditing={loadSearch}
          />
        </Item>
        {isLoading &&
          <Right style={{ position: 'absolute', right: 30 }} >
            <Spinner style={{ width: 10 }} color={spinnerColor} size="small" />
          </Right>
        }
      </Header>
      <View style={{ flexDirection: 'row' }}>
        <Picker
          note
          mode="dropdown"
          style={{ width: '50%', color: 'black' }}
          selectedValue={section}
          onValueChange={onSectionChange}
        >
          <Picker.Item label="Most viral" value="top" />
          <Picker.Item label="User submitted" value="user" />
        </Picker>
        <Picker
          note
          mode="dropdown"
          style={{ width: '50%', color: 'black' }}
          selectedValue={sort}
          onValueChange={onSortChange}
        >
          <Picker.Item label="Best" value="viral" />
          <Picker.Item label="Popular" value="top" />
          <Picker.Item label="Newest" value="time" />
        </Picker>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Gallery info={item} setFavoriteById={setFavoriteById} setVoteById={setVoteById} />}
      />
    </View>
  );
}

export default Search