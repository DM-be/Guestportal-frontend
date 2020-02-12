// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BACKEND_URL_PORT: 'http://localhost:5000' , //'$BACKEND_URL_PORT',  
  WEBSOCKET_EID_URL_PORT: 'http://localhost:5001', //$WEBSOCKET_EID_URL_PORT'
  WEBSOCKET_GUEST_URL_PORT: 'http://localhost:5002', // '$WEBSOCKET_GUEST_URL_PORT'

  // + WEBSOCKET 1 -  2
  
};


/*


    production: true,
    GAME_SERVER_URL: "$GAME_SERVER_URL",
    GUI_SERVER_URL: "$GUI_SERVER_URL",
    AUTH_SERVER_URL: "$AUTH_SERVER_URL"

*/




// 'http://localhost:5000'

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
