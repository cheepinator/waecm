// var webdriver = require('selenium-webdriver'),
//   username = "jobrot94",
//   accessKey = "ab4eda0a-c39c-4107-b8d3-1a3ab459d16f",
//   driver;
//
// driver = new webdriver.Builder().
// withCapabilities({
//   'browserName': 'chrome',
//   'platform': 'Windows XP',
//   'version': '43.0',
//   'username': username,
//   'accessKey': accessKey
// }).
// usingServer("http://" + username + ":" + accessKey +
//   "@ondemand.saucelabs.com:80/wd/hub").
// build();
//
// //driver.get("http://saucelabs.com/test/guinea-pig");
// //driver.get("http://"+username + ":" +accessKey+"@localhost:3000/wd/hub")
// //https://github.com/itayw/selenium-ide-webdriver-node
// driver.get("127.0.0.1:3000");
// driver.get("localhost");
// driver.get("/");
//
//
// driver.getTitle().then(function (title) {
//   console.log("title is: " + title);
// });

var client = require('webdriverio').remote({
  user: "jobrot94",
  key: "ab4eda0a-c39c-4107-b8d3-1a3ab459d16f",
  host: 'localhost',
  port: 4445,
  desiredCapabilities: {
    browserName: 'chrome'
  }
});

client
  .init()
  .url('http://localhost')
  .getTitle().then(console.log)
  .end();



// saucelabs.updateJob(driver.sessionID, {
//   name: title,
//   passed: passed
// }, done);


driver.quit();
