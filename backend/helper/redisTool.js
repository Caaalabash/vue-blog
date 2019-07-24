/**
 * 项目中需要用到Redis操作的封装
 */
module.exports = app => {
  const { redis } = app.plugin

  return {
    redisTool: {
      // 获得某个值, 返回一个Promise
      get(key) {
        return redis.get(key) || 0
      },
      // 删除某个值, 返回一个Promise
      delete(key) {
        return redis.del(key)
      },
      // 为键值加一, 不存在会被初始化为0, 返回一个Promise
      incr(key) {
        return redis.incr(key)
      },
      // 获得所有IP记录
      getIpLog(data) {
        return redis.lrange(data, 0, -1)
      },
      // 记录ip
      async setIpLog(ip, path) {
        const [key, time] = new Date()
          .toLocaleString('zh', { hour12: false })
          .replace(/\//g, '-')
          .split(' ')
        const len = await redis.llen(key)

        len ? redis.rpush(key, `${ip}-${time}-${path}`) : redis.lpush(key, `${ip}-${time}-${path}`)
      },

    }
  }
}

