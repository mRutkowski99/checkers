import GlobalStyle from "./GlobalStyle";
import Layout from "./layout/Layout/Layout";
import Board from "./components/Board/Board";
import PlayerBadge from "./components/PlayerBadge/PlayerBadge";
import Nav from "./layout/Nav/Nav";
import Modal from "./components/Modal/Modal";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { useEffect } from "react";
import modalActions from "./store/modalSlice";
import useAI from "./hooks/useAI";

function App() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
  const { red, black } = useSelector(
    (state: RootState) => state.modal.playerNames
  );
  const result = useSelector((state: RootState) => state.game.result);
  const player = useSelector((state: RootState) => state.game.currentPlayer);

  useEffect(() => {
    if (!result) return;
    dispatch(modalActions.open("result"));
  }, [result]);

  useAI(player);

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
