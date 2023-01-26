import { useMsal } from "@azure/msal-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginRequest } from "../authConfig";
import { accessToken } from "../redux/actions";

export const ProfileContent = (props:any) => {
    const { instance, accounts } = useMsal();
    const [at, setAccessToken] = useState(null);
    const dispatch = useDispatch();
    
    function RequestAccessToken() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response:any) => {
            setAccessToken(response.accessToken);
            dispatch(accessToken(response.accessToken));
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response:any) => {
                setAccessToken(response.accessToken);
                dispatch(accessToken(response.accessToken));

            });
        });
    }

    return (
        <>
            {at ? 
                <p>Access Token Acquired!</p>
                :
                <button className="secondary" onClick={RequestAccessToken}>Request Access Token</button>
            }
        </>
    );
};
