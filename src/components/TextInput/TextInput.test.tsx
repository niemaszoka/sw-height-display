import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";

import { TextInput } from "./TextInput";

const setup = (onChange: (value: string) => void) => {
    const user = userEvent.setup();
    const inputName = 'text-input-label';
    const utils = render(
        <TextInput onChange={onChange} name={inputName} />
    );
    const input = screen.getByLabelText(inputName) as HTMLInputElement;

    return {
        user,
        input,
        ...utils,
    }
}

describe('TextInput', function () {

    test('handles typed in value with no transformations', async () => {
        const testValue = 'Test text';
        let changeCallback = jest.fn();
        const {user, input} = setup(changeCallback);

        await user.click(input);
        await user.keyboard(testValue);
        expect(changeCallback).toBeCalledWith(testValue);
        expect(input.value).toBe(testValue);
    });
});