export const msalConfig = {
    auth: {
      clientId: "f259c9e0-509b-4846-bd82-1ac0737f4aee",
      authority: "https://login.microsoftonline.com/c3834ea6-fcb6-4045-9a29-d78a5fe4cef0",
      redirectUri: "https://localhost:3000/",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["api://f259c9e0-509b-4846-bd82-1ac0737f4aee/access_as_user"]
  };
  