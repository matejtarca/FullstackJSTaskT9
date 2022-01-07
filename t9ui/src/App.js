import './App.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { Keyboard } from './components/PhoneKeyboard';
import { WordsList } from './components/WordsList';
import Text from "@kiwicom/orbit-components/lib/Text";
import Box from "@kiwicom/orbit-components/lib/Box";
import Grid from "@kiwicom/orbit-components/lib/utils/Grid";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Button from "@kiwicom/orbit-components/lib/Button";
import Layout, { LayoutColumn } from "@kiwicom/orbit-components/lib/Layout";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import { ChevronLeft } from "@kiwicom/orbit-components/icons";
import Switch from "@kiwicom/orbit-components/lib/Switch";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Loading from "@kiwicom/orbit-components/lib/Loading";

// Numbers that can contain letters in the keyboard
const valueNumbers = ["2", "3", "4", "5", "6", "7", "8", "9"]

export function App() {
  const [numberSequence, setNumberSequence] = useState("");
  const [chosenWord, setChosenWord] = useState("");
  const [useDict, setUseDict] = useState(true);
  const [wordList, setWordList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    calculateText()
  }, [numberSequence, useDict])


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

  const handeUseDictChange = () => {
    setUseDict(prevUseDict => !prevUseDict);
    clearWords();
  }
  
  const calculateText = () => {
    if (numberSequence.length > 0) {
      setLoading(true);
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
        setLoading(false);
      })
    } else {
      clearWords()
    }
  }

  const clearWords = () => {
    setChosenWord("");
    setWordList([]);
    setNumberSequence("");
  }

  let wordListComponent;
  if (loading) {
    wordListComponent = <Loading />
  } else {
    wordListComponent = <WordsList words={wordList} onWordClick={handleWordClick}/>
  }

  return (
    <Box 
      padding="medium" 
      display="flex" 
      align="center" 
      direction="column" 
      height="100vh">
        <Box 
          elevation='raised'
          borderRadius="large"
          padding="small"
          display="flex" 
          align="center" 
          justify="center"
          direction="column"
          background="productLight">
          <Box padding="small"><Heading type="display">T9 keyboard</Heading></Box>
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
            <Stack align="center">
              <Switch
                ariaLabelledby="usedict"
                checked={useDict}
                onChange={handeUseDictChange}
              />
              <Text id="usedict">
                Use dictionary
              </Text>
            </Stack>
              { wordListComponent }
            </LayoutColumn>
          </Layout>
        </Box>
      </Box>
  );
}
