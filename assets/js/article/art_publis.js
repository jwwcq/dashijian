const renderCateslist = () => {
    $.ajax({
        type: 'GET',
        url: '/my/article/cates',
        success: res => {
            console.log(res);
        }
    })
}
renderCateslist()