import { fireEvent, render, screen } from "@testing-library/react"
import { PhoneButton } from "./PhoneButton"
import '@testing-library/jest-dom'

test('Basic render', () => {
    render(<PhoneButton number="2" letters="abc" />)
    expect(screen.getByRole("button")).toHaveTextContent("2")
    expect(screen.getByRole("button")).toHaveTextContent("abc")
    expect(screen.getByRole("button")).toBeEnabled()
    expect(screen.getByRole("button")).toBeVisible()
    expect(screen.getByRole("button")).toContainHTML("<br>")
})

test('Click function', () => {
    const onClickMock = jest.fn()
    render(<PhoneButton number="2" letters="abc" onClick={onClickMock} />)
    
    fireEvent.click(screen.getByRole("button"))
    expect(onClickMock).toHaveBeenCalledTimes(1)
})
