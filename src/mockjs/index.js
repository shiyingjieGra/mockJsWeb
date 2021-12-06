import config from './mock.config'
const Mock = require('mockjs')

if (config.enableMock) {
  // 设置拦截Ajax请求的相应时间
  Mock.setup({
    timeout: '200-600'
  })

  let configArray = []

  // 使用Webpack的require.context()遍历所有mock文件
  const files = require.context('.', true, /\.js$/)
  files.keys().forEach((key) => {
    // 剔除配置文件
    if (key === './index.js' || key === './mock.config.js') {
      return
    }
    if (config.include.length > 0 && config.include.every(i => !i.test(key))) {
      return
    }
    if (config.exclude.length > 0 && config.exclude.some(i => i.test(key))) {
      return
    }
    configArray = configArray.concat(files(key).default)
  })

  // 注册所有的mock服务
  configArray.forEach((item) => {
    for (const [path, target] of Object.entries(item)) {
      const protocol = path.split('|')
      if (config.includeApi.length > 0 && config.includeApi.every(i => !i.test(protocol[1]))) {
        return
      }
      if (config.excludeApi.length > 0 && config.excludeApi.some(i => !i.test(protocol[1]))) {
        return
      }
      console.log(new RegExp('^' + config.rootPath + protocol[1]), protocol[0], target)
      Mock.mock(new RegExp('^' + config.rootPath + protocol[1]), protocol[0], target)
    }
  })
}
