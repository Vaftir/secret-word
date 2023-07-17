import "../styles/StartScreen.css";

const TelaInicial = ({ startGame }) => {
  return (
    <>
      <div className="Start">
        <h1>Secret Word</h1>
        <button className="navigate" onClick={startGame}>
          Iniciar
        </button>
      </div>
    </>
  );
};

export default TelaInicial;
