import {describe, expect, test} from 'vitest';
import {render, screen} from "@testing-library/react";
import {UserContext} from "../../src/Context/UserContext";
import Profile from "../../src/Components/Profile";

const keycloak = {
    keycloak: {
        tokenParsed: {
            given_name: "Test",
            family_name: "1",
            preferred_username: "test",
            email: "test@test.com",
            realm_access: {roles: ['role1', 'role2']}
        }
    }, loginStatus: true
}

const renderComponent = () => {
    render(
        <UserContext.Provider value={keycloak}>
            <Profile />
        </UserContext.Provider>
    );
}

describe("Profile", () => {

    test("Show user details", () => {
        renderComponent();

        expect(screen.getByText(`Welcome ${keycloak.keycloak.tokenParsed.given_name}`)).toBeDefined();
        expect(screen.getByText(keycloak.keycloak.tokenParsed.given_name)).toBeDefined();
        expect(screen.getByText(keycloak.keycloak.tokenParsed.family_name)).toBeDefined();
        expect(screen.getByText(keycloak.keycloak.tokenParsed.preferred_username)).toBeDefined();
        expect(screen.getByText(keycloak.keycloak.tokenParsed.email)).toBeDefined();

        keycloak.keycloak.tokenParsed.realm_access.roles.forEach(value => {
            expect(screen.getByText(value)).toBeDefined();
        });
    });
});