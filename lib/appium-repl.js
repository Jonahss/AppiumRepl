var wd = require('wd');
var repl = require('repl');
var color = require('colors');
var telme = require('telme-promise');
var prompt = require('prompt');
var _      = require('underscore');

var profiles = require('./caps.json');
var profile = null;

var sauce = {
  hostname: "localhost",
  port: 4723
};

driver = wd.remote(sauce);

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
var profileKeys=Object.keys(profiles);
console.log(' Profiles '.green);
console.log('=========='.green);
profileKeys.forEach(function(key){
  console.log(key);
});

var profile = function(){
  telme("Profile").then(function(str){
  return str;
});
};

telme("Enter the profile you wish to start.").then(function(str){
  return str;
}).then(function(str){
  var caps = profiles[str];
  caps.newCommandTimeout = 0;
  console.log("Caps + : " + caps);
  driver.init(caps, function(){
    console.log('driver started');
    repl.start({prompt:'("o")', useGlobal: true});
  });
});
