import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";

export function PhoneButton(props) {
    return (
        <ButtonLink 
            onClick={props.onClick}
            dataTest={props.dataTest}
        >
            {props.number}
            <br />
            {props.letters}
        </ButtonLink>
    )
}