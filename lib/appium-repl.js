var wd = require('wd');
var repl = require('repl');
require('colors');
var telme = require('telme-promise');
var Q = require('q');
var promirepl = require('promirepl').promirepl;

module.exports = {
  run: function (config) {
    var driver = wd.promiseRemote(config.hostname, config.port, config.username, config.password);
    driver.on('status', function (info) {
      console.log(info.cyan);
    });
    driver.on('command', function (meth, path, data) {
      console.log(' > ' + meth.yellow, path.grey, data || '');
    });

    var quit = function () {
      driver.quit(function () {
        process.exit(1);
      });
    };

    var action = new wd.TouchAction(driver);

    var getProfile = function (profiles, preselected) {
      if (Object.keys(config.profiles).length === 0) {
        return Q(profiles[Object.keys(profiles)[0]]);
      }

      if (preselected) {
        return Q(profiles[preselected]);
      }

      var indexedProfiles = Object.keys(config.profiles).map(function (profileKey) {
        return profileKey;
      });
      console.log(' Profiles '.green);
      console.log('=========='.green);
      indexedProfiles.forEach(function (key, index) {
        console.log(index + ": " + key);
      });

      return telme("Enter the number of the profile you wish to start")
        .then(function (index) {
          return Q(config.profiles[indexedProfiles[index]]);
        });
    };

    var reset = function (context) {
      context.driver = driver;
      context.quit = quit;
      context.action = action;
    };

    var replProfile = function (caps) {
      if (!caps) {
        console.log("desired capabilities not found");
        return;
      }
      caps.newCommandTimeout = 1000;
      console.log("Caps + : ", caps);
      driver.init(caps).then(function () {
        console.log('driver started');
        var r = repl.start({ prompt: '>>', useGlobal: true });

        promirepl(r);
        delete r.commands['.promise'];

        reset(r.context);
        r.on('reset', reset);
        r.on('exit', quit);
      }).catch(console.error.bind(console));
    };


    getProfile(config.profiles).then(replProfile);
  }
};
