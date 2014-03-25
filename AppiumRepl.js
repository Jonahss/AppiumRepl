var wd = require('wd')
var repl = require('repl')

var caps = {
    device: 'iPhone Simulator',
    browserName: '',
    version: '6.1',
    app: '/Users/jonahss/Workspace/appium/assets/UICatalog6.1.app.zip',
    newCommandTimeout: 10000
}

var sauce = {
  hostname: "localhost",
  port: 4723
}

browser = wd.remote(sauce)

browser.on('status', function(info) {
  console.log(info.cyan);
});
browser.on('command', function(meth, path, data) {
  console.log(' > ' + meth.yellow, path.grey, data || '');
});

curr = {foo: 1};
handler = function(e, el){
  if (e) { console.log('error', e) }
  curr = el
}

browser.init(caps, function(){
  browser.elementByTagName('tableView', function(e, el){
    console.log('el', el)
    curr = el
  })
})


quit = function(){
  browser.quit(function(){
    process.exit(1)
  });
}

repl.start({prompt:'("o")', useGlobal: true})
