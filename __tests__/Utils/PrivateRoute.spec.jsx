import {describe, expect, test} from 'vitest';
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {UserContext} from "../../src/Context/UserContext";
import PrivateRoute from "../../src/Utils/PrivateRoute";

const renderComponent = (loginStatus = true) => {
    render(
        <MemoryRouter>
            <UserContext.Provider value={{loginStatus: loginStatus}}>
                <PrivateRoute>
                    <h1>Test</h1>
                </PrivateRoute>
            </UserContext.Provider>
        </MemoryRouter>
    );
};

describe("PrivateRoute", () => {

    test("Show Component when user is logged in", () => {
        renderComponent();

        expect(screen.getByText("Test")).toBeDefined();
    });
});