import Grid from "@kiwicom/orbit-components/lib/utils/Grid";
import { PhoneButton } from "./PhoneButton";

const keyboardButtons = [
    { number: "1", letters: "" },
    { number: "2", letters: "abc" },
    { number: "3", letters: "def" },
    { number: "4", letters: "ghi" },
    { number: "5", letters: "jkl" },
    { number: "6", letters: "mno" },
    { number: "7", letters: "pqrs" },
    { number: "8", letters: "tuv" },
    { number: "9", letters: "wxyz" },
    { number: "*", letters: "" },
    { number: "0", letters: "" },
    { number: "#", letters: "" },
]

export function Keyboard(props) {
    const buttons = keyboardButtons.map(button =>
        <PhoneButton 
            key={`button_${button.number}`}
            number={button.number} 
            letters={button.letters}
            onClick={() => props.onKeyClick(button.number)}
        />
    )
    return (
        <Grid
            columns = "repeat(3, 1fr)"
            rows = "repeate(4, 1fr)"
        >
            { buttons }
        </Grid>
    )
}