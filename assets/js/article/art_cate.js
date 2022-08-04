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

$('#addCateBtn').click(function () {
    layer.open({
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
            console.log(res);
        }
    })
})