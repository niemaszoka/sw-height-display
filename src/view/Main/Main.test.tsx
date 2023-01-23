import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { SwCharactersMock } from "../../api/data-mock";
import { SwApiBaseUrl } from "../../api";
import Main from './Main';

const setup = () => {
    const user = userEvent.setup();
    const utils = render(<Main />);
    const heightToggle = screen.getByLabelText('only-tall-filter');
    const nameInput = screen.getByLabelText('name-filter');
    const averageHeightOutput = screen.queryByLabelText('average-height-output');

    return {
        user,
        heightToggle,
        nameInput,
        averageHeightOutput,
        ...utils,
    }
}

describe('Main',  () => {


    let fetchMock = jest.fn();

    beforeEach(async () => {
        fetchMock = jest.fn(async () => {
            return Promise.resolve({
                json: () => Promise.resolve({ results: SwCharactersMock }),
                ok: true,
            })
        });
        (global.fetch as any) = fetchMock;
    });

    afterEach(async () => {
        fetchMock.mockRestore();
    })

    test('makes request to swapi to fetch characters only once', async () => {
      const { user, nameInput } = setup();

      // interact with an input to trigger state update
      await user.click(nameInput);
      await user.keyboard('name');

      expect(fetchMock).toBeCalledTimes(1);
      expect(fetchMock).toBeCalledWith(`${SwApiBaseUrl}people/`);

      await user.clear(nameInput);
    });

    test('filters by name', async () => {
        const { user, nameInput } = setup();
        await user.click(nameInput);
        await user.keyboard(SwCharactersMock[0].name);
        const userElements = screen.queryAllByTestId(`characterCard`, {exact: false});

        expect(userElements.length).toBe(1);

        await user.clear(nameInput);
    });

    test('filters by height', async () => {
        const { user, heightToggle } = setup();
        await user.click(heightToggle);
        const userElements = screen.queryAllByTestId(`characterCard`, {exact: false});

        expect(userElements.length).toBe(2);

        await user.click(heightToggle);
    });

    test('updates average height when filters change', async () => {
        const { user, heightToggle, nameInput, averageHeightOutput } = setup();

        await user.click(heightToggle);
        const heightOutputBefore = averageHeightOutput?.innerHTML;
        await user.click(heightToggle);
        const heightOutputAfterToggle = averageHeightOutput?.innerHTML;
        expect(heightOutputBefore).not.toBe(heightOutputAfterToggle);

        await user.click(nameInput);
        await user.keyboard(SwCharactersMock[0].name);
        const heightOutputAfterNameInput = averageHeightOutput?.innerHTML;
        expect(heightOutputBefore).not.toBe(heightOutputAfterNameInput);
    });
});
