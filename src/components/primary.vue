<template>
  <div class="container">
    <el-page-header @back="goBack" content="初级使用">
    </el-page-header>
    <div class="title">mock初级使用方式为Mock函数的使用，我们通过调用Mock.mock方法及自带属性，生成想要的数据</div>
    <div class="title bold">key值请用引号包裹</div>
    <div class="title bold">最后一个对象及数组后面请勿添加,否则会报错</div>
    <el-divider></el-divider>
    <div class="box-container">
      <div class="code">
        <textarea ref="textarea"></textarea>
        <el-button class="format" @click="format">格式化</el-button>
      </div>
      <el-button class="button" @click="transfer">生成</el-button>
      <div class="reslut">
        <textarea ref="showText"></textarea>
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
import Mock from 'mockjs'

// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror

export default {
  name: 'primary',
  data () {
    return {
      // 内部真实的内容
      code: '{\r\n"name": "@cname"\r\n}',
      // 默认的语法类型
      mode: 'javascript',
      // 编辑器实例
      coder: null,
      coderShow: null, // 显示编辑器
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
      // 转换结果
      resultCode: ''
    }
  },
  mounted () {
    // 初始化
    this._initialize()
    this.initShow()
  },
  methods: {
    // 初始化
    _initialize () {
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      this.coder = CodeMirror.fromTextArea(this.$refs.textarea, this.options)
      // 编辑器赋值
      this.coder.setValue(this.code)
      // 支持双向绑定
      this.coder.on('change', (coder) => {
        this.code = coder.getValue()
      })
    },
    initShow () {
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      this.coderShow = CodeMirror.fromTextArea(this.$refs.showText, {...this.options, readOnly: 'nocursor'})
    },
    transfer () {
      // 将所有单引号变为双引号，去除文本中的换行
      let codeDouble = this.code.replace(/'/g, '"')
      codeDouble = codeDouble.replace(/\/ +/g, '')
      codeDouble = codeDouble.replace(/[\r\n]/g, '')
      try {
        // 将文本转化为对象并使用Mock.mock生成结果
        let code = JSON.parse(codeDouble)
        this.resultCode = Mock.mock(code)
        // 将结果做多次转换之后放入展示编辑器内
        let resStr = JSON.stringify(this.resultCode)
        this.coderShow.setValue(JSON.stringify(JSON.parse(resStr), null, 4))
      } catch (error) {
        // 当解析失败时，弹出弹窗提示
        this.$message({
          message: '解析失败，请检查代码是否符合规范',
          type: 'warning'
        })
      }
    },
    goBack () {
      this.$router.push('/')
    },
    format () {
      // 将所有单引号变为双引号，去除文本中的换行
      let codeDouble = this.code.replace(/'/g, '"')
      codeDouble = codeDouble.replace(/\/ +/g, '')
      codeDouble = codeDouble.replace(/[\r\n]/g, '')
      this.coder.setValue((JSON.stringify(JSON.parse(codeDouble), null, 2)))
    }
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
  span {
    margin: 0 auto;
  }
  .box-container {
    display: flex;
    align-items: center;
    div {
      height: 300px;
      display: inline-block;
    }
    .button {
      height: 40px;
      margin: 0 5px;
    }
    .code {
      flex: 1;
      width: 40%;
    }
    .operation {
      width: 15%;
    }
    .reslut {
      flex: 1;
      width: 40%;
      border: 1px solid #DCDFE6;
      overflow: auto;
    }
  }
}
</style>
