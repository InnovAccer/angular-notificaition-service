// An example configuration file.
exports.config = {
  allScriptsTimeout: 99999,
  // Do not start a Selenium Standalone sever - only run this using chrome.
  directConnect: true,
  specs: ['./test/e2e/**/*.spec.js'],
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
