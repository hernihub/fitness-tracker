// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBRPC7WxCp83TBXFtsZf1b9c51Q95WL3h0',
    authDomain: 'ng-herni-fitness-tracker.firebaseapp.com',
    databaseURL: 'https://ng-herni-fitness-tracker.firebaseio.com',
    projectId: 'ng-herni-fitness-tracker',
    storageBucket: 'ng-herni-fitness-tracker.appspot.com',
    messagingSenderId: '883876856406'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
