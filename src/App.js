import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./Components/Chat";
import Login from "./Components/Login";
import Home from "./Components/Home";
import styled from "styled-components";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import db from "./firebase";
import { useEffect, useState } from "react";
import { auth, provider } from "./firebase";

function App() {
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const getChannels = () => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => {
          return { id: doc.id, name: doc.data().name };
        })
      );
    });
  };
  const signOut = () => {
    auth.signOut().then(() => {
      localStorage.removeItem("user");
      setUser(null);
    });
  };
  useEffect(() => {
    getChannels();
  }, []);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <Container>
            <Header signOut={signOut} user={user} />
            <Main>
              <Sidebar rooms={rooms} />
              <Routes>
                <Route
                  path="/room/:channelId"
                  element={<Chat user={user} />}
                ></Route>
                <Route path="/" element={<Home />}></Route>
              </Routes>
            </Main>
          </Container>
        )}
      </Router>
    </div>
  );
}

export default App;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px minmax(0, 1fr);
`;
const Main = styled.div`
  display: grid;
  grid-template-columns: 260px auto;
`;
