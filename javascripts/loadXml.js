/**
 * Created by longhaibo on 16/9/17.
 */



function topDiv(str) {
    var rhtml = '<div class="divTop">'+str+'</div>';
    return rhtml;
}

function numberP(str) {
    var rhtml = '<p>版本号:'+str+'</p>';
    return rhtml;
}

function statusP(str) {
    var rhtml = '<p>状态:'+str+'</p>';
    return rhtml;
}

function dateP(str) {
    var rhtml = '<p>更新日期:'+str+'</p>';
    return rhtml;
}

function actionP(str) {
    var rhtml = '<p style="float: right;vertical-align: middle">'+str+'</p>';
    return rhtml;
}

function downA(str) {
    var rhtml = '<a href="'+str+'" class="itemA" style="font-size: 0.9em">下载</a>';
    return rhtml;
}

function lookA(str) {
    var rhtml = '<a href="'+str+'" class="itemA" style="font-size: 0.9em" target="_blank">浏览</a>';
    return rhtml;
}

function detailedDivUl(str) {
    var rhtml = '<div class="divItemC"><ul>'+str+'</ul></div>';
    return rhtml;
}

function pointLi(str) {
    var rhtml = '<li>'+str+'</li>';
    return rhtml;
}

//获取历史版本内容列表
function historyItem(url,callbck) {
    var htmlVersionList = '';
    url = 'xmls/'+url;
    $.get(url, function (data) {
        $(data).find('version').each(
            function () {
                
                var htmlVersionTop = '';
                
                var number = $(this).children('number').text();
                htmlVersionTop += numberP(number);

                var status = $(this).children('status').text();
                htmlVersionTop += statusP(status);

                var up_date = $(this).children('up_date').text();
                htmlVersionTop += dateP(up_date);

                var down_href = $(this).children('down_href').text();
                var look_href = $(this).children('look_href').text();
                
                if(look_href!='null'){
                    htmlVersionTop +=actionP(downA(down_href)+lookA(look_href));
                }else {
                    htmlVersionTop +=actionP(downA(down_href));
                }
                
                
                htmlVersionTop = topDiv(htmlVersionTop);

                htmlVersionList += htmlVersionTop;

                var versionDetailed = '';
                
                $(this).children('detailed').children().each(
                    function () {
                        
                        var point = $(this).text();

                        versionDetailed +=pointLi(point);
                    }
                )

                htmlVersionList += detailedDivUl(versionDetailed);

                htmlVersionList += '<p></p>';
            }
        )
        callbck(htmlVersionList);
    })
}


var htmlMenuList = '';

function menuA(str) {
    var rhtml = '<a href="#">'+str+'</a>';
    return rhtml;
}

function menuDiv(url,str) {
    var rhtml = '<div name="itemDiv" style="padding: 5px" xmlItem ="'+url+'" onclick="columnClick(this)">'+str+'</div>';
    return rhtml;
}

//获取项目菜单
function historyMenu(url,callbck) {
    url = 'xmls/'+url;
    $.get(url, function (data) {
        $(data).find('menu').each(
            function () {
                var menu = $(this).text();
                var mA = menuA(menu);
                
                var hisXml = $(this).attr('hisXml');
                var mDiv = menuDiv(hisXml,mA);
                
                htmlMenuList += mDiv;
            }
        )
        callbck(htmlMenuList);
    })
}



