const form = layui.form;
const layer = layui.layer;

const renderCateslist = () => {
    $.ajax({
        type: 'GET',
        url: '/my/article/cates',
        success: res => {
            const { status, message, data } = res
            if (status !== 0) return layer.msg(message)
            let htmlStr = template('tpl-cate', data)
            $('[name = cate_id]').html(htmlStr)
            form.render()
        }
    })
}
renderCateslist()

// 初始化富文本编辑器
initEditor()

// 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)

$('#chooseImageBtn').on('click', function () {
    $('#coverFile').click()
})
$('#coverFile').change(function (e) {
    // 获取到文件的列表数组
    var files = e.target.files
    // 判断用户是否选择了文件
    if (files.length === 0) {
        return
    }
    // 根据文件，创建对应的 URL 地址
    var newImgURL = URL.createObjectURL(files[0])
    // 为裁剪区域重新设置图片
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', newImgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
})

let art_state = '已发布'

$('#saveBtn').click(function () {
    art_state = '草稿'

})

$('.layui-form').submit(function (e) {
    e.preventDefault()
    console.log(1);
})