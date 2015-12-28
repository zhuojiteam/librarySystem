$('.ui.form')
    .form({
        fields: {
            name: {
                identifier: 'name',
                rules: [
                    {
                        type   : 'empty',
                        prompt : '请输入姓名~'
                    }
                ]
            },
            student_id: {
                identifier: 'student_id',
                rules: [
                    {
                        type   : 'number',
                        prompt : '请输入学号~'
                    }
                ]
            },
            username: {
                identifier: 'username',
                rules: [
                    {
                        type   : 'empty',
                        prompt : '请输入昵称~'
                    }
                ]
            },
            email: {
                identifier: 'email',
                rules: [
                    {
                        type   : 'email',
                        prompt : '请输入昵称~'
                    }
                ]
            },
            password: {
                identifier: 'password',
                rules: [
                    {
                        type   : 'empty',
                        prompt : '请输入密码~'
                    },
                    {
                        type   : 'minLength[6]',
                        prompt : '密码最少{ruleValue}位噢~'
                    }
                ]
            }
        }
    })
;