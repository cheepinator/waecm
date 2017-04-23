System.config({
	defaultJSExtensions: true,
  paths: {
    // paths serve as alias
    'npm:': './'
  },
  // map tells the System loader where to look for things
  map: {
    // our app is within the app folder
    app: 'app',

    // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
    '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
    '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
    //'angular2-notifications': 'node_modules/angular2-notifications',


    // other libraries
    "socket.io-client": "npm:socket.io-client/dist/socket.io.js",
    "jwt-decode": "npm:jwt-decode/lib/index.js",
    'rxjs':                       'npm:rxjs'
  },
  // packages : {
  //   'angular2-notifications': { main: 'components.js', defaultExtension: 'js' }
  // }
});
