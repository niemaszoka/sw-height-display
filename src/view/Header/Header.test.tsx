import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Header } from "./Header";


describe('Header', function () {

    test('renders children', async () => {
        const children = (<div data-testid='test-child'>children</div>);

        render(
            <Header>{children}</Header>
        );

        const renderedChildren = screen.getByTestId('test-child') as HTMLElement;

        expect(renderedChildren).toBeInTheDocument();
    });
});