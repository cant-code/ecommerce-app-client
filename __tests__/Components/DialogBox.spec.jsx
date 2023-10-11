import {describe, expect, test, vitest} from 'vitest';
import {render, screen} from "@testing-library/react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import DialogBox from "../../src/Components/DialogBox";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {SetItem} from "../../src/Utils/UtilFunctions";
import {DATE_PAST, END_TIME, START_TIME} from "../../src/Utils/Constants";
import {addDays, subDays} from "date-fns";
import {userEvent} from "@testing-library/user-event";

const renderComponent = () => {
    render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DialogBox open={true} cost={20} onClose={() => {}} />
        </LocalizationProvider>
    );
}

const setLocalStorage = (date = new Date()) => {
    SetItem(START_TIME, new Date());
    SetItem(END_TIME, addDays(date, 1));
}

describe("DialogBox", () => {

    test("Show DialogBox", () => {
        setLocalStorage();
        renderComponent();

        expect(screen.getByText("Place Order")).toBeDefined();
        expect(screen.getByText("Select the Start Time and End Time:")).toBeDefined();
        expect(screen.getByText("Cancel")).toBeDefined();
        expect(screen.getByText("Ok")).toBeDefined();
        expect(screen.getByText(/Total Cost: ₹\d+/i)).toBeDefined();
    });

    test("Show errors when validation fails", async () => {
        setLocalStorage(subDays(new Date(), 1));
        renderComponent();
        vitest.useFakeTimers();
        vitest.runAllTimers();

        expect(screen.getByText("Ok")).toBeDefined();

        setTimeout(() => {
            userEvent.click(screen.getByRole("button", {name: "Ok"}));
            expect(screen.getByText(DATE_PAST)).toBeDefined();
        }, 60);
    });
});