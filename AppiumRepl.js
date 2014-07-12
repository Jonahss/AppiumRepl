var wd = require('wd')
var repl = require('repl')
var color = require('colors')
var telme = require('telme-promise')

var profiles = require('./caps.json')


var remote = {
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

driver = wd.remote(remote['sauce'])

driver.on('status', function(info) {
  console.log(info.cyan);
});
driver.on('command', function(meth, path, data) {
  console.log(' > ' + meth.yellow, path.grey, data || '');
});

curr = {foo: 1};
handler = function(e, el){
  if (e) { console.log('error', e) }
  curr = el
}

quit = function(){
  driver.quit(function(){
    process.exit(1)
  });
}

console.log(' Profiles '.green);
console.log('=========='.green)
Object.keys(profiles).forEach(function(key){
  console.log(key);
});



console.log('starting driver')
var caps = profiles['Locale'];
caps.newCommandTimeout = 0;
driver.init(caps, function(err){
  if (err) { console.log(err); return; }
  console.log('driver started');
  repl.start({prompt:'("o")', useGlobal: true})
});
