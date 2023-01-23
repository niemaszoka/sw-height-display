import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { CharacterCard } from "./CharacterCard";

describe('CharacterCard', function () {
    test('renders with height and name', async () => {
        const height = 123;
        const name = 'test name';

         render(
             <CharacterCard name={name} height={height} />
        );

        const heightElement = screen.getByText(height) as HTMLElement;
        const nameElement = screen.getByText(name) as HTMLElement;

        expect(heightElement).toBeInTheDocument();
        expect(nameElement).toBeInTheDocument();
    });
});

