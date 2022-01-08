import { fireEvent, render, screen } from "@testing-library/react"
import { Keyboard } from "./PhoneKeyboard"
import '@testing-library/jest-dom'

test('Basic render', () => {
    render(<Keyboard />)
    expect(screen.getByRole('button', {name: "1"})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /2/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /abc/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /3/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /def/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /4/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /ghi/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /5/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /jkl/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /6/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /mno/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /7/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /pqrs/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /8/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /tuv/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /9/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /wxyz/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: "*"})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: "0"})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: "#"})).toBeInTheDocument()
})

test("Clicking on one button", () => {
    const onClickMock = jest.fn()
    render(<Keyboard onKeyClick={onClickMock}/>)
    fireEvent.click(screen.getByRole('button', {name: "1"}))
    expect(onClickMock).toHaveBeenCalledTimes(1)
    expect(onClickMock.mock.calls[0][0]).toBe("1")
})

test("Clicking on multiple buttons based on number", () => {
    const onClickMock = jest.fn()
    render(<Keyboard onKeyClick={onClickMock}/>)
    fireEvent.click(screen.getByRole('button', {name: /5/}))
    fireEvent.click(screen.getByRole('button', {name: /6/}))
    fireEvent.click(screen.getByRole('button', {name: /9/}))
    expect(onClickMock).toHaveBeenCalledTimes(3)
    expect(onClickMock.mock.calls[0][0]).toBe("5")
    expect(onClickMock.mock.calls[1][0]).toBe("6")
    expect(onClickMock.mock.calls[2][0]).toBe("9")
})

test("Clicking on multiple buttons based on text", () => {
    const onClickMock = jest.fn()
    render(<Keyboard onKeyClick={onClickMock}/>)
    fireEvent.click(screen.getByRole('button', {name: /pqrs/}))
    fireEvent.click(screen.getByRole('button', {name: /tuv/}))
    fireEvent.click(screen.getByRole('button', {name: /abc/}))
    expect(onClickMock).toHaveBeenCalledTimes(3)
    expect(onClickMock.mock.calls[0][0]).toBe("7")
    expect(onClickMock.mock.calls[1][0]).toBe("8")
    expect(onClickMock.mock.calls[2][0]).toBe("2")
})