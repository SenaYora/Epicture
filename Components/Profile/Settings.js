import React, { Fragment, useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, ScrollView } from 'react-native'
import { Icon, Button, Input } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { changeAccountSetting, getAvatarList } from '../../API/API'

/**
 * @description A Page to edit personnal informations and settings of the user
 * @param {Object} data An object containing informations about the user currently logs in
 * @param {Function} setData Function which set data in a higher level component
 */
function Settings({ data, setData, token }) {
  const [avatarList, setAvatarList] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [focusedAvatar, setFocusedAvatar] = useState(0)
  const [changedData, setChangedData] = useState(data)
  const navigation = useNavigation()

  useEffect(() => {
    (async () => {
      const rep = await getAvatarList(token, data.url)
      setAvatarList(rep.data.available_avatars)
      setFocusedAvatar(rep.data.available_avatars.findIndex(e => e.name === data.avatar_name))
    })()
  }, [])

  const updateAvatar = (i, e) => {
    setFocusedAvatar(i)
    setChangedData(prev => ({ ...prev, avatar: e.location, avatar_name: e.name }))
  }

  const updateSettings = () => {
    changeAccountSetting(token, changedData.url, changedData.bio, changedData.avatar_name)
    setData(changedData)
    navigation.navigate('Profile')
  }

  return (
    <Fragment>
      <Modal transparent visible={isOpen} animationType={"slide"}>
        <View style={{ flex: 1, backgroundColor: '#eee' }}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <TouchableOpacity onPress={() => setIsOpen(false)} >
              <Icon active name="ios-close" style={{ fontSize: 80, marginLeft: 20 }} />
            </TouchableOpacity>
            <Text style={{ alignSelf: "center", marginRight: 40, fontSize: 18, fontWeight: "700", color: "black" }}>CHOOSE A PICTURE</Text>
            <Text style={{ alignSelf: "center" }} />
          </View>
          <ScrollView style={{ flex: 1, backgroundColor: '#eee', }}>
            <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap', justifyContent: 'center' }} >
              {avatarList && avatarList.map((e, i) => (
                <TouchableOpacity onPress={() => updateAvatar(i, e)} key={i}>
                  <Image style={i === focusedAvatar ? styles.avatarFocus : styles.avatar} source={{ uri: e.location }} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
      <ScrollView style={{ flex: 1 }}>
        <Button transparent onPress={navigation.openDrawer} style={styles.drawerButton}>
          <Icon name='menu' style={{ fontSize: 33, color: 'black' }} />
        </Button>
        <Text style={{ alignSelf: "center", fontSize: 20, marginTop: 20, fontWeight: "700" }}>EDIT PROFILE</Text>
        <TouchableOpacity onPress={() => setIsOpen(true)} style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image source={{ uri: changedData.avatar + `&nocache=${changedData.avatar_name}` }} style={{ height: 100, width: 100, borderRadius: 1000, marginTop: 50 }} />
        </TouchableOpacity>
        <Text style={{ marginTop: 70, marginLeft: 25, color: 'grey' }}>Username</Text>
        <View style={{ flexDirection: "row", marginTop: 5, borderBottomWidth: 1, borderBottomColor: 'grey', marginLeft: 30, marginRight: 30 }}>
          <Input
            placeholder="Username"
            placeholderTextColor="grey"
            style={{ color: 'black', fontSize: 20 }}
            onChangeText={(value) => setChangedData(prev => ({ ...prev, url: value }))}
            value={changedData.url}
          />
        </View>
        <Text style={{ marginTop: 40, marginLeft: 25, color: 'grey' }}>Bio</Text>
        <View style={{ flexDirection: "row", marginTop: 5, borderBottomWidth: 1, borderBottomColor: 'grey', marginLeft: 30, marginRight: 30 }}>
          <Input
            placeholder="Write your bio here"
            placeholderTextColor="grey"
            style={{ color: 'black', fontSize: 20 }}
            multiline={true}
            onChangeText={(value) => setChangedData(prev => ({ ...prev, bio: value }))}
            value={changedData.bio}
          />
        </View>
        <TouchableOpacity onPress={updateSettings} style={{ alignSelf: 'center', marginTop: 40, backgroundColor: '#1b7ce2', borderRadius: 10, padding: 8, paddingLeft: 15, paddingRight: 15 }}>
          <Text style={{ fontSize: 20, alignSelf: "center", fontWeight: "700", color: 'white' }}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  drawerButton: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  avatarFocus: {
    borderColor: 'black',
    borderWidth: 4,
    height: 80,
    width: 80,
    borderRadius: 100,
    margin: 10,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 100,
    margin: 10,
  }
})

export default Settings