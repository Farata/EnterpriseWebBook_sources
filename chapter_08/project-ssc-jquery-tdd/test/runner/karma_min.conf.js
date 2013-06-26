basePath = '../..';

files = [
  JASMINE,
  JASMINE_ADAPTER,
    "app/js/*.js",
    "test/spec/*.js"
];

exclude = [
    "app/js/main.js",
    "test/spec/introduction.js"
];

browsers = ['Chrome', 'ChromeCanary', 'PhantomJS', 'Safari', 'Firefox', 'Opera']; // <5>

singleRun = true; //<5>