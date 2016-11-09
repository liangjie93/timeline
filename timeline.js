// var rightW = document.documentElement.clientWidth-202;
var rightW;
// $(".right").css("width",rightW +"px");
var row = $(".layerBox").children().length;//层
var rowArr = [row];
var col = 0;//动画
var colArr = [0];
var edgeWidth;
var id=function(o){return document.getElementById(o) || o;}
var animateId;

var delaytime;
var duration;
var delaytimeQt;
var durationQt;
//1.添加图层
var addLayer = function (strName){
	row = rowArr[rowArr.length-1];
	row++;
	rowArr.push(row);
	var layerHide = '<div class="layerHide"><img src="" alt="" /></div>';
	var layerName = '<div class="layerName"><img src="" alt=""><input class="name" id="name'+row+'" value="'+strName +row+'" placeholder="图层名称"><img src="" alt="" class="delLayer" id="delLayer'+row+'" onclick="removeLayer()"></div>';
	$(".layerBox").append('<div data-id="1'+row+'" class="layer" id="layer'+row+'" onmousedown="clickLayer(this)">'+layerHide+layerName+'</div>');
	$(".sliderBox").append('<div data-id="2'+row+'" class="slider" id="slider'+row+'" onmousedown="clickLayer(this)"></div>');
	colArr = [0];
	clickLayer(id('slider'+row));
	// bridge.showMsgBox();
	// bridge.receiveText('aaaa');
}
//2.选择图层
function clickLayer(obj){
	var layerDataId = obj.dataset.id.substr(1);
	row = layerDataId;
	colArr = [0];
	$("#layer"+row).addClass("active").siblings().removeClass('active');
	$("#slider"+row).addClass("active").siblings().removeClass('active');
	$("#name"+row).addClass("active").parent().parent().siblings().children().children().removeClass('active');
	$("#delLayer"+row).css("display","block").parent().parent().siblings().children().children(".delLayer").css("display","none");
}
//修改图层名
// function editLayerName(){
	// strName = $(".editLayerName").val();
	// if (strName == null || strName == "" || strName == undefined){
	// 	alert("请输入名称")
	// 	return;
	// }
	// // $("#name"+row).text(strName); 
	// $(".editLayerName").val('')
// }
//3.删除图层
function removeLayer(){
	$("#layer"+row).remove();
	$("#slider"+row).remove();
	row = rowArr[rowArr.length-1];
}
//4.添加动画
function addAnimate(){
	if(row==0)return;
	var sliderNum = $("#slider"+row)[0].childElementCount;//子集个数
	if(colArr.length-1 < sliderNum){
		$("#slider"+row+">div").each(function(){//遍历子div
			col = $(this)[0].dataset.id.substr(2);
				colArr.push(col);
		})
	}
	col = colArr[colArr.length-1];
	col++;
	colArr.push(col);
	var main = "<div data-id='"+row+"_"+col+"' id='main"+row+"_"+col+"'class='main' onmousedown='change(this,event)'></div>";
	var head = "<div data-id='"+row+"_"+col+"' id='head"+row+"_"+col+"'class='edge head' onmousedown='change(this,event)'></div>";
	var tail = "<div data-id='"+row+"_"+col+"' id='tail"+row+"_"+col+"'class='edge tail' onmousedown='change(this,event)'></div>";
	$("#slider"+row).append("<div data-id='"+row+"_"+col+"' id='animate"+row+"_"+col+"' class='animate' onmousedown='clickAnimate(this)'>"+head+main+tail+"</div>");
	edgeWidth = parseInt($(".edge").css("width"));
	clickAnimate(id("animate"+row+"_"+col));
}
//5.选择动画
function clickAnimate(obj){
	animateId = obj.dataset.id;
	$('#main'+animateId).addClass("active").parent().siblings().children().removeClass('active');
	$('#main'+animateId).addClass("active").parent().parent().siblings().children().children().removeClass('active');
}
//6.删除动画
function removeAnimate(){
	$("#animate"+animateId).remove();
}

//移动动画
function change(o,e){
	rightW = parseInt($(".right").css("width"))
	animateId = o.dataset.id;//当前移动的动画id号
	var firstId = $("#animate"+animateId).parent()[0].firstChild.dataset.id;//这个图层的第一个动画 var firstId = $("#slider"+row+">:first")[0].dataset.id;
	var before = 0;
	if(animateId != firstId){//移动的不是第一个动画
		var beforeId = $('#animate'+animateId).prev()[0].dataset.id;//前一个动画的id
		before = id('tail'+beforeId).offsetLeft+edgeWidth;
	}
	var e = e ? e : window.event;
	if(!window.event) {e.preventDefault();}
	var init={
		mainX: o.offsetLeft-before,
		headX: id('head'+animateId).offsetLeft-before,
		tailX: id('tail'+animateId).offsetLeft-before,
		dX: e.clientX-before
	};
	document.onmousemove=function(e){
		var e = e ? e : window.event;
		var dist=e.clientX-init.dX,
			// len=init.mainX + dist,
			l_x=init.headX,
			r_x=init.tailX;
			
		switch (id(o).id){
            case 'head'+animateId:
                l_x=init.headX + dist-before;
                move('l');
                break;
            case 'tail'+animateId:
                r_x=init.tailX + dist-before;
                move('r');
                break;
            case 'main'+animateId:
                l_x=init.headX + dist-before;
                r_x=init.tailX + dist;
                move2();
                break;
            default: break;
		}
		delaytimeQt = l_x/10;
		durationQt = (r_x+edgeWidth-l_x)/10;
		function move(d){
			if(r_x > l_x +6&& l_x>=0  && r_x>0&& r_x < rightW-edgeWidth) {
				id('main'+animateId).style.width=r_x - edgeWidth - l_x + 'px';
				if(d=="l")	{
					id('head'+animateId).style.marginLeft= l_x + "px";
					document.getElementById('v1').innerHTML =delaytimeQt;
				}
				else	{
					document.getElementById('v2').innerHTML =durationQt;
				}
			}
		};
		function move2(){
			if(l_x>=0 && r_x < rightW) {
				id('head'+animateId).style.marginLeft= l_x + "px";
				document.getElementById('v1').innerHTML =delaytimeQt;
				document.getElementById('v2').innerHTML =durationQt;
			}
		};
	}
	document.onmouseup=function(){
		document.onmousemove=null;
		document.onmouseup=null;
	}
}
//设置动画
function setAnimate(delaytime,duration,repeat){//延迟 时长 重复次数
	repeat = repeat+1;
	document.getElementById('v1').innerHTML =delaytime;
	document.getElementById('v2').innerHTML =duration*repeat;
	
	id('main'+animateId).style.width=duration*10*repeat -edgeWidth*2 + 'px';
	id('head'+animateId).style.marginLeft= delaytime*10 + "px";
}
// new QWebChannel(qt.webChannelTransport, function(channel) {
// 	window.bridge = channel.objects.bridge;
// })
// function onShowMsgBox() {
// 	if (bridge) {
// 	  bridge.showMsgBox()
// 	}
// }