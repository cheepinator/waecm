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
  "@localhost:4445/wd/hub").
build();

// driver = new webdriver.Builder().
// withCapabilities({
//   'browserName': 'chrome',
//   'platform': 'Windows XP',
//   'version': '43.0',
//   'host': 'localhost', //ka
//   'port': 4445,  //ka ob das stimmt
//   'username': username,
//   'accessKey': accessKey
// }).
// usingServer("http://" + username + ":" + accessKey +
//   "@ondemand.saucelabs.com:80/wd/hub").
// build();

//driver.get("http://saucelabs.com/test/guinea-pig");
//driver.get("http://"+username + ":" +accessKey+"@localhost:3000/wd/hub")
//https://github.com/itayw/selenium-ide-webdriver-node
//driver.get("127.0.0.1:3000");
//driver.get("localhost");
//driver.get("/");


driver.getTitle().then(function (title) {
  console.log("title is: " + title);
});

// var client = require('webdriverio').remote({
//   user: "jobrot94",
//   key: "ab4eda0a-c39c-4107-b8d3-1a3ab459d16f",
//   host: 'localhost',
//   port: 4445,
//   desiredCapabilities: {
//     browserName: 'chrome'
//   }
// });
// console.log("starting simple test");
//
// client
//   .init()
//   .url('http://localhost:3333')
//   .getTitle().then(function(title) {
//   console.log('Title is: ' + title)})
//   .setValue("#md-input-1","max.mustermann")
//   .setValue("#md-input-3","password")
//   .click("#login")
//   .then(console.log("im here"))
//   .getTitle().then(console.log)
//   .end();
//
// console.log("simple test finished")



// saucelabs.updateJob(driver.sessionID, {
//   name: title,
//   passed: passed
// }, done);


driver.quit();
