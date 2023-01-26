import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import {ProfileContent} from "../components/ProfileContent";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props:any) => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            {props.children}
        </>
    );
};