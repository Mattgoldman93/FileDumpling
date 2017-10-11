'use strict'

const createEnc = function (data) {
  return $.ajax({
    // ajax options go here
  })
}

const createMulti = function (formData) {
  return $.ajax({
    url: 'http://locakhost:4741/uploads',
    method: 'POST',
    data: formData,
    processData: false,
    contentType: false
  })
}

module.exports = {
  createEnc,
  createMulti
}
