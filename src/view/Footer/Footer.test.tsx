import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Footer } from "./Footer";

describe('Footer', function () {

    test('renders children', async () => {
        const children = (<div data-testid='test-child'>children</div>);

        render(
            <Footer>{children}</Footer>
        );

        const renderedChildren = screen.getByTestId('test-child') as HTMLElement;

        expect(renderedChildren).toBeInTheDocument();
    });
});