var wd     = require('wd');
var repl   = require('repl');
var color  = require('colors');
var telme  = require('telme-promise');
var _      = require('underscore');
var Q      = require('q');

var remotes = {
  local: {
    hostname: "localhost",
    port: 4723
  },
  sauce: {
    hostname: "ondemand.saucelabs.com",
    port: 80,
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY
  }
}

driver = wd.remote(remotes['local']);

driver.on('status', function(info) {
  console.log(info.cyan);
});
driver.on('command', function(meth, path, data) {
  console.log(' > ' + meth.yellow, path.grey, data || '');
});

current = {};

handler = function(error, el){
  if (error) {
    console.log('error', error);
  }
  else if(typeof el === 'object'){
    console.log("Returned in current");
    current = el;
  }
  else {
    console.log("Returned following string",el);
  }

};

quit = function(){
  driver.quit(function(){
    process.exit(1);
  });
};

action = new wd.TouchAction(driver);

var getProfile = function () {
  var profileName = process.argv[2];
  var profiles = require('../caps.json');

  if (profileName) {
    return Q(profiles[profileName]);
  } else {
    var printProfiles = function(profiles) {
      var indexedProfiles = [];
      profiles = Object.keys(profiles).forEach(function(key) {
        indexedProfiles.push(key);
      });

      console.log(' Profiles '.green);
      console.log('=========='.green);
      indexedProfiles.forEach(function(key, index){
        console.log(index + ": " + key);
      });
      return indexedProfiles;
    }

    var indexedProfiles = printProfiles(profiles);

    return telme("Enter the number of the profile you wish to start")
      .then(function(index){
        return Q(profiles[indexedProfiles[index]]);
      });
  }
};


getProfile().then(function(caps){
  if (caps) {
    caps.newCommandTimeout = 1000;
    console.log("Caps + : " + caps);
    driver.init(caps, function(){
      console.log('driver started');
      repl.start({prompt:'("o")', useGlobal: true});
    });
  }
  else {
    console.log("desired capabilities not found");
  }
});
