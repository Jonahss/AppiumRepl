let wd = require('wd');
let repl = require('repl');
require('colors');
let telme = require('telme-promise');


let getProfile = async function (profiles, preselected) {
  if (Object.keys(profiles).length === 0) {
    throw new Error('No ".appium-repl.json" file found. Consult the README for appium-repl')
  }

  if (preselected) {
    return profiles[preselected]
  }

  let indexedProfiles = Object.keys(profiles)
  console.log(' Profiles '.green)
  console.log('=========='.green)
  indexedProfiles.forEach((key, index) => {
    console.log(`${index} : ${key}`)
  })

  let decision = await telme("Enter the number of the profile you wish to start")
  console.log('\n\n\n\n')

  return profiles[indexedProfiles[decision]]
}

async function run (config) {
  let desiredCapabilities = await getProfile(config.profiles, config.preselected)

  if (!desiredCapabilities) {
    console.log("desired capabilities not found")
    return
  }

  desiredCapabilities.newCommandTimeout = 0

  console.log("Desired Capabilities: ", JSON.stringify(desiredCapabilities, null, 2));

  let driver = wd.promiseRemote(config.hostname, config.port, config.username, config.password);

  driver.on('status', function (info) {
    console.log(info.cyan);
  })

  driver.on('command', function (meth, path, data) {
    console.log(' > ' + meth.yellow, path.grey, data || '');
  })

  let quit = function () {
    driver.quit(function () {
      process.exit(1);
    });
  };

  let action = new wd.TouchAction(driver);

  await driver.init(desiredCapabilities)
  console.log('driver started')

  global.driver = driver
  global.quit = quit
  global.action = action
  repl.start({ prompt: '("o")', useGlobal: true })
}

module.exports = run

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error(error);
});
