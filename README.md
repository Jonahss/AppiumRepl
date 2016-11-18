Appium-REPL
======
Simple REPL (Read-eval-print Loop) for controlling mobile apps through [Appium](appium.io)

Why?
=======
wd, or Web Driver/Selenium 2 Client, already contains a REPL detailed [here](https://github.com/admc/wd#repl) 
however it requires some tedious boilerplate in order to get into useful REPL operations. This package aims to 
allow you to bypass that initial effort and get right into a meaningful REPL context.  

Getting Started
========
`npm install appium-repl -g` to install this module globally

Before Use
========
Create a `.appium-repl.json` where ever you intend to execute `appium-repl` from. This could be inside a project 
and then kept under your own version control for other developers to use.

Example `.appium-repl.json`
======== 
```
{
  "TestApp1" :
    {
      "deviceName": "iPhone Simulator",
      "app": "./path/from/execution/to/your/deployable.app",
      "platformVersion": "10.1",
      "newCommandTimeout": 100000,
      "autoLaunch" : "true",
      "platformName":"iOS",
      "device": "iPhone 6s"
    }
}
```

Putting it all together
=======
1. `npm install -g appium-repl`
2. create your configuration `.appium-repl.json`
3. run the `appium` server
  * find appium [here](https://github.com/appium/appium)
  * ensure that you have the appropriate XCode/Android SDKs installed
  * run it, _consult appium's documentation if any issues occur_
4. run `appium-repl` 
5. choose your configuration option (`.appium-repl.json` can have any number of defined configurations)
6. access `driver` directly from the REPL. refer to [wd docs](https://github.com/admc/wd/blob/master/doc/api.md) for relevant methods
7. profit?

Example REPL activity (with a Cordova App) 
=======
Comments and newlines added for readability
```
// See all contexts in the app under test
>>driver.contexts() 
 > CALL contexts()
 > RESPONSE contexts() ["NATIVE_APP","WEBVIEW_56394.1"]
[ 'NATIVE_APP', 'WEBVIEW_56394.1' ]

// Set the context
>>driver.context('WEBVIEW_56394.1');
 > CALL context("WEBVIEW_56394.1")
 > RESPONSE context("WEBVIEW_56394.1")
undefined

// Find an element
>>driver.elementById('dashboard-login-button')
 > CALL elementById("dashboard-login-button")
 > RESPONSE elementById("dashboard-login-button") {"ELEMENT":"5000"}
Element {
  value: '5000',
  browser:
   EventEmitter {
     domain: null,
     _events: { status: [Function], command: [Function] },
     _eventsCount: 2,
     _maxListeners: undefined,
     configUrl:
      Url {
        protocol: 'http:',
        slashes: true,
        auth: null,
        host: 'localhost:4723',
        port: '4723',
        hostname: 'localhost',
        hash: null,
        search: '',
        query: {},
        pathname: '/wd/hub',
        path: '/wd/hub',
        href: 'http://localhost:4723/wd/hub' },
     sauceTestPageRoot: 'https://saucelabs.com/jobs',
     sauceRestRoot: 'https://saucelabs.com/rest/v1',
     noAuthConfigUrl:
      Url {
        protocol: 'http:',
        slashes: true,
        host: 'localhost:4723',
        port: '4723',
        hostname: 'localhost',
        hash: null,
        search: null,
        query: null,
        pathname: '/wd/hub',
        path: '/wd/hub',
        href: 'http://localhost:4723/wd/hub' },
     defaultCapabilities:
      { browserName: 'firefox',
        version: '',
        javascriptEnabled: true,
        platform: 'ANY' },
     _httpConfig:
      { timeout: undefined,
        retries: 3,
        retryDelay: 15,
        baseUrl: undefined,
        proxy: undefined },
     sessionID: '5ea660da-0541-407c-91cc-f1fa32cf9421' } }
>>
```

If you press tab it will show you all possible options that are available. If a driver command returns a array
then current would become an array.
