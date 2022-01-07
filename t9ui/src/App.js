import './App.css';
import { useState, useEffect } from 'react';
import { Keyboard } from './components/PhoneKeyboard';
import { WordsList } from './components/WordsList';
import Text from "@kiwicom/orbit-components/lib/Text";
import Box from "@kiwicom/orbit-components/lib/Box";
import Grid from "@kiwicom/orbit-components/lib/utils/Grid";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Button from "@kiwicom/orbit-components/lib/Button";
import Layout, { LayoutColumn } from "@kiwicom/orbit-components/lib/Layout";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import { ChevronLeft } from "@kiwicom/orbit-components/icons"
import axios from 'axios';
import { number } from 'prop-types';

// Numbers that can contain letters in the keyboard
const valueNumbers = ["2", "3", "4", "5", "6", "7", "8", "9"]

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

export function App() {
  const [numberSequence, setNumberSequence] = useState("");
  const [chosenWord, setChosenWord] = useState("");
  const [useDict, setUseDict] = useState(true);
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    calculateText()
  }, [numberSequence])


  const handleKeyboardClick = (number) => {
    if (valueNumbers.includes(number)) {
      setNumberSequence(prevNumberSequence => prevNumberSequence + number)
    }     
  }

  const handleWordClick = (word) => {
    setChosenWord(word);
  }

  const handleDeleteClick = () => {
    setNumberSequence(prevNumberSequence => prevNumberSequence.slice(0, prevNumberSequence.length - 1))
  }
  
  const calculateText = () => {
    if (numberSequence) {
      axios.post("http://localhost:3000/parseNumbers", {
          numbers: numberSequence,
          useDict: useDict
      })
      .then((res) => {
        const words = res.data.words
        if (words.length > 0) {
          setChosenWord(words[0]);
        } else {
          setChosenWord(prevWord => {
            const prevWordText = prevWord.replace(/\d+/, "")
            return prevWordText + numberSequence.slice(prevWordText.length, numberSequence.length)
          })
        }
        setWordList(words);
      })
    } else {
      setChosenWord("");
      setWordList([]);
    }

  }

  return (
    <Layout type="Booking">
      <LayoutColumn>
        <Stack
          direction="row"
          spacing="medium"
        >
          <InputField 
            readOnly={true}
            value={chosenWord}
          />
          <Button onClick={handleDeleteClick}><ChevronLeft /></Button>
        </Stack>
        <Box padding="XXXLarge">
          <Keyboard onKeyClick={handleKeyboardClick}/>    
        </Box>
      </LayoutColumn>
      <LayoutColumn>
        <WordsList words={wordList} onWordClick={handleWordClick}/>
      </LayoutColumn>
    </Layout>
  );
}
