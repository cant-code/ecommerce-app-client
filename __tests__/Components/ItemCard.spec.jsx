import {describe, expect, test} from 'vitest';
import {render, screen} from "@testing-library/react";
import ItemCard from "../../src/Components/ItemCard";
import Car1 from "/src/static/images/cars/5643779.jpg";
import {MemoryRouter} from "react-router-dom";
import {INR} from "../../src/Utils/Constants";

const renderComponent = () => {
    render(
        <MemoryRouter>
            <ItemCard image={Car1} data={{
                name: "Test", area: "Test1", title: "Test Title", link: "Link", array: [{
                    id: 1, name: "Item Name", price: 200
                }]
            }}/>
        </MemoryRouter>
    );
}

describe("ItemCard", () => {

    test("Show ItemCard for Image and Data", () => {
        renderComponent();

        expect(screen.getByText("Test (Test1)")).toBeDefined();
        expect(screen.getByText("Test Titles:")).toBeDefined();
        expect(screen.getByText("View Test Title")).toBeDefined();
        expect(screen.getByText(`Item Name: ${INR}200/hr`)).toBeDefined();
    });
});