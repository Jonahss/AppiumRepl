var wd = require('wd');
driver = wd.remote("localhost",4723,'promiseChain')

var caps = {
  "device": "Android",
  "app": "/Users/jonahss/Workspace/appium/sample-code/apps/io.appium.gappium.sampleapp/platforms/android/ant-build/HelloGappium-debug.apk",
  "appPackage": "io.appium.gappium.sampleapp",
  "appActivity": ".HelloGappium"
}

driver = driver.init(caps);

var activateWebView = function (driver) {
  return driver.contexts().then(function (ctxs) {
    for (var idx in ctxs) {
      var ctx = ctxs[idx];
      if (ctx.indexOf('WEBVIEW') !== -1) {
        return ctx;
      }
    }
    return 'WEBVIEW_1';
  }).then(function (ctx) {
    return driver.context(ctx).catch(function () {});
  });
};

activateWebView(driver)
        .sleep(20000) // super slow startup
        .elementByCssSelector('.search-key')
          .sendKeys('j')
        .elementsByCssSelector('.topcoat-list a')
        .then(function (employees) {
          return employees[3].click();
        }).elementsByCssSelector('.actions a')
        .then(function (options) {
          options[3].click();
        }).sleep(2000)
        .quit()
