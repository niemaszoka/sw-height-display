import React from 'react'
import { render, screen } from '@testing-library/react'
import { Characters } from "./Characters";
import { SwCharactersMock } from "../../../api/data-mock";

describe('Characters', function () {

    test('renders elements for all passed characters', async () => {
        const charactersMock = SwCharactersMock;

        render(
            <Characters characters={charactersMock}/>
        );

        const characterNames = charactersMock.map((character) => character.name);
        const characterElements = characterNames.map((name) => screen.getByText(name));
        characterElements.forEach((elem) => expect(elem).toBeInTheDocument());
    });
});