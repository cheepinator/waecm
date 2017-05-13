var webdriver = require('selenium-webdriver'),
  username = "jobrot94",
  accessKey = "ab4eda0a-c39c-4107-b8d3-1a3ab459d16f",
  driver;

driver = new webdriver.Builder().
withCapabilities({
  'browserName': 'chrome',
  'platform': 'Windows XP',
  'version': '43.0',
  'username': username,
  'accessKey': accessKey
}).
usingServer("http://" + username + ":" + accessKey +
  "@ondemand.saucelabs.com:80/wd/hub").
build();

//driver.get("http://saucelabs.com/test/guinea-pig");
driver.get(username + ":" +accessKey+"@localhost:3000")

driver.getTitle().then(function (title) {
  console.log("title is: " + title);
  throw "This should break the build";
});

driver.quit();
