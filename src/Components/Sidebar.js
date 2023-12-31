import React from 'react'
import styled from 'styled-components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { sidebarItemsData } from '../Data/SidebarData';
import AddIcon from '@mui/icons-material/Add';
import db from '../firebase';
import { useNavigate } from "react-router-dom";

function Sidebar(props) {

    const navigate = useNavigate();
    const goToChannel = (id) => {
        if (id) {
            console.log(id);
            navigate(`/room/${id}`)
        }
    }


    const addChannel = () => {
        const promptName = prompt("Enter channel name")
        if (promptName) {
            db.collection('rooms').add({
                name: promptName
            })
        }
    }

    return (
        <Container>
            <WorkspaceContainer>
                <Name>
                    CleverProgrammer
                </Name>
                <NewMessage>
                    <AddCircleOutlineIcon />
                </NewMessage>
            </WorkspaceContainer>
            <MainChannels>
                {
                    sidebarItemsData.map((item, i) => (
                        <MainChannelItem key={i}>
                            {item.icon}
                            {item.text}

                        </MainChannelItem>
                    ))
                }
            </MainChannels>
            <ChannelContainer>
                <NewChannelContainer>
                    <div>
                        Channel
                    </div>
                    <AddIcon onClick={addChannel} />
                </NewChannelContainer>
                <ChannelsList>
                    {
                        props.rooms.map(item => (
                            <Channel onClick={() => goToChannel(item.id)}>
                                # {item.name}
                            </Channel>
                        ))
                    }

                </ChannelsList>
            </ChannelContainer>
        </Container>
    )
}

export default Sidebar;

const Container = styled.div`
background:#3F0E40;
`
const WorkspaceContainer = styled.div`
color: white;
height:64px;
display:flex;
align-items:center;
padding-left:19px;
justify-content:space-between;
border-bottom:1px solid #532753;
`
const Name = styled.div`
`
const NewMessage = styled.div`
width:38px;
hight:38px;
background:white;
color:#3F0E40;
fill:#3F0E40;
display:flex;
justify-content:center;
align-items:center;
border-radius:50%;
margin-right:20px;
cursor:pointer;
`
const MainChannels = styled.div`
padding-top:20px;
`
const MainChannelItem = styled.div`
color:rgb(188,171,188);
display:grid;
grid-template-columns:15% auto;
height:28px;
align-items:center;
padding-left: 19px;
cursor: pointer;
:hover{
    background:#350D36
}
`
const ChannelContainer = styled.div`
color:rgb(188,171,188);
margin-top:10px;
`
const NewChannelContainer = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
height:28px;
padding-left:19px;
padding-right:12px;
`
const ChannelsList = styled.div``

const Channel = styled.div`
padding-left:19px;
height:28px;
display:flex;
align-items:center;
margin-left:19px;
cursor:pointer;
:hover{
    background:#350D36
}
`