import {describe, expect, test} from 'vitest';
import {render, screen} from "@testing-library/react";
import ErrorPage from "../../src/Components/ErrorPage";

const renderComponent = () => {
    render(
        <ErrorPage />
    );
}

describe("Errorpage", () => {

    test("Show error page", () => {
        renderComponent();

        expect(screen.getByText("An Error Occurred")).toBeDefined();
    });
});