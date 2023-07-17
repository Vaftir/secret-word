//css
import "./App.css";

//react
import { useCallback, useEffect, useState } from "react";

//data
import { wordsList } from "./data/words";

//components
import TelaInicial from "./components/TelaInicial";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesNumber = 5;

function App() {
  window.onload = () => {
    setGameStage(stages[0].name);
    clearLetterStates();
    setScore(0);
    setGuesses(guessesNumber);
  };

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPicketCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesNumber);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    //pic random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //pick random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  const end = () => {
    setGuesses(0);
  };
  //START THE GAME
  const startGame = useCallback(() => {
    //clear all
    clearLetterStates();
    // pick word and catecory
    const { word, category } = pickWordAndCategory();

    let aux = word.toLowerCase();

    //craete an array of letters
    let wordLetters = aux.split("");

    //foçç states
    setPickedWord(word);
    setPicketCategory(category);

    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // PROCCES THE LETTER INPUT
  const verifyLetter = (letter) => {
    const normLetter = letter.toLowerCase();

    //check if letter has already been utilized

    if (
      guessedLetters.includes(normLetter) ||
      wrongLetters.includes(normLetter)
    ) {
      return;
    }
    // push guessed leter or remove a chance

    if (letters.includes(normLetter)) {
      setGuessedLetters((acutualGuessedLetters) => [
        ...acutualGuessedLetters,
        normLetter,
      ]);
    } else {
      setWrongLetters((acutualWrongLetters) => [
        ...acutualWrongLetters,
        normLetter,
      ]);

      setGuesses((acutualGuesses) => acutualGuesses - 1);
    }
  };
  //CHECK IF GUESSES ENDEND
  useEffect(() => {
    if (guesses <= 0) {
      //Reseta all states
      setGameStage(stages[2].name);
      clearLetterStates();
    }
  }, [guesses]);

  //WIN CONDITION

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    //win condition
    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => (actualScore += 100));

      startGame();
    }
  }, [guessedLetters, letters, startGame]);
  //restarts the game
  const retry = () => {
    setScore(0);
    setGuesses(guessesNumber);
    setGameStage(stages[0].name);
  };
  return (
    <>
      <div className="App">
        {gameStage === "start" && <TelaInicial startGame={startGame} />}
        {gameStage == "game" && (
          <Game
            verifyLetter={verifyLetter}
            pickedWord={pickedWord}
            pickedCategory={pickedCategory}
            letters={letters}
            guessedLetters={guessedLetters}
            wordLetters={wrongLetters}
            guesses={guesses}
            score={score}
            end={end}
          />
        )}
        {gameStage == "end" && <GameOver retry={retry} score={score} />}
      </div>
    </>
  );
}

export default App;
