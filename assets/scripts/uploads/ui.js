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
  $('.edit-btn').on('click', onEditUpload)
}

const onGetUploadsFailure = function (error) {
  console.error(error)
}

const onEditUpload = function () {
  const elementId = $(this).parent().parent().attr('data-id')
  const fileName = $(this).parent().siblings()[0]
  const tags = $(this).parent().siblings()[4]
  fileName.contentEditable = true
  tags.contentEditable = true
  $(fileName).css('background-color', 'rgba(255, 255, 0, 0.5)') // Show user editable fields
  $(tags).css('background-color', 'rgba(255, 255, 0, 0.5)')
  $(fileName).keydown(function (e) { // Prevent user from adding new lines in table
    if (e.which === 13) { // 13 --> enter key
      fileName.blur()
    }
  })
  $(tags).keydown(function (e) {
    if (e.which === 13) {
      tags.blur()
    }
  })
  $(this).next().hide() // Hide delete button
  $(this).parent().append('<button class="btn btn-info confirm-edit-btn">Confirm</button>')
  $(this).hide() // Hide edit button
  $('.confirm-edit-btn').on('click', function () {
    onConfirmEdit(elementId, fileName, tags)
  })
}

const onConfirmEdit = function (elementId, fileName, tags) {
  const newFileName = $(fileName).html()
  const newTags = $(tags).html()
  const data =
    {
      upload: {
        name: newFileName,
        tags: newTags
      }
    }
  api.editUpload(elementId, data)
    .then(onEditUploadSuccess)
    .catch(onEditUploadFailure)
}

const onEditUploadSuccess = function (data) {
  console.log(data)
  $('.uploads-table').html('')
  api.getUploads()
    .then(onGetUploadsSuccess)
    .catch(onGetUploadsFailure)
}

const onEditUploadFailure = function (error) {
  console.log(error)
}

module.exports = {
  success,
  error,
  onGetUploadsSuccess,
  onGetUploadsFailure
}
