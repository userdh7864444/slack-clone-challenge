import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import db from '../firebase';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



function Chat({ user }) {

    let { channelId } = useParams();
    const [channel, setChannel] = useState(channelId);
    const [messages, setMessages] = useState([]);


    const getMessage = () => {
        db.collection('rooms')
            .doc(channelId)
            .collection('Message')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => {
                let messages = snapshot.docs.map((doc) => doc.data());
                console.log(messages);
                setMessages(messages);
            })
    }

    const sendMessage = (text) => {
        if (channelId) {
            let payload = {
                text: text,
                timestamp: firebase.firestore.Timestamp.now(),
                user: user.name,
                userImage: user.photo
            }
            db.collection('rooms').doc(channelId).collection('Message').add(payload);

        }

    }

    const getChannel = () => {
        db.collection('rooms')
            .doc(channelId)
            .onSnapshot((snapshot) => {
                setChannel(snapshot.data());
            })
    }
    useEffect(() => {
        getChannel();
        getMessage();
    }, [channelId])

    return (
        <Container>
            <Header>
                <Channel>
                    <ChannelName>
                        #{channel.name}
                    </ChannelName>
                    <ChannelInfo>
                        Company-wide announcements and work-based matters
                    </ChannelInfo>

                </Channel>
                <ChannelDetails>
                    <div>
                        Details
                    </div>
                    <Info />

                </ChannelDetails>

            </Header>
            <MessageContainer>
                {
                    messages.length > 0 &&
                    messages.map((data, i) => (
                        <ChatMessage key={i}
                            text={data.text}
                            name={data.user}
                            image={data.userImage}
                            timestamp={data.timestamp}
                        />


                    ))
                }
            </MessageContainer>
            <ChatInput sendMessage={sendMessage} />
        </Container>


    )
}

export default Chat

const Container = styled.div`
display:grid;
grid-template-rows: 64px auto min-content;
min-height:0;
`
const Channel = styled.div``

const ChannelDetails = styled.div`
display:flex;
align-items:center;
color:#606060;s
`

const ChannelName = styled.div`
font-weight: 700;
`

const ChannelInfo = styled.div`
font-weight:400;
color:#606060;
font-size:13px;
margin-top:8px;
`

const Info = styled(InfoOutlinedIcon)`
margin-left:10px;
`

const Header = styled.div`
padding-left:20px;
padding-right:20px;
display:flex;
align-items:center;
border-bottom:1px solid rgba(83,39,83,.13);
justify-content:space-between;
`

const MessageContainer = styled.div`
flex-direction:colunm;
overflow-y:scroll;
`


