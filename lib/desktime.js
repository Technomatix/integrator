const config = require('./config')
const util = require('./util')

const format = require('dateformat')
const request = require('request-promise')
const baseUrl = `${config.desktime.protocol}://${config.desktime.host}`

const options = {
  method: 'GET',
  uri: baseUrl + '/api/v2/json/employee/projects',
  qs: {
    apiKey: config.desktime.APIkey,
    id: config.desktime.EmployeeId,
    date: `${format(new Date(), 'yyyy-mm-dd')}`
  },
  json: true
}

const projectTitlePropName = 'project_title'
const timePropName = 'duration'

function _parseTimeValue(value) {
  value = (value && (value = parseInt(value))) ? (value / 60) : null

  if (!value) {
    console.log('Warning: project time value is not valid!')
    return null
  }

  return parseInt(value) // float to int
}

function _parseProjectTitleValue(value) {
  if (!value || value.trim().length === 0) {
    console.log('Warning: project title value is empty!')
    return null
  }

  return value.trim()
}

function _validateValue(obj, propName) {
  if (!obj.hasOwnProperty(propName)) {
    console.log('Warning: Projects data property "' + propName + '" not isset!')
    return null
  }

  return obj[propName]
}

function _parseTime(data) {
  const result = []
  data = data || {}
  data.projects = data.projects || []

  data.projects.forEach(function(item) {
    const project = _parseProjectTitleValue(_validateValue(item, projectTitlePropName))
    const task = ''
    const time = _parseTimeValue(_validateValue(item, timePropName))
    const id = util.hash(project + task + time)
    project && time && result.push({
      project,
      task,
      time,
      id
    })
  })

  return result
}

function _desktimeRequest(fn) {
  request(options).then(function(response) {
    fn(response)
  }).catch(function(err) {
    console.log(err)
  })
}

/**
 * @param {callback} fn
 */
function fetchMyTime(fn) {
  _desktimeRequest(function(response) {
    fn(_parseTime(response))
  })
}

module.exports = {
  fetchMyTime
}
