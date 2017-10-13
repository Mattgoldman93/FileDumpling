'use strict'

const api = require('./api')

const showUploadsTemplate = require('../templates/uploads-table.handlebars')

const success = function (data) {
  resetTable()
}

const error = function (error) {
  console.log('error is:', error)
}

const onGetUploadsSuccess = function (data) {
  const showUploadsHtml = showUploadsTemplate({ uploads: data.uploads })
  $('.uploads-table').append(showUploadsHtml)
  $('.edit-btn').on('click', onEditUpload)
  $('.delete-btn').on('click', onDeleteUpload)
  $('#refresh').on('click', resetTable)
  $('.createdDate').each(function () {
    $(this).html($(this).html().split('T')[0])
  })
  $('.updatedDate').each(function () {
    $(this).html($(this).html().split('T')[0])
  })
  $('.hashtag').on('click', function () {
    const value = $(this).html().replace(/#/g, '')
    $('.uploads-table').html('')
    api.getUploads(value)
      .then(onGetUploadsSuccess)
      .catch(onGetUploadsFailure)
  })
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
  $(tags).html('')
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
  let newTags = $(tags).html().replace(/[^a-z0-9 ]/gi, '').split(' ')
  if (newTags[0] === '') {
    newTags = null
  }
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
  resetTable()
}

const onEditUploadFailure = function (error) {
  console.log(error)
}

const onDeleteUpload = function () {
  const elementId = $(this).parent().parent().attr('data-id')
  $(this).parent().append('<button class="btn btn-danger confirm-delete-btn">Confirm</button>')
  $(this).parent().append('<button class="btn btn-default cancel-delete-btn">Cancel</button>')
  const editBtn = $(this).siblings()[0]
  $(editBtn).remove()
  $(this).remove()
  $('.confirm-delete-btn').on('click', function () {
    api.deleteUpload(elementId)
      .then(onDeleteUploadSuccess)
      .catch(onDeleteUploadFailure)
  })
  $('.cancel-delete-btn').on('click', function () {
    $(this).siblings().each(function () {
      $(this).remove()
    })
    $(this).parent().append('<button class="btn btn-info edit-btn">Edit</button>')
    $(this).parent().append('<button class="btn btn-danger delete-btn">Delete</button>')
    $('.edit-btn').on('click', onEditUpload)
    $('.delete-btn').on('click', onDeleteUpload)
    $(this).remove()
  })
}

const onDeleteUploadSuccess = function (data) {
  console.log(data)
  resetTable()
}

const onDeleteUploadFailure = function (error) {
  console.error(error)
}

const resetTable = function () {
  $('.uploads-table').html('')
  api.getUploads()
    .then(onGetUploadsSuccess)
    .catch(onGetUploadsFailure)
}

module.exports = {
  success,
  error,
  onGetUploadsSuccess,
  onGetUploadsFailure
}
