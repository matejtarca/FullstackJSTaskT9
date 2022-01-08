import ListChoice from "@kiwicom/orbit-components/lib/ListChoice";
import Text from "@kiwicom/orbit-components/lib/Text";
import Box from "@kiwicom/orbit-components/lib/Box";

export function WordsList(props) {
    const choices = props.words.map(word => 
        <ListChoice 
            key={word}
            title={word} 
            onClick={() => props.onWordClick(word)}
            dataTest={`"wordChoice-${word}`}
        />
    )
    return (
        <Box padding="medium">
            <Text
                size="large"
                weight="bold"
            >
                List of possible words:
            </Text>
            { choices }
        </Box>
        
    )
}