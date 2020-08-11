const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withSass({url: false,})
module.exports = withCSS({url: false,})