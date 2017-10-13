'use strict'
const store = require('../store')
const uploadApi = require('../uploads/api')
const uploadUi = require('../uploads/ui')

const signUpSuccess = function (data) {
  $('#message').show()
  $('#message').text('Successfully signed up, go ahead and sign in!')
  $('#message').fadeOut(5000)
  $('input[type=text]').val('')
  $('input[type=password]').val('')
}

const signUpFailure = function (error) {
  console.error(error)
  $('#message').show()
  $('#message').text('Failure on signing up. E-mail and/or password already token. Try again.').fadeOut(5000)
}

const signInSuccess = function (data) {
  $('#message').show()
  $('#message').text('Successfully signed in!').fadeOut(5000)
  $('.initial-hide').show()
  $('.secondary-hide').hide()
  store.user = data.user
  $('#auth-modal').modal('hide')
  $('input[type=text]').val('')
  $('input[type=password]').val('')

  uploadApi.getUploads()
    .then(uploadUi.onGetUploadsSuccess)
    .catch(uploadUi.onGetUploadsFailure)
}

const signInFailure = function (error) {
  console.error(error)
  $('#message').show()
  $('#message').text('Failure on signing in. Try again.').fadeOut(5000)
}

const changePasswordSuccess = function (data) {
  $('#message').show()
  $('#message').text('Password changed!')
  $('#message').fadeOut(5000)
  $('input[type=password]').val('')
}

const changePasswordFailure = function (error) {
  console.error(error)
  $('#message').show()
  $('#message').text('Failure on changing password. Try again.').fadeOut(5000)
}

const signOutSuccess = function (data) {
  $('#message').show()
  $('#message').text('Signed out!')
  $('.initial-hide').hide()
  $('.secondary-hide').show()
  $('#message').fadeOut(5000)
  $('#auth-modal').modal('hide')
  store.user = null

  $('.uploads-table').html('')
}

const signOutFailure = function (error) {
  console.error(error)
  $('#message').show()
  $('#message').text('Failure on signing out. Try Again.')
  $('#message').fadeOut(5000)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
