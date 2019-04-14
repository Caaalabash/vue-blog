/**
 * 用户表结构
 * userName: 用户名(也做索引使用)
 * userPwd: 密码(未加密)
 * avatar: 头像地址
 * userInfo: 微博, github, twiiter地址
 * likeList: 点赞列表: 作者, 日期, 标题
 * collectList: 收藏夹列表
 *   collectTitle: 收藏夹标题
 *   collectType: 收藏夹类型 public / private
 *   collectDesc: 收藏夹描述
 *   list: 收藏文章列表
 */
const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  userName: String,
  userPwd: String,
  avatar: String,
  userInfo: {
    twitter: String,
    github: String,
    weibo: String
  },
  likeList: [{
    author: String,
    blogDate: String,
    blogTitle: String
  }],
  collectList: [{
    collectTitle: String,
    collectType: String,
    collectDesc: String,
    list: [{
      author: String,
      blogDate: String
    }]
  }],
})

module.exports = mongoose.model('user', userSchema)
