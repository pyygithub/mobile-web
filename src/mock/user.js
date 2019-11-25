export default {
    // 获取图形验证码
    getImgCode: {
        "code" : 200,
        "success" : true,
        "message" : "SUCCESS",
        "data":   {
            "img": "data:image/png;base64,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",
            "uuid": "img_code_648551742316740608"
        }
    },
    // 发送短信验证码
    sendSmsCode: {
        // "code" : 200, // 20001 发送短信验证码失败
        // "success" : true,
        // "message" : "SUCCESS",
        // "data":   {
        //     "code": "134144",
        //     "uuid": "sms_code_648551742316740608"
        // }

        "code" : 20001, // 20001 发送短信验证码失败
        "success" : true,
        "message" : "发送短信验证码失败",
        "data": null
    },
    loginSms: {
        "code" : 200,
        "success" : true,
        "message" : "登录成功",
        "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTUzNTY4NjY0NSwiZXhwIjoxNTM2ODk2MjQ1fQ.bGV4qjcZcNYDBJjihIsSbSEQyPa5SkVcUYuA0WfgDds"
    },
    loginPwd: {
        "code" : 200,
        "success" : true,
        "message" : "登录成功",
        "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTUzNTY4NjY0NSwiZXhwIjoxNTM2ODk2MjQ1fQ.bGV4qjcZcNYDBJjihIsSbSEQyPa5SkVcUYuA0WfgDds"
    }
}
