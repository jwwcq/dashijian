const initArtCateList = () => {
    $.ajax({
        type: 'GET',
        url: '/my/article/cates',
        data: null,
        success: res => {

            const { status, message, data } = res
            if (status !== 0) return layer.msg(message)

            const htmlStr = template("tpl-table", data);
            $("tbody").empty().html(htmlStr);
        }
    })
}
initArtCateList()

const layer = layui.layer
const form = layui.form
let layerAdd = null

$('#addCateBtn').click(function () {
    layerAdd = layer.open({
        type: 1,
        area: ["500px", "250px"],
        title: "添加文章分类",
        content: $('#dialog-add').html(),
    });
})

$('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
        type: 'POST',
        url: '/my/article/addcates',
        data: form.val('formAdd'),
        success: res => {
            const { status, message } = res
            layer.msg(message)
            if (status !== 0) return
            initArtCateList()
            layer.close(layerAdd)
        }
    })
})

let layerEdit = null
$('#tb').on('click', '.btn-edit', function () {
    layerEdit = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: "添加文章分类",
        content: $('#dialog-edit').html(),
    })
    let id = $(this).attr('data-id')
    $.ajax({
        type: 'GET',
        url: '/my/article/cates/' + id,
        success: res => {
            const { status, message, data } = res
            if (status !== 0) return layer.msg(message)
            form.val('formEdit', data)
        }
    })
})

$('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
        type: 'POST',
        url: '/my/article/updatecate',
        data: form.val('formEdit'),
        success: res => {
            const { status, message } = res
            layer.msg(message)
            if (status !== 0) return
            layer.close(layerEdit);
            initArtCateList()

        }
    })
})

$('#tb').on('click', '.btn-delete', function () {
    let id = $(this).attr('data-id')
    layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
        $.ajax({
            type: 'GET',
            url: '/my/article/deletecate/' + id,
            data: null,
            success: res => {
                const { status, message } = res
                layer.msg(message)
                if (status !== 0) return
                initArtCateList()
            }
        })
        layer.close(index);
    });
})