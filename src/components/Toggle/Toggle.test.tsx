import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";

import { Toggle } from "./Toggle";

const setup = (onChange: (value: boolean) => void, initValue: boolean) => {
    const user = userEvent.setup();
    const inputName = 'checkbox-test'
    const utils = render(
        <Toggle onChange={onChange} name={inputName} isActive={initValue} />
    );
    const input = screen.getByLabelText(inputName) as HTMLInputElement;
    return {
        user,
        input,
        ...utils,
    }
}

describe('Toggle', function () {

    test('triggers onChange callback when toggled', async () => {
        const testValue = true;
        let changeCallback = jest.fn();
        const {user, input} = setup(changeCallback, false);

        await user.click(input);
        expect(changeCallback).toBeCalledWith(testValue);
        expect(input.checked).toBe(testValue);
    });
});
