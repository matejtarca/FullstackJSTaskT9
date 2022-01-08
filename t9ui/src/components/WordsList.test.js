import { fireEvent, render, screen } from "@testing-library/react"
import { WordsList } from "./WordsList"
import '@testing-library/jest-dom'

test('Basic render', () => {
    render(<WordsList words={["home", "gone"]} />)
    expect(screen.getByText("home")).toBeInTheDocument()
    expect(screen.getByText("gone")).toBeInTheDocument()
})

test("Clicking on word", () => {
    const onClickMock = jest.fn()
    render(<WordsList words={["the", "tie"]} onWordClick={onClickMock}/>)
    fireEvent.click(screen.getByText("tie"))
    fireEvent.click(screen.getByText("the"))
    expect(onClickMock).toHaveBeenCalledTimes(2)
    expect(onClickMock.mock.calls[0][0]).toBe("tie")
    expect(onClickMock.mock.calls[1][0]).toBe("the")
})