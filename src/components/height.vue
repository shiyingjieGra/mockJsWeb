<template>
  <div class="container">
    <el-page-header @back="goBack" content="进阶应用">
    </el-page-header>
    <div class="title">mock中进阶应用方式为：通过MockJs的方法拦截请求，并返回构建的假数据</div>
    <div class="title bold">key值请用引号包裹</div>
    <div class="title bold">最后一个对象及数组后面请勿添加,否则会报错</div>
    <el-divider></el-divider>
    <div class="container-body">
      <div class="box-container">
        <div class="title">拦截请求</div>
        <div class="show-box">
          <div class="body-title">配置接口：</div>
          <textarea ref="interceptInput"></textarea>
        </div>
      </div>
      <div class="box-container">
        <div class="title">发送请求</div>
        <div class="show-box">
          <el-input class="url send-url" placeholder="请输入请求" v-model="sendUrl">
            <template slot="prepend">Http://</template>
          </el-input>
          <el-select class="method" v-model="sendMethod" placeholder="请选择">
            <el-option
              v-for="item in methodList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-button type="primary" @click="send">发送</el-button>
          <div class="body-title">返回结果：</div>
          <textarea ref="resultInput"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _CodeMirror from 'codemirror'
// 核心样式
import 'codemirror/lib/codemirror.css'
// 引入主题后还需要在 options 中指定主题才会生效
import 'codemirror/theme/cobalt.css'
import 'codemirror/mode/javascript/javascript.js'
import axios from 'axios'

// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror

export default {
  name: 'middle',
  data () {
    return {
      interceptUrl: '10.20.56.28:8080/test', // 拦截url
      methodList: ['post', 'get', 'delete'], // 请求列表
      interceptMethod: 'get', // 拦截方法
      // 默认配置
      options: {
        // 缩进格式
        tabSize: 2,
        // 主题，对应主题库 JS 需要提前引入
        theme: 'cobalt',
        // 显示行号
        lineNumbers: true,
        line: true
      },
      // 编辑器实例
      interceptCoder: null,
      interceptCode: '', // 编辑器内容
      sendUrl: '10.20.56.28:8080/test', // 请求url
      sendMethod: 'get', // 请求方法
      resultCoder: null, // 展示结果编辑器
      resultCode: '', // 展示结果文本
      isTrue: true, // 结构是否正确
      configArray: [] // 配置数组
    }
  },
  methods: {
    getSetting () {
      this.configArray = []
      // 使用Webpack的require.context()遍历所有mock文件
      const files = require.context('../mockjs', true, /\.js$/)
      files.keys().forEach((key) => {
        // 剔除配置文件
        if (key === './index.js' || key === './mock.config.js') {
          return
        }
        this.configArray = this.configArray.concat(files(key).default)
      })
    },
    goBack () {
      this.$router.push('/')
    },
    // 初始化范式组件
    initIntercept () {
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      this.interceptCoder = CodeMirror.fromTextArea(this.$refs.interceptInput, this.options)
      this.interceptCoder.setOption('readOnly', true)
      // 编辑器赋值
      this.interceptCode = JSON.stringify(JSON.parse(JSON.stringify(this.configArray)), null, 2)
      this.interceptCoder.setValue(this.interceptCode)
      // 支持双向绑定
      this.interceptCoder.on('change', (coder) => {
        this.interceptCode = coder.getValue()
      })
    },
    // 初始化展示组件
    initShow () {
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      this.coderShow = CodeMirror.fromTextArea(this.$refs.resultInput, {...this.options, readOnly: 'nocursor'})
    },
    // 发送请求
    send () {
      if (!this.isTrue) {
        this.$message({
          message: '范式解析失败，请检查范式是否符合规范',
          type: 'warning'
        })
      } else {
        axios[this.sendMethod](this.sendUrl, {}).then(res => {
          // 请求成功时，展示返回结果
          this.coderShow.setValue(JSON.stringify(res.data, null, 4))
        }).catch(error => {
          // 请求失败时，展示错误
          this.coderShow.setValue(JSON.stringify(error.message, null, 4))
        })
      }
    }
  },
  created () {
    this.getSetting()
  },
  mounted () {
    // 初始化
    this.initIntercept()
    this.initShow()
  }
}
</script>

<style scoped lang="less">
.container {
  .title {
    text-align: center;
  }
  .bold {
    font-weight: 800;
    color: red;
  }
  .container-body {
    margin: 0 auto;
    .box-container {
      width: 47%;
      display: inline-block;
      padding: 1%;
      .show-box {
        padding-top: 10px;
        .url {
          width: 89%;
        }
        .method {
          width: 10%;
        }
        .body-title {
          margin: 10px 0px;
        }
        .send-url {
          width: 77%;
        }
        .send-button {
          width: 10%;
        }
      }
    }
  }
}
</style>
