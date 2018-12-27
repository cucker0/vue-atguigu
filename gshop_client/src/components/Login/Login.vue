<template>
  <div class="loginInner">
    <div class="login_header">
      <h2 class="login_logo">硅谷外卖</h2>
      <div class="login_header_title">
        <a href="javascript:;" :class="{on: loginWay}" v-on:click="loginWay = true">短信登录</a>
        <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay = false">密码登录</a>
      </div>
    </div>
    <div class="login_content" @keyup.enter="login">
      <form @submit.prevent="login">
        <div :class="{on: loginWay}">
          <section class="login_message">
            <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
            <button :disabled="!checkPhone" class="get_verification" :class="{phone_true: checkPhone}" @click.prevent="getSmsCode">
              <!-- 计数器大于0时显示已发送及倒计时 -->
              {{counter > 0 ? `已发送(${counter})` : '获取验证码'}}
            </button>
          </section>
          <section class="login_verification">
            <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
          </section>
          <section class="login_hint">
            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
            <a href="javascript:;">《用户服务协议》</a>
          </section>
        </div>
        <div :class="{on: !loginWay}">
          <section>
            <section class="login_message">
              <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
            </section>
            <section class="login_verification">
              <!--<input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">-->
              <!--<input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">-->
              <!--也可以下面这种方式来切换密码的显示方式-->
              <input :type="showPwd ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd">
              <div class="switch_button" :class="showPwd ? 'on': 'off'" @click="showPwd = !showPwd">
                <div class="switch_circle" :class="{right: showPwd}"></div>
                <span class="switch_text">{{showPwd ? 'abc' : '...'}}</span>
              </div>
            </section>
            <section class="login_message">
              <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
              <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
            </section>
          </section>
        </div>
        <button class="login_submit">登录</button>
      </form>
      <a href="javascript:;" class="about_us">关于我们</a>
    </div>
    <a href="javascript:" class="go_back" v-on:click="$router.back()">
      <i class="iconfont icon-jiantou2"></i>
    </a>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="CloseTip"></AlertTip>
  </div>
</template>

<script>
import {reqSendCode, reqSmsLogin, reqPasswordLogin} from '../../api'
import AlertTip from '../../components/AlertTip/AlertTip'
/* eslint-disable */
export default {
  name: 'Login',
  data () {
    return {
      loginWay: true, // true: 短信登录， false: 帐号密码登录
      counter: 0, // 发送短信验证码计时器
      phone: '', // 手机号码
      code: '', // 短信验证码
      pwd: '', // 用户登录的密码
      name: '', // 用户名
      captcha: '', // 图形验证码
      showPwd: false, // 是否显示密码,
      alertText: '', // 提示文本
      alertShow: false // 是否显示提示框
    }
  },
  components: {
    AlertTip
  },
  computed: {
    checkPhone () {
      /*
      * 检查手机号码是否合法
      * return: 检查的结果 true/false
      * */
      return /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(19[8-9]){1}|(166))+\d{8})$/.test(this.phone)
    }
  },
  methods: {
    echoTest () {
      console.log('999')
    },
    async getSmsCode () {
      /*
      * 获取短信验证码
      *
      * */

      // 可点击情况：只有在未开始计时
      if (this.counter === 0) {
        // 开始倒计时
        this.counter = 30
        this.intervalId = setInterval(() => { // 定时器，间隔时间为1s
          this.counter--
          if (this.counter <= 0) {
            clearInterval(this.intervalId) // 计数器<= 0时清除定时器
          }
        }, 1000)
        // 向api发送ajax请求,向指定的手机号发短信验证码
        const result = await reqSendCode(this.phone) // 没有 async .. await时，返回的是一个Promise对象
        if (result.code === 1) { // 短信发送失败
          // 弹出提示
          this.showAlert(result.msg)

          // 停止倒计时
          if (this.counter) {
            this.counter = 0
            // console.log(intervalId) // intervalId是一个数字
            clearInterval(this.intervalId)
            this.intervalId = undefined
          }

        } else { // 短信发送成功
        }
      }
    },
    showAlert (alertText) { // 显示提示信息，替换提示文本
      this.alertShow = true
      this.alertText = alertText
    },
    async login () {
      // 异步登录，前台数据检测
      let login_result // 请求登录接口返回的数据（包括短信登录、密码登录）
      if (this.loginWay) { // 短信登录
        const {checkPhone, phone, code} = this
        if (!phone) {
          // 手机号不能为空
          this.showAlert('手机号不能为空')
          return // 跳出，不继续往下执行
        } else if (!checkPhone) {
          // 手机号不正确
          this.showAlert('手机号不正确')
          return
        } else if (!/^\d{6}$/.test(code)) {
          // 短信验证码必须是6位数字
          this.showAlert('短信验证码必须是6位数字')
          this.code = '' // 清空已填写的短信验证码
          return
        }
        // 发送ajax短信登录请求
        login_result = await reqSmsLogin(phone, code)
        // if (login_result.code === 0) { // 登录成功
        //   // 把user信息保存到store
        //   const user = login_result.data
        // } else { // 登录失败
        //   // 弹出提示框
        //   const msg = login_result.msg
        //   this.showAlert(msg)
        // }
      } else { // 帐号密码登录
        const {name, pwd, captcha} = this
        if (!name) {
          // 用户名不能为空
          this.showAlert('用户名不能为空')
          return
        } else if (!pwd) {
          // 密码不能为空
          this.showAlert('密码不能为空')
          return
        } else if (!captcha) {
          // 验证码不能为空
          this.showAlert('验证码不能为空')
          return
        }
        // 发送ajax密码登录请求
        login_result = await reqPasswordLogin({name, pwd, captcha})
        // if (login_result.code === 0) { // 登录成功
        //   // 把user信息保存到store
        //   const user = login_result.data
        // } else { // 登录失败
        //   // 弹出提示框
        //   const msg = login_result.msg
        //   this.showAlert(msg)
        // }
      }

      // 停止倒计时
      if (this.counter) {
        this.counter = 0
        clearInterval(this.intervalId)
        this.intervalId = undefined
      }

      // 处理请求登录接口(短信登录、密码登录)返回的数据
      if (login_result.code === 0) { // 登录成功
        // 把user信息保存到store的state中
        const user = login_result.data
        // 跳转到个人中心
        this.$store.dispatch('saveUserinfo', user)
        this.$router.replace('/profile')
      } else { // 登录失败
        // 弹出提示框
        this.getCaptcha()
        const msg = login_result.msg
        this.showAlert(msg)
        this.captcha = '' // 清空已填写的图形验证码
        this.code = '' // 清空已填写的短信验证码
      }
    },
    CloseTip () {
      // 关闭提示
      this.alertShow = false
      this.alertText = ''
    },
    // getCaptcha (event) {
    //   // 获取图形验证码  (在密码登录失败时，需要刷新一次图形验证码，这时候无法用event，故这里用ref来定位到图形验证码标签)
    //   event.target.src = 'http://localhost:4000/captcha?time=' + Date.now()
    //   // console.log(event.target.src)
    // },
    getCaptcha () {
      // 获取图形验证码  (在密码登录失败时，需要刷新一次图形验证码，这时候无法用event，故这里用ref来定位到图形验证码标签)
      // 每次的src要不一样
      const d = new Date()
      const timestamp = Date.now() + d.getMilliseconds() // 毫秒级
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + timestamp
      // console.log(event.target.src)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.phone_true
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                  transform translateX(28px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
