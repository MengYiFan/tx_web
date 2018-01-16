import axios from '../config/axios';

// 获得用户id 即初始化
export const getUserId = () => {
  return axios({
    method: 'post',
    url: '/api/user/create',
    data: {}
  })
}

// 创建用户下的就诊人
export const createPatientsInfo = (userId, data) => {
  return axios({
    method: 'post',
    url: '/api/user/' + userId + '/create/patients/info',
    data
  })
}

// 获得当前就诊人信息
export const getPatientsCurrent = (userId) => {
  return axios({
    method: 'get',
    url: '/api/user/' + userId + '/patients/current'
  })
}

// 获得当前就诊人信息
export const getPatientInfo = (openid) => {
  return axios({
    method: 'get',
    url: '/api/patient/' + openid + '/info'
  })
}

// 更新紧急联系人
export const alterEmergencyContactName = (openid, data) => {
  return axios({
    method: 'post',
    url: '/api/patient/' + openid + '/emergency/contact/name',
    data
  })
}

// 更新紧急联系人关系
export const alterEmergencyContactRelation = (openid, data) => {
  console.log(openid, data, '/api/patient/' + openid + '/emergency/contact/relation')
  return axios({
    method: 'post',
    url: '/api/patient/' + openid + '/emergency/contact/relation',
    data
  })
}

// 修改紧急联系人的电话号码
export const alterEmergencyContactPhone = (openid, data) => {
  return axios({
    method: 'post',
    url: '/api/patient/' + openid + '/emergency/contact/phone',
    data
  })
}

// 获得就诊人的健康信息
export const getPatientRecord = (openid) => {
  return axios({
    method: 'get',
    url: '/api/patient/' + openid + '/health/record'
  })
}

// 修改就诊者的健康数据
export const alterPatientRecordDetail = (openid, data, type) => {
  console.log('/api/patient/' + openid + '/health/record/height')

  return axios({
    method: 'post',
    url: '/api/patient/' + openid + '/health/record/' + type,
    data
  })
}

// 获得字段的数组
export const getFieldsArray = (field = 'all') => {
  return axios({
    method: 'get',
    url: '/api/common/field/array/' + field
  })
}

// 获得就诊人列表
export const getPatientsList = (userId) => {
  return axios({
    method: 'get',
    url: '/api/user/' + userId + '/patients/list'
  })
}

// 设置当前就诊人
export const setCurrentPatient = (userId, openid) => {
  return axios({
    method: 'post',
    url: '/api/user/' + userId + '/current/patients/' + openid,
    data: {}
  })
}

// 获得就诊人电话号码
export const getPatientsPhone = (userId) => {
  return axios({
    method: 'post',
    url: '/api/patient/' + userId + '/phone/number',
    data: {}
  })
}

// 解锁该就诊人
export const patientsUnbundling = (userId) => {
  return axios({
    method: 'post',
    url: '/api/patient/' + userId + '/unbundling',
    data: {}
  })
}