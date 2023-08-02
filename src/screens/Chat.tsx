import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const Chat = () => {
  const [messageList, setMessageList] = useState<any>([]);
  const route: any = useRoute();
  console.log({route});
  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(route?.params?.id + route?.params?.data?.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    subscriber.onSnapshot(querysnapshot => {
      const allMessages = querysnapshot.docs.map((item: any) => {
        return {...item?._data, createdAt: item?._data?.createdAt};
      });
      setMessageList(allMessages);
    });
    return () => subscriber();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const msg: any = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route?.params?.id,
      sendTo: route?.params?.data?.userId,
      createdAt: Date.parse(msg?.createdAt),
    };
    setMessageList((previousMessages: any) =>
      GiftedChat.append(previousMessages, myMsg),
    );
    firestore()
      .collection('chats')
      .doc('' + route?.params?.id + route?.params?.data?.userId)
      .collection('messages')
      .add(myMsg);
    firestore()
      .collection('chats')
      .doc('' + route?.params?.data?.userId + route?.params?.id)
      .collection('messages')
      .add(myMsg);
  }, []);

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messageList}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: route?.params?.id,
        }}
      />
    </View>
  );
};

export default Chat;
