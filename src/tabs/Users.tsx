import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
const Users = () => {
  const [id, setId] = useState<any>();
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const [mode, setMode] = useState<any>('LIGHT');
  const isFocused = useIsFocused();
  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    getMode();
  }, [isFocused]);
  const getMode = async () => {
    const mode = await AsyncStorage.getItem('MODE');
    setMode(mode);
  };
  const getUsers = async () => {
    const UserId = await AsyncStorage.getItem('USERID');
    setId(UserId);
    let tempData: any = [];
    const email = await AsyncStorage.getItem('EMAIL');
    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        if (res.docs?.length > 0) {
          res.docs.map(item => {
            tempData.push(item.data());
          });
        }
        setUsers(tempData);
      });
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: mode == 'LIGHT' ? 'white' : '#212121'},
      ]}>
      <View style={styles.header}>
        <Text style={styles.title}>My Chat App</Text>
      </View>
      <FlatList
        data={users}
        renderItem={({item, index}: any) => {
          return (
            <TouchableOpacity
              style={[styles.userItem, {backgroundColor: 'white'}]}
              onPress={() => {
                navigation.navigate('Chat', {data: item, id: id});
              }}>
              <Image
                source={{
                  uri: 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
                }}
                style={styles.userIcon}
              />
              <Text style={styles.name}>{item?.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Users;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'purple',
    fontSize: 20,
    fontWeight: '600',
  },
  userItem: {
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    height: 60,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 20,
    alignItems: 'center',
  },
  userIcon: {
    width: 40,
    height: 40,
  },
  name: {color: 'black', marginLeft: 20, fontSize: 20},
});
