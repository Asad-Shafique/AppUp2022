import React, { useState, useCallback, useEffect } from 'react'
import { View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { SafeAreaView } from 'react-native-safe-area-context';
import AppImages from '../themes/AppImages';
import Session from '../utils/Session';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks'
import { incremented, addMsg } from '../redux/slices/chat/chatSlice'


const Chat = () => {

    const [messages, setMessages] = useState([]);

    let value = useAppSelector((State) => State.chat.value)
    const dispatch = useAppDispatch()

    console.log("value length " + value.length);


    const useRedux = (msg) => {
        console.log("Message to be added == >" + JSON.stringify(msg));
        dispatch(addMsg(msg))
    }

    useEffect(() => {
        if (value.length == 0) {
            setMessages([
                {
                    _id: 1,
                    text: 'Hello from developer Hamza Shafique, How can i help you ? This is a Tourism App developed by Team ILMA',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Hamza Shafique',
                        avatar: AppImages.dp,
                    },
                },
            ])
            useRedux(messages)
        }
        else {
            restoreMessage()
        }

    }, [])

    const restoreMessage = () => {


        console.log("===========================================");
        console.log("Restoring messages");

        console.log(value.length);
        console.log("===========================================");

        for (let x = value?.length - 1; x >= 0; x--) {

            let obj = value[x];
            //  console.log("obj ===>" + JSON.stringify(obj));
            let msg = obj[0];
            // console.log("Msg === >" + JSON.stringify(msg.text));

            setMessages(messages => [...messages,
            {
                _id: Math.random(),
                text: msg?.text,
                createdAt: new Date(),
                user: {
                    _id: msg?.user._id,

                },
            }
                ,
            ]);
        }
        //console.log("=================================================");
        // console.log("Message State ==== >" + JSON.stringify(messages));
        //  console.log("=================================================");
    }

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        useRedux(messages)
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: Session.userObj[0].userId,
            }}
        />
    )
}

export default Chat