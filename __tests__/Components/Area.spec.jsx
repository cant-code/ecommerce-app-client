import {beforeEach, describe, expect, test, vi} from 'vitest';
import {render, screen} from "@testing-library/react";
import {MemoryRouter, Routes} from "react-router-dom";
import Area from "../../src/Components/Area";
import {interceptRest} from "../Utils/mswHelper";
import {area, parkingSpace} from "../Utils/mockData";
import {Route} from "react-router";
import {INR} from "../../src/Utils/Constants";

const renderComponent = () => {
    render(
        <MemoryRouter initialEntries={['/area/1']}>
            <Routes>
                <Route path="/area/:id" element={<Area />} />
            </Routes>
        </MemoryRouter>
    );
};

const serverSetup = (data) => {
    interceptRest('GET', '/api/area/1', data);
}

describe("Area", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("Shows 'Area' for given id", async () => {
        serverSetup(area);
        renderComponent();

        expect(screen.getByText("Loading...")).toBeDefined();

        expect(await screen.findByText(`Area: ${area.name}`)).toBeDefined();
        expect(await screen.findByText(`${area.parkingSlots[0].name} (${area.parkingSlots[0].area})`)).toBeDefined();
        expect(await screen.findByText("Parking Spaces:")).toBeDefined();
        expect(await screen.findByText("View Parking Space")).toBeDefined();
        expect(await screen.findByText(`${parkingSpace.parkingSlots[0].name}: ${INR}${parkingSpace.parkingSlots[0].price}/hr`)).toBeDefined();
    });
});