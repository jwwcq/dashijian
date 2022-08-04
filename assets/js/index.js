function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        data: null,
        success: res => {
            const { status, message } = res
            if (status !== 0) return layer.msg(message)
            rederAvatar(res.data)
        }

    })
}

const rederAvatar = data => {
    let name = data.nickname || data.username
    $('#welcome').text("欢迎" + name)
    if (data.user_pic !== null) {
        $('.layui-nav-img').attr('src', data.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let firstName = name[0].toUpperCase()
        $('.text-avatar').html(firstName)
    }
}

getUserInfo()


$('#exitBtn').click(function () {
    layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
        location.href = "/login.html"
        localStorage.removeItem('token')
        layer.close(index);
    });
})

