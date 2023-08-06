import { useEffect } from "react";
import { useUserDetails } from "../Context/UserContext";

const Login = () => {
    const { keycloak } = useUserDetails();

    useEffect(() => {
        keycloak.login({
            redirectUri: "http://localhost:5173"
        });
    }, []);
    
    return (
        <>
        </>
    )
}
export default Login;