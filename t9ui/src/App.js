import './App.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { Keyboard } from './components/PhoneKeyboard';
import { WordsList } from './components/WordsList';
import Text from "@kiwicom/orbit-components/lib/Text";
import Box from "@kiwicom/orbit-components/lib/Box";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Button from "@kiwicom/orbit-components/lib/Button";
import Layout, { LayoutColumn } from "@kiwicom/orbit-components/lib/Layout";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import { ChevronLeft } from "@kiwicom/orbit-components/icons";
import Switch from "@kiwicom/orbit-components/lib/Switch";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Loading from "@kiwicom/orbit-components/lib/Loading";
import Tooltip from "@kiwicom/orbit-components/lib/Tooltip";

// Numbers that can contain letters in the keyboard
const valueNumbers = ["2", "3", "4", "5", "6", "7", "8", "9"]

export function App() {
  const [numberSequence, setNumberSequence] = useState("");
  const [fieldText, setFieldText] = useState("");
  const [useDict, setUseDict] = useState(true);
  const [wordList, setWordList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    calculateText()
  }, [numberSequence, useDict])


  const handleKeyboardClick = (number) => {
    if (valueNumbers.includes(number)) {
      setHistory(prevHistory => 
        [...prevHistory,
          {
            numberSequence: numberSequence,
            fieldText: fieldText
          }])
      setNumberSequence(prevNumberSequence => prevNumberSequence + number)
      setFieldText("")
    }     
  }

  const handleWordClick = (word) => {
    setFieldText(word);
  }

  const handleDeleteClick = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1]
      setNumberSequence(lastState.numberSequence)
      setFieldText(lastState.fieldText)
      setHistory(prevHistory => prevHistory.slice(0, prevHistory.length - 1))
    } else {
      setNumberSequence("")
      setWordList([])
      setFieldText("")
    }
  }

  const handeUseDictChange = () => {
    setUseDict(prevUseDict => !prevUseDict);
    setFieldText("");
  }
  
  const calculateText = () => {
    if (numberSequence.length > 0) {
      setLoading(true);
      axios.post("https://t9api.matejtarca.sk/parseNumbers", {
          numbers: numberSequence,
          useDict: useDict
      })
      .then((res) => {
        const words = res.data.words
        if (!fieldText) {
          if (words.length > 0) {
            setFieldText(words[0]);
          } else {
            let prevFieldText = "";
            if (history.length > 0) {
              prevFieldText = history[history.length - 1].fieldText
            }
            setFieldText(prevFieldText + numberSequence.slice(prevFieldText.length, numberSequence.length))
          }
        }        
        setWordList(words);
        setLoading(false);
      })
    } else {
      setFieldText("");
      setWordList([]);
    }
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
                  value={fieldText}
                />
                <Button onClick={handleDeleteClick}><ChevronLeft /></Button>
              </Stack>
              <Box padding="large">
                <Keyboard onKeyClick={handleKeyboardClick}/>    
              </Box>
            </LayoutColumn>
            <LayoutColumn>
            <Stack align="center">
                <Stack direction='row' justify='start' align='center'>
                  <Switch
                    ariaLabelledby="usedict"
                    checked={useDict}
                    onChange={handeUseDictChange}
                  />
                <Tooltip content="Toggle on to use dictionary for predictions">
                  <Text id="usedict">
                    Use dictionary
                  </Text>
                  </Tooltip>
                </Stack>
            </Stack>
              { wordListComponent }
            </LayoutColumn>
          </Layout>
        </Box>
      </Box>
  );
}
