'use strict'
const store = require('../store')
const uploadApi = require('../uploads/api')
const uploadUi = require('../uploads/ui')

const resetFormFields = function () {
  $('#sign-in').trigger('reset')
  $('#change-password').trigger('reset')
  $('#sign-up').trigger('reset')
}
const signUpSuccess = function (data) {
  $('#message').show()
  $('#message').text('Successfully signed up, go ahead and sign in!')
  $('#message').fadeOut(1800)
  resetFormFields()
}

const signInSuccess = function (data) {
  $('#message').show()
  $('#message').text('Successfully signed in!')
  $('.initial-hide').show()
  $('.secondary-hide').hide()
  $('#message').fadeOut(1800)
  store.user = data.user
  $('#auth-modal').modal('hide')
  resetFormFields()

  uploadApi.getUploads()
    .then(uploadUi.onGetUploadsSuccess)
    .catch(uploadUi.onGetUploadsFailure)
}

const changePasswordSuccess = function (data) {
  $('#message').show()
  $('#message').text('Password changed!')
  $('#message').fadeOut(1800)
  resetFormFields()
}

const signOutSuccess = function (data) {
  $('#message').show()
  $('#message').text('Signed out!')
  $('.initial-hide').hide()
  $('.secondary-hide').show()
  $('#message').fadeOut(1800)
  $('#auth-modal').modal('hide')
  store.user = null
  $('.uploads-table').html('')
  resetFormFields()
}

const failure = function (error) {
  $('#message').show()
  $('#message').text('You messed up')
  $('#message').fadeOut(1800)
  resetFormFields()
}

module.exports = {
  signUpSuccess,
  signInSuccess,
  changePasswordSuccess,
  signOutSuccess,
  failure
}
