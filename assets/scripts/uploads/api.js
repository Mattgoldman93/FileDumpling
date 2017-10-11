'use strict'

const store = require('../store')

const createEnc = function (data) {
  return $.ajax({
    // ajax options go here
  })
}
const createMulti = function (formData) {
  console.log('formData is ', formData)
  return $.ajax({
    headers: {
      authorization: 'Token token=' + store.user.token
    },
    url: 'http://localhost:4741/uploads',
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
