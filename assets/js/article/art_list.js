const query = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: "", // 文章分类的 Id
    state: "", // 文章的发布状态
}

const initTable = () => {
    $.ajax({
        type: 'GET',
        url: '/my/article/list',
        data: query,
        success: res => {
            const { status, message, data, total } = res;
            if (status !== 0) return layermsg(message)
            let htmlStr = template('tpl-table', data)
            $('#tb').html(htmlStr)
            renderPage(total)
        }
    })
}
initTable()
const laypage = layui.laypage

function renderPage(total) {
    // 调用 laypage.render() 方法来渲染分页的结构
    laypage.render({
        elem: 'pageBox', // 分页容器的 Id
        count: total, // 总数据条数
        limit: query.pagesize, // 每页显示几条数据
        curr: query.pagenum, // 设置默认被选中的分页
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        limits: [2, 3, 5, 10],// 每页展示多少条
        jump: function (obj, first) {
            // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
            // 如果 first 的值为 true，证明是方式2触发的
            // 否则就是方式1触发的
            // console.log(first)
            // console.log(obj.curr)
            // 把最新的页码值，赋值到 q 这个查询参数对象中
            query.pagenum = obj.curr
            query.pagesize = obj.limit
            // 根据最新的 q 获取对应的数据列表，并渲染表格
            // initTable()
            if (!first) {
                initTable()
            }
        }
    })
}



// 定义美化时间的过滤器
template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)

    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
}

// 定义补零的函数
function padZero(n) {
    return n > 9 ? n : '0' + n
}

const form = layui.form;
const layer = layui.layer;

const initCate = () => {
    $.ajax({
        type: 'GET',
        url: '/my/article/cates',
        success: res => {
            const { status, message, data } = res
            if (status !== 0) return layer.msg(message)
            let htmlStr = template('tpl-cate', data)
            $('[name=cate_id]').html(htmlStr)
            form.render()
        }
    })
}
initCate()

$('#form-search').submit(function (e) {
    e.preventDefault()
    // 为查询参数对象 q 中对应的属性赋值
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    query.cate_id = cate_id
    query.state = state
    // 根据最新的筛选条件，重新渲染表格的数据
    initTable()
})

$('#tb').on('click', '.delete-btn', function () {
    let len = $('.delete-btn').length
    let id = $(this).attr('data-id')
    layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
        $.ajax({
            type: 'GET',
            url: '/my/article/delete/' + id,
            success: res => {
                const { status, message } = res
                layer.msg(message)
                if (status !== 0) return
                if (len === 1) {
                    query.pagenum = query.pagenum === 1 ? 1 : query.pagenum - 1
                }
                initTable()
            }
        })
        layer.close(index);
    });
})