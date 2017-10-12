'use strict'

const api = require('./api')

const showUploadsTemplate = require('../templates/uploads-table.handlebars')

const success = function (data) {
  $('.uploads-table').html('')
  api.getUploads()
    .then(onGetUploadsSuccess)
    .catch(onGetUploadsFailure)
}

const error = function (error) {
  console.log('error is:', error)
}

const onGetUploadsSuccess = function (data) {
  const showUploadsHtml = showUploadsTemplate({ uploads: data.uploads })
  $('.uploads-table').append(showUploadsHtml)
}

const onGetUploadsFailure = function (error) {
  console.error(error)
}

module.exports = {
  success,
  error,
  onGetUploadsSuccess,
  onGetUploadsFailure
}
