import ListChoice from "@kiwicom/orbit-components/lib/ListChoice";
import Text from "@kiwicom/orbit-components/lib/Text";

export function WordsList(props) {
    const choices = props.words.map(word => 
        <ListChoice 
            key={word}
            title={word} 
            onClick={() => props.onWordClick(word)}
        />
    )
    return (
        <div>
            <Text
                size="large"
                weight="bold"
            >
                List of possible words:
            </Text>
            { choices }
        </div>
        
    )
}