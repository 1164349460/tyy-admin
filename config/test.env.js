'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./dev.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"testing"',
  BASE_URL: '"http://hr.333job.com:18888/app/rfyy"'
})
