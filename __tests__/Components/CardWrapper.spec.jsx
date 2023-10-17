import {describe, expect, test} from 'vitest';
import {render, screen} from "@testing-library/react";
import CardWrapper from "../../src/Components/CardWrapper";
import {INR} from "../../src/Utils/Constants";
import {MemoryRouter} from "react-router-dom";
import {parkingSpace, vehicularSpace} from "../Utils/mockData";

const renderComponent = (data) => {
    render(<MemoryRouter>
        <CardWrapper images={[]} data={[data]}/>
    </MemoryRouter>);
}

describe("CardWrapper", () => {

    test("Show CardWrapper for Parking Space", () => {
        renderComponent(parkingSpace);

        expect(screen.getByText(`${parkingSpace.name} (${parkingSpace.area})`)).toBeDefined();
        expect(screen.getByText("Parking Spaces:")).toBeDefined();
        expect(screen.getByText("View Parking Space")).toBeDefined();
        expect(screen.getByText(`${parkingSpace.array[0].name}: ${INR}${parkingSpace.array[0].price}/hr`)).toBeDefined();
    });

    test("Show CardWrapper for Vehicular Space", () => {
        renderComponent(vehicularSpace);

        expect(screen.getByText(`${vehicularSpace.name} (${vehicularSpace.area})`)).toBeDefined();
        expect(screen.getByText("Parking Spaces:")).toBeDefined();
        expect(screen.getByText("View Parking Space")).toBeDefined();
        expect(screen.getByText(`${vehicularSpace.array[0].name}: ${INR}${vehicularSpace.array[0].price}/hr`)).toBeDefined();
    });
});