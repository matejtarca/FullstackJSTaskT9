import './App.css';
import { useState, useEffect } from 'react';
import { Keyboard } from './components/PhoneKeyboard';
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
  const [fieldText, setFieldText] = useState("");
  const [useDict, setUseDict] = useState(true);

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
  
  const calculateText = () => {
    axios.post("http://localhost:3000/parseNumbers", {
        numbers: numberSequence,
        useDict: useDict
    })
    .then((res) => {
      const words = res.data.words
      if (words) {
        setFieldText(words[0]);
      }
    })
  }

  return (
    <Layout type="MMB">
      <LayoutColumn>
        <InputField 
          readOnly={true}
          value={fieldText}
        />
        <Box padding="large">
          <Keyboard onKeyClick={handleKeyboardClick}/>
        </Box>        
      </LayoutColumn>
    </Layout>
  );
}
