import GlobalStyle from "./GlobalStyle";
import Layout from "./layout/Layout/Layout";
import Board from "./components/Board/Board";
import PlayerBadge from "./components/PlayerBadge/PlayerBadge";
import Nav from "./layout/Nav/Nav";
import Modal from "./components/Modal/Modal";

import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
  const { red, black } = useSelector(
    (state: RootState) => state.modal.playerNames
  );

  return (
    <>
      <GlobalStyle />
      {isModalOpen && <Modal />}
      <Nav />
      <Layout>
        <PlayerBadge player="red" color="rgba(228, 58, 58, 255)" name={red} />
        <Board />
        <PlayerBadge
          player="black"
          color="rgba(51, 51, 51, 255)"
          name={black}
        />
      </Layout>
    </>
  );
}

export default App;
