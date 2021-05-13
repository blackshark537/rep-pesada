// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:1337',//'http://data-prod.ddns.net',
  firebaseConfig: {
    apiKey: "AIzaSyCro4PpFpSQlyf50LcsnLV5wkdWdIp3glY",
    authDomain: "avicola-1735c.firebaseapp.com",
    projectId: "avicola-1735c",
    storageBucket: "avicola-1735c.appspot.com",
    messagingSenderId: "359829305709",
    appId: "1:359829305709:web:3ac5f5611c56535a774264",
    measurementId: "G-ZL0EWFQ685"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
