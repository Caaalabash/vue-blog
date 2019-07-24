module.exports = app => {
  const { userModel } = app.model

  return {
    // 获取用户的某个属性
    getUserProp: async (userName, key) => {
      const doc = await userModel.findOne({ userName }, { [key]: 1, _id: 0 })
      return doc && doc[key] ? doc[key] : ''
    },
    // api v1
    response: (errno = 0, res = '', msg = '') => ({ errno, res, msg }),
  }
}
