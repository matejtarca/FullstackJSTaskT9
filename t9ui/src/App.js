import './App.css';
import { useState, useEffect } from 'react';
import { Keyboard } from './components/PhoneKeyboard';
import { WordsList } from './components/WordsList';
import Text from "@kiwicom/orbit-components/lib/Text";
import Box from "@kiwicom/orbit-components/lib/Box";
import Grid from "@kiwicom/orbit-components/lib/utils/Grid";
import Layout, { LayoutColumn } from "@kiwicom/orbit-components/lib/Layout";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import axios from 'axios';
import { number } from 'prop-types';

// Numbers that can contain letters in the keyboard
const valueNumbers = ["2", "3", "4", "5", "6", "7", "8", "9"]

export function App() {
  const [numberSequence, setNumberSequence] = useState("");
  const [chosenWord, setChosenWord] = useState("");
  const [useDict, setUseDict] = useState(true);
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    if (numberSequence) {
      calculateText()
    }
  }, [numberSequence])


  const handleKeyboardClick = (number) => {
    if (valueNumbers.includes(number)) {
      setNumberSequence(prevNumberSequence => prevNumberSequence + number)
    }     
  }

  const handleWordClick = (word) => {
    setChosenWord(word);
  }
  
  const calculateText = () => {
    axios.post("http://localhost:3000/parseNumbers", {
        numbers: numberSequence,
        useDict: useDict
    })
    .then((res) => {
      const words = res.data.words
      if (words) {
        setChosenWord(words[0]);
      } else {
        setChosenWord("");
      }
      setWordList(words);
    })
  }

  return (
    <Layout type="Booking">
      <LayoutColumn>
        <InputField 
          readOnly={true}
          value={chosenWord}
        />
        <Keyboard onKeyClick={handleKeyboardClick}/>    
      </LayoutColumn>
      <LayoutColumn>
        <WordsList words={wordList} onWordClick={handleWordClick}/>
      </LayoutColumn>
    </Layout>
  );
}
