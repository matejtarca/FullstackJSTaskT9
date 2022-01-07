import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";

export function PhoneButton(props) {
    return (
        <ButtonLink onClick={props.onClick}>{props.number}<br />{props.letters}</ButtonLink>
    )
}