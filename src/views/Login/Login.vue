<template>
    <section class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">XX外卖</h2>
                <div class="login_header_title">
                    <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
                    <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form @submit.prevent="login">
                    <div :class="{on: loginWay}">
                        <section class="login_message">
                            <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                            <button :disabled="!rightPhone" class="get_verification"
                                    :class="{right_phone: rightPhone}" @click.prevent="getSmsCode">
                                {{computeTime > 0 ? `已发送(${computeTime}秒)` : '获取验证码'}}
                            </button>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="8" placeholder="验证码" v-model="smsCode">
                        </section>
                        <section class="login_hint">
                            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <div :class="{on: !loginWay}">
                        <section>
                            <section class="login_message">
                                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                            </section>
                            <section class="login_verification">
                                <input type="text" maxlength="12" placeholder="密码" v-if="showPwd" v-model="pwd">
                                <input type="password" maxlength="12" placeholder="密码" v-else v-model="pwd">
                                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                                    <div class="switch_circle" :class="{right: showPwd}"></div>
                                    <span class="switch_text">{{showPwd ? 'abc' : '...'}}</span>
                                </div>
                            </section>
                            <section class="login_message">
                                <input type="text" maxlength="11" placeholder="验证码" v-model="imgCode">
                                <img class="get_verification" :src="imgCodeUrl" alt="验证码" @click="getCaptcha">
                            </section>
                        </section>
                    </div>
                    <button class="login_submit">登录</button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>
            <a href="javascript:" class="go_back" @click="$router.back()">
                <i class="iconfont icon-angle-left"></i>
            </a>
        </div>

        <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></AlertTip>
    </section>
</template>

<script>
    import AlertTip from "../../components/AlertTip/AlertTip";
    import {getImgCode, sendSmsCode, loginSms, loginPwd} from '../../api/user'
    import {setToken} from '../../utils/auth'
    import {mapActions} from 'vuex'

    export default {
        data () {
            return {
                loginWay: true, // true: 短信登陆 false：密码登录
                computeTime: 0, // 计时为0 则停止计时
                showPwd: false, // 是否显示密码
                phone: '', // 手机号
                name: '', // 用户名
                pwd: '', // 密码
                smsCode: '', // 短信验证码
                smsCodeUUID: '', // 验证唯一标识
                imgCode: '', // 图形验证码
                imgCodeUrl: '', // 图形验证码地址
                imgCodeUUID: '', // 图形验证码唯一标识
                alertText: '', // 提示文本
                alertShow: false, // 是否显示提示框
            }
        },
        computed: {
            rightPhone () {
                return /^1\d{10}$/.test(this.phone)
            }
        },
        created () {
            this.getCaptcha()
        },
        methods: {
            ...mapActions(['getUserInfo']),
            // 提示框
            showAlert (alertText) {
                this.alertShow = true
                this.alertText = alertText
            },
            // 关闭提示框
            closeTip () {
                this.alertShow = false
                this.alertText = ''
            },
            // 获取短信验证码
            async getSmsCode () {
                // 如果当前没有计时
                if (!this.computeTime) {
                    // 启动倒计时
                    this.computeTime = 30
                    this.intervalId = setInterval(() => {
                        this.computeTime--
                        if (this.computeTime <= 0) {
                            // 停止计时
                            clearInterval(this.intervalId)
                        }
                    }, 1000)
                    // 发送请求（向指定手机号发送验证短信）
                    const result = await sendSmsCode(this.phone)
                    if (result.code !== 200) {
                        // 显示提示
                        this.showAlert(result.message)
                        // 停止倒计时
                        if (this.computeTime) {
                            this.computeTime = 0
                            clearInterval(this.intervalId)
                        }
                    }
                }
            },
            // 获取图形验证码
            async getCaptcha () {
                const result = await getImgCode()
                if (result.code === 200) {
                    this.imgCodeUrl = result.data.img
                    this.imgCodeUUID = result.data.uuid
                }
            },
            // 异步登录
            async login () {
                let result
                // 前台表单验证
                if (this.loginWay) {// 方式一：短信登录
                    const {phone, smsCode, smsCodeUUID} = this
                    if (!this.rightPhone) {
                        // 手机号不正确
                        this.showAlert('手机号不正确')
                        return
                    } else if (!/^\d{6}$/.test(smsCode)) {
                        // 验证码不正确
                        this.showAlert('验证码不正确')
                        return
                    }
                    // 发送短信登录请求
                    result = await loginSms({
                        phone,
                        smsCode,
                        smsCodeUUID
                    })
                } else { // 方式二：密码登录
                    const {name, pwd, imgCode, imgCodeUUID} = this
                    if (!this.name) {
                        // 用户名不能为空
                        this.showAlert('用户名不能为空')
                        return
                    } else if (!this.pwd) {
                        // 密码不能为空
                        this.showAlert('密码不能为空')
                        return
                    } else if (!this.imgCode) {
                        // 验证码不能为空
                        this.showAlert('验证码不能为空')
                        return
                    }
                    // 发送密码登录请求
                    result = await loginPwd({
                        name,
                        pwd,
                        imgCode,
                        imgCodeUUID
                    })
                }
                // 停止倒计时
                if (this.computeTime) {
                    this.computeTime = 0
                    clearInterval(this.intervalId)
                }
                // 根据结果数据处理
                if (result.code === 200) {
                    const token = result.data
                    // 将token保存到sessionStorage
                    setToken(token)
                    // 将用户信息保存到vuex
                    this.getUserInfo();
                    // 跳转页面到个人中心
                    this.$router.replace('/profile')
                } else {
                    // 重新获取图片验证码
                    this.getCaptcha()
                    // 显示警告提示
                    const msg = result.message
                    this.showAlert(msg)
                }
            }

        },
        components: {
            AlertTip
        }
    }
</script>

<style lang="stylus" type="text/stylus" ref="stylesheet/stylus" scoped>
    @import "../../assets/stylus/mixins.styl"
    .loginContainer
        width 100%
        height 100%
        background #fff
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
                                &.right_phone
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
                                        transform translateX(30px)
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
