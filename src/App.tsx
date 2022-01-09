import GlobalStyle from "./GlobalStyle";
import Layout from "./layout/Layout/Layout";
import Board from "./components/Board/Board";
import PlayerBadge from "./components/PlayerBadge/PlayerBadge";
import Nav from "./layout/Nav/Nav";

function App() {
  return (
    <>
      <GlobalStyle />
      <Nav />
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
