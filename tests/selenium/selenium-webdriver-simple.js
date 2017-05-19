//const {By} = require('selenium-webdriver/lib/by')
//const {until} = require('selenium-webdriver/lib/until')
var webdriver = require('selenium-webdriver'),
  username = "jobrot94",
  accessKey = "ab4eda0a-c39c-4107-b8d3-1a3ab459d16f",
  driver;

var until = webdriver.until;
var By = webdriver.By;
var correctTests = 0;
// var remote = require('selenium-webdriver/remote')
//
// new remote

driver = new webdriver.Builder().
withCapabilities({
  'browserName': 'chrome',
  'platform': 'Linux',
  'version': '48.0',
  //'username': username,
  //'accessKey': accessKey
}).
//usingServer("http://"+username+":"+accessKey+"@ondemand.saucelabs.com/wd/hub").
usingServer("http://"+username+":"+accessKey+"@localhost:4445/wd/hub"). //DAS IST FÜR SAUCECONNECT TODO
// .withCapabilities({
//   'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,})
build();


//driver.get("http://saucelabs.com/test/guinea-pig");
//driver.get("http://"+username + ":" +accessKey+"@localhost:3000/wd/hub")
//https://github.com/itayw/selenium-ide-webdriver-node
//driver.get("127.0.0.1:3000");

//https://ec2-54-201-136-143.us-west-2.compute.amazonaws.com:7777/



// Login test
try {
  driver.get("https://ec2-54-201-136-143.us-west-2.compute.amazonaws.com:7777");
  driver.wait(until.elementLocated(By.id('username')), 10000, 'Could not locate username (username)')
    .then(_ => driver.findElement(By.id('username')).sendKeys('max.mustermann'))
    .then(_ => driver.findElement(By.id('password')).sendKeys('password'))
    .then(_ => driver.findElement(By.className('pull-right mat-raised-button')).click());

  driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Hello Max!')]")), 10000, 'Could not locate Hello Max')
    .then(_ => {console.log("Login Test passed"); correctTests = correctTests +1;});
  driver.findElement(By.xpath("//*[contains(text(),'Logout')]/..")).click();
}
catch(err){
  console.log("Login Test failed with: "+err);
}

//Login Test wrong credentials
try {
  driver.get("https://ec2-54-201-136-143.us-west-2.compute.amazonaws.com:7777");
  driver.wait(until.elementLocated(By.id('username')), 10000, 'Could not locate username (username)')
    .then(_ => driver.findElement(By.id('username')).sendKeys('max.mustermann'))
    .then(_ => driver.findElement(By.id('password')).sendKeys('passwordfalsch'))
    .then(_ => driver.findElement(By.className('pull-right mat-raised-button')).click());

  driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Username or Password do not match!')]")), 10000, 'Could not locate the error window')
  .then(_=>{console.log("Login Test with wrong Credentials passed."); correctTests = correctTests +1;});
}
catch(err){
  console.log("Login Test with wrong Credentials failed with: "+err)
}


//Transaction test
try {
  driver.get("https://ec2-54-201-136-143.us-west-2.compute.amazonaws.com:7777");
  driver.wait(until.elementLocated(By.id('username')), 10000, 'Could not locate username (username)')
    .then(_ => driver.findElement(By.id('username')).sendKeys('max.mustermann'))
    .then(_ => driver.findElement(By.id('password')).sendKeys('password'))
    .then(_ => driver.findElement(By.className('pull-right mat-raised-button')).click());
  // --------
  driver.wait(until.elementLocated(By.id('newTransaction')), 15000, 'Could not locate newTransaction Button')
    .then(_ => driver.findElement(By.id('newTransaction')).click());

  driver.wait(until.elementLocated(By.id('iban')), 10000, 'Could not locate iban field')
    .then(_ => driver.findElement(By.id('iban')).sendKeys('AT55 2189 1241 0275'))
    .then(_ => driver.findElement(By.id('amount')).sendKeys('100'))
    .then(_ => driver.findElement(By.id('sendTan')).click())


  driver.wait(until.elementLocated(By.id('tan')), 10000, 'Could not locate tan field')
    .then(_ => driver.findElement(By.id('tan')).sendKeys('1337'))
    .then(_ => driver.findElement(By.id('tanSubmit')).click());

  driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Transaction successfully sent!')]")), 10000, 'Could not locate success field')
    .then(_ => {console.log("Transaction test passed."); correctTests = correctTests +1;})

  //logout
  driver.findElement(By.xpath("//*[contains(text(),'Logout')]/..")).click();
}
catch(err){
  console.log("Transaction Test failed with: "+err)
}

//Transaction test with wrong credentials
try {
  driver.get("https://ec2-54-201-136-143.us-west-2.compute.amazonaws.com:7777");
  driver.wait(until.elementLocated(By.id('username')), 10000, 'Could not locate username (username)')
    .then(_ => driver.findElement(By.id('username')).sendKeys('max.mustermann'))
    .then(_ => driver.findElement(By.id('password')).sendKeys('password'))
    .then(_ => driver.findElement(By.className('pull-right mat-raised-button')).click());
  // --------
  driver.wait(until.elementLocated(By.id('newTransaction')), 10000, 'Could not locate newTransaction Button')
    .then(_ => driver.findElement(By.id('newTransaction')).click());

  driver.wait(until.elementLocated(By.id('iban')), 10000, 'Could not locate iban field')
    .then(_ => driver.findElement(By.id('iban')).sendKeys('AT55 2189 1241 0275'))
    .then(_ => driver.findElement(By.id('amount')).sendKeys('100'))
    .then(_ => driver.findElement(By.id('sendTan')).click())


  driver.wait(until.elementLocated(By.id('tan')), 10000, 'Could not locate tan field')
    .then(_ => driver.findElement(By.id('tan')).sendKeys('wrongtan'))
    .then(_ => driver.findElement(By.id('tanSubmit')).click());

  driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Wrong TAN!')]")), 10000, 'Could not locate Error field')
    .then(_=> {console.log("Transaction Test with wrong Tan passed."); correctTests = correctTests +1;})
}
catch(err){
  console.log("Transaction Test with wrong Tan failed with: "+err)
}

driver.quit();
