import { createAPI, createFormAPI} from '../utils/request'

// 1.发送短信验证码
export const sendSmsCode = (phone) => createAPI(`/send_sms_code?phone=${phone}`, 'get')

// 2.获取一次性验证码
export const getImgCode = () => createAPI('/img_code', 'get')

// 3、用户名密码登陆
export const loginPwd = ({name, pwd, imgCode, imgCodeUUID}) => createAPI('/login_pwd', 'post', {name, pwd, imgCode, imgCodeUUID})

// 4、手机号验证码登陆
export const loginSms = ({phone, smsCode, smsCodeUUID}) => createAPI('/login_sms', 'post', {phone, smsCode, smsCodeUUID})

// 5、根据会话获取用户信息
export const getUserInfo = () => createAPI('/profile', 'get')

// 6、用户登出
export const logout = () => createAPI('/logout', 'get')