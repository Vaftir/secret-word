/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import "../styles/Game.css";

const Game = ({
  verifyLetter,
  pickedCategory,
  letters,
  guessedLetters,
  wordLetters,
  guesses,
  score,
  end,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubbmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter("");

    letterInputRef.current.focus();
  };

  return (
    <>
      <div className="game">
        <p className="points">
          <span>Pontuação: {score}</span>
          <span className="dica">Tentativas: {guesses}</span>
        </p>

        <h1>Adivinhe a palavra:</h1>

        <p></p>
        <div className="wordContainer">
          {letters.map((letter, i) =>
            guessedLetters.includes(letter) ? (
              <span key={i} className="blankSquare">
                {letter}
              </span>
            ) : (
              <span key={i} className="blankSquare"></span>
            )
          )}
        </div>
        <h3 className="tip">
          Dica: <span>{pickedCategory}</span>
        </h3>
        <div className="letterContainer">
          <p>Tente adivinhar uma letra da palavra:</p>
          <form onSubmit={handleSubbmit}>
            <input
              type="text"
              name="lettter"
              maxLength="1"
              required
              onChange={(e) => setLetter(e.target.value)}
              value={letter}
              ref={letterInputRef}
            />
            <button>Jogar</button>
          </form>
        </div>
        <div className="wrongeLettersContainer">
          <p>
            Letras ja utilizadas:
            {wordLetters.map((letter, j) =>
              j == 0 ? (
                <span key={j}> {letter}</span>
              ) : (
                <span key={j}>, {letter}</span>
              )
            )}
          </p>
        </div>
        <button className="end" onClick={end}>
          Finalizar
        </button>
      </div>
    </>
  );
};

export default Game;
