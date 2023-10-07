import {describe, expect, test} from 'vitest';
import {render, screen} from "@testing-library/react";
import Appbar from "../../src/Components/Appbar";
import {MemoryRouter} from "react-router-dom";
import {UserContext} from "../../src/Context/UserContext";


function renderComponent() {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <UserContext.Provider value={{}}>
                <Appbar/>
            </UserContext.Provider>
        </MemoryRouter>
    );
}

describe("Appbar", () => {

    test("Shows 'Appbar' when user not logged in", () => {
        renderComponent();

        expect(screen.getByText("Parking Slot Bookings")).toBeDefined();
        expect(screen.getByText("Home")).toBeDefined();
        expect(screen.getByRole("button")).toBeDefined();
    });
});