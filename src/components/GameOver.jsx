import "../styles/GameOver.css";

const GameOver = ({ retry, score }) => {
  return (
    <>
      <div className="gameover">
        <h1>Fim de Jogo</h1>
        <h2>
          Sua pontuação foi: <span>{score}</span>
        </h2>
        <button className="navigate" onClick={retry}>
          Reiniciar Jogo
        </button>
      </div>
    </>
  );
};

export default GameOver;
