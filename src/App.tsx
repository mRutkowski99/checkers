import GlobalStyle from "./GlobalStyle";
import Layout from "./layout/Layout";
import Board from "./components/Board/Board";
import PlayerBadge from "./components/PlayerBadge/PlayerBadge";

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <PlayerBadge player="red" color="rgba(228, 58, 58, 255)" name="Ptyś" />
        <Board />
        <PlayerBadge
          player="black"
          color="rgba(51, 51, 51, 255)"
          name="Serdelek"
        />
      </Layout>
    </>
  );
}

export default App;
