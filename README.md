Simple REPL (Read-eval-print Loop) for controlling mobile apps through [Appium](appium.io)

Interactively control your apps programmatically, test various JSON WireProtocol bindings.

To get started enter app name along with caps in .appium-repl

eg

```
"TestApp" :
  {
    "deviceName": "iPhone Simulator",
    "app": "<app name>",
    "version": "7.1",
    "newCommandTimeout": 100000,
    "autoLaunch" : "false",
    "platformName":"iOS",
    "device": "iPhone Simulator"
  }
```

Run your appium server and then run `appium-repl`

If you have more than one app in your config file, you will need to enter the name of application you want to test.

Then its a matter of accessing `driver` directly
eg.

```
>>elm = driver.elementByClassName("android.widget.Button");
 > CALL elementByClassName("android.widget.Button")
>> > RESPONSE elementByClassName("android.widget.Button") {"ELEMENT":"1"}
>>elm.click(console.log());
```

If you press tab it will show you all possible options that are available. If a driver command returns a array
then current would become an array.
