var rightW = document.documentElement.clientWidth-202;
// $(".right").css("width",rightW +"px");
var row = $(".layerBox").children().length;//层
var rowArr = [row];
var col = 0;//动画
var colArr = [0];
var edgeWidth;
var id=function(o){return document.getElementById(o) || o;}
var boxId;
//添加图层
var addLayer = function (){
	row = rowArr[rowArr.length-1];
	row++;
	rowArr.push(row);
	var layerHide = '<span class="layerHide"></span>';
	var layerName = '<div class="layerName"><img src="" alt=""><span class="name" id="name'+row+'">'+'图层'+row+'</span></div>';
	$(".layerBox").append('<div data-id="1'+row+'" class="layer" id="layer'+row+'" onmousedown="clickLayer(this)">'+layerHide+layerName+'</div>');
	$(".sliderBox").append('<div data-id="2'+row+'" class="slider" id="slider'+row+'" onmousedown="clickLayer(this)"></div>');
	$("#layer"+row).addClass("active").siblings().removeClass('active');
	$("#slider"+row).addClass("active").siblings().removeClass('active');
	colArr = [0];
	// bridge.showMsgBox();
	// bridge.receiveText('aaaa');
}
//选择图层
function clickLayer(obj){
	var layerDataId = obj.dataset.id.substr(1);
	row = layerDataId;
	$("#layer"+row).addClass("active").siblings().removeClass('active');
	$("#slider"+row).addClass("active").siblings().removeClass('active');
	colArr = [0];
}
//修改图层名
function editLayerName(){
	strName = $(".editLayerName").val();
	if (strName == null || strName == "" || strName == undefined){
		alert("请输入名称")
		return;
	}
	$("#name"+row).text(strName);
	$(".editLayerName").val('')
}
//删除图层
function removeLayer(){
	$("#layer"+row).remove();
	$("#slider"+row).remove();
	// for(var i=0; i<rowArr.length; i++) {
	// 	if(rowArr[i] == row) {
	// 		rowArr.splice(i, 1);
	// 		break;
	// 	}
	// }
	row = rowArr[rowArr.length-1];
}
//添加动画
function addBox(){
	var sliderNum = $("#slider"+row)[0].childElementCount;
	// console.log(sliderNum+","+colArr.length);
	$("#slider"+row+">div").each(function(){//遍历子div
		col = $(this)[0].dataset.id.substr(2);
		if(colArr.length < sliderNum+1){
			colArr.push(col);
		}     
	})
	col = colArr[colArr.length-1];
	col++;
	colArr.push(col);
	var main = "<div data-id='"+row+"_"+col+"' id='main"+row+"_"+col+"'class='main' onmousedown='change(this,event)'></div>";
	var head = "<div data-id='"+row+"_"+col+"' id='head"+row+"_"+col+"'class='edge head' onmousedown='change(this,event)'></div>";
	var tail = "<div data-id='"+row+"_"+col+"' id='tail"+row+"_"+col+"'class='edge tail' onmousedown='change(this,event)'></div>";
	$("#slider"+row).append("<div data-id='"+row+"_"+col+"' id='box"+row+"_"+col+"' class='box' onmousedown='clickBox(this)'>"+head+main+tail+"</div>");
	edgeWidth = parseInt($(".edge").css("width"));
}
//选择动画
function clickBox(obj){
	boxId = obj.dataset.id;
	$('#main'+boxId).addClass("active").parent().siblings().children().removeClass('active');
	$('#main'+boxId).addClass("active").parent().parent().siblings().children().children().removeClass('active');
}
//删除动画
function removeBox(){
	$("#box"+boxId).remove();
}
//移动动画
function change(o,e){
	boxId = o.dataset.id;//当前移动的动画id号
	var firstId = $("#box"+boxId).parent()[0].firstChild.dataset.id;//这个图层的第一个动画 var firstId = $("#slider"+row+">:first")[0].dataset.id;
	var before = 0;
	if(boxId != firstId){//移动的不是第一个动画
		var beforeId = $('#box'+boxId).prev()[0].dataset.id;//前一个动画的id
		before = id('tail'+beforeId).offsetLeft+edgeWidth;
	}
	var e = e ? e : window.event;
	if(!window.event) {e.preventDefault();}
	var init={
		mainX: o.offsetLeft-before,
		headX: id('head'+boxId).offsetLeft-before,
		tailX: id('tail'+boxId).offsetLeft-before,
		dX: e.clientX-before
	};
	// console.log(init);
	document.onmousemove=function(e){
		var e = e ? e : window.event;
		var dist=e.clientX-init.dX,
			len=init.mainX + dist,
			l_x=init.headX,
			r_x=init.tailX;
		switch (id(o).id){
            case 'head'+boxId:
                l_x=init.headX + dist-before;
                move('l');
                break;
            case 'tail'+boxId:
                r_x=init.tailX + dist-before;
                move('r');
                break;
            case 'main'+boxId:
                l_x=init.headX + dist-before;
                r_x=init.tailX + dist;
                move2();
                break;
            default: break;
		}
		function move(d){
			if(r_x > l_x && len>=0 &&l_x>=0 && r_x < rightW-edgeWidth && r_x>0) {
				id('main'+boxId).style.width=r_x - l_x - edgeWidth + 'px';
				if(d=='l')	{
					document.getElementById('v1').innerHTML =len/10;
					id('head'+boxId).style.marginLeft= l_x + "px";
				}
				else	{
					document.getElementById('v2').innerHTML =(len+edgeWidth)/10;
				}
			}
		};
		function move2(){
			if(l_x>=0 && r_x < rightW) {
				id('head'+boxId).style.marginLeft= l_x + "px";
				document.getElementById('v1').innerHTML =l_x/10;
				document.getElementById('v2').innerHTML =(r_x+edgeWidth)/10;
			}
		};
	}
	document.onmouseup=function(){
		document.onmousemove=null;
		document.onmouseup=null;
	}
}
// new QWebChannel(qt.webChannelTransport, function(channel) {
// 	window.bridge = channel.objects.bridge;
// })
// function onShowMsgBox() {
// 	if (bridge) {
// 	  bridge.showMsgBox()
// 	}
// }