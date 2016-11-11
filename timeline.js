// var rightW;
var row = $(".layerBox").children().length;//层
var rowArr = [row];
var col = 0;//动画
var colArr = [0];
var edgeWidth;
var id=function(o){return document.getElementById(o) || o;}
var animateId;
var delaytimeQt;
var durationQt;
var animateIndex;
var layerIndex;
var layerName;

//1.添加图层
var addLayer = function (type,strName){//index row=index
	row = rowArr[rowArr.length-1];
	row++;
	rowArr.push(row);
	var layerHide = '<div class="layerHide"><img src="img/show_1.png" alt=""  id="hide'+row+'" onclick="hideLayer()"/></div>';
	var layerName = '<div class="layerName"><img src="img/'+type+'.png" alt=""><input class="name" id="name'+row+'" value="'+strName+"_" +row+'" placeholder="图层名称" oninput="editLayerName(event)"><img src="img/delete.png" alt="" class="delLayer" id="delLayer'+row+'" onclick="removeLayer()"></div>';
	$(".layerBox").append('<div data-id="'+row+'" class="layer" id="layer'+row+'" onmousedown="clickLayer(this)">'+layerHide+layerName+'</div>');
	$(".sliderBox").append('<div data-id="'+row+'" class="slider" id="slider'+row+'" onmousedown="clickLayer(this)"></div>');
	colArr = [0];
	clickLayer(id('slider'+row));
	// bridge.showMsgBox();
	// bridge.receiveText('aaaa');
}
//3.选择图层 layerIndex
function selectLayer(index){
	clickLayer(id("layer"+index));
}
//选择图层 layerIndex
function clickLayer(objLayer){
	if(objLayer.dataset == undefined)return;
	var layerDataId = objLayer.dataset.id;
	row = layerDataId;
	colArr = [0];
	$("#layer"+row).addClass("active").siblings().removeClass('active');
	$("#slider"+row).addClass("active").siblings().removeClass('active');
	$("#delLayer"+row).css("display","block").parent().parent().siblings().children().children(".delLayer").css("display","none");
	layerIndex = row;
}
//2.删除图层     //layerIndex
function removeLayer(index){
	if(index == undefined){
		index = layerIndex;//页面点击
	}
	id("layer"+index).remove();
	id("slider"+index).remove();
	row = rowArr[rowArr.length-1];
	console.log(layerIndex);
}
//修改图层名 layerIndex layerName
function editLayerName(event) {
	layerName = event.target.value;
	console.log(layerIndex+","+layerName);
}
//隐藏图层 layerIndex bShow
function hideLayer(){
	var hide = $("#hide"+row);
	if(hide[0].src.substr(-5,1) == 1){
		hide.attr("src","img/show_2.png");
		bShow=true;
	}else{
		hide.attr("src","img/show_1.png");
		bShow=false;
	}
	console.log(layerIndex+","+bShow);
}
//4.添加动画
function addAnimate(delaytime,duration,repeat){// col = index;
	if(row==0)return;
	var slider = $("#slider"+row);
	var sliderNum = slider[0].childElementCount;//子集个数
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
	slider.append("<div data-id='"+row+"_"+col+"' id='animate"+row+"_"+col+"' class='animate' onmousedown='clickAnimate(this)'>"+head+main+tail+"</div>");
	edgeWidth = parseInt($(".edge").css("width"));
	clickAnimate(id("animate"+row+"_"+col));
	if(repeat == 0){
		duration = parseInt($(".slider").css("width"))/10 - delaytime;
		repeat = 1;
	}
	document.getElementById('v1').innerHTML =delaytime;
	document.getElementById('v2').innerHTML =duration*repeat;
	id('main'+animateId).style.width=duration*10*repeat -edgeWidth*2 + 'px';
	id('head'+animateId).style.marginLeft= delaytime*10 + "px";
}
//10.选择动画
function selectAnimate(index){
	clickAnimate(id("animate"+row+"_"+index));
}
//选择动画 animateIndex delaytimeQt durationQt
function clickAnimate(objAnimate){
	if(objAnimate.dataset == undefined)return;
	animateId = objAnimate.dataset.id;
	$('#main'+animateId).addClass("active").parent().siblings().children().removeClass('active');
	$('#main'+animateId).addClass("active").parent().parent().siblings().children().children().removeClass('active');
	delaytimeQt = parseInt($('#head'+animateId).css("marginLeft"))/10;
	durationQt = parseInt($('#main'+animateId).css("width"))/10;
	animateIndex = animateId.substr(animateId.indexOf("_")+1);
}
//5.删除动画
function removeAnimate(index){
	if(index == undefined){
		index = animateIndex;//页面点击
	}
	id("animate"+row+"_"+index).remove();
	console.log(animateIndex);
}
//6.7.8设置动画 index 延迟s 时长s 重复次数1
function setAnimate(index,delaytime,duration,repeat){
	if(repeat == 0){
		duration = parseInt($(".slider").css("width"))/10 - delaytime;
		repeat = 1;	
	}
	document.getElementById('v1').innerHTML =delaytime;
	document.getElementById('v2').innerHTML =duration*repeat;
	id('main'+row+"_"+index).style.width=duration*10*repeat -edgeWidth*2 + 'px';
	id('head'+row+"_"+index).style.marginLeft= delaytime*10 + "px";
}
//移动动画 animateIndex delaytimeQt durationQt
function change(o,e){
	var rightW = parseInt($(".right").css("width"))
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
		headX: id('head'+animateId).offsetLeft-before,
		tailX: id('tail'+animateId).offsetLeft-before,
		dX: e.clientX-before
	};
	document.onmousemove=function(e){
		var e = e ? e : window.event;
		var dist=e.clientX-init.dX,
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
		function move(d){
			if(r_x > l_x +6 && l_x>=0 && r_x>0 && r_x < rightW-edgeWidth) {
				id('main'+animateId).style.width=r_x - edgeWidth - l_x + 'px';
				if(d == "l")	{
					id('head'+animateId).style.marginLeft= l_x + "px";
					id('v1').innerHTML =l_x/10;
				}
				id('v2').innerHTML =(r_x+edgeWidth-l_x)/10;
			}
		};
		function move2(){
			if(l_x>=0 && r_x < rightW) {
				id('head'+animateId).style.marginLeft= l_x + "px";
				id('v1').innerHTML =l_x/10;
				id('v2').innerHTML =(r_x+edgeWidth-l_x)/10;	
			}
		};
		delaytimeQt = l_x/10;
		durationQt = (r_x+edgeWidth-l_x)/10;
		// console.log(animateIndex)
	}
	document.onmouseup=function(){
		document.onmousemove=null;
		document.onmouseup=null;
	}
}
//11.清空
function clearCG(){
	$(".layerBox").children().remove();
	$(".sliderBox").children().remove();
}
// new QWebChannel(qt.webChannelTransport, function(channel) {
// 	window.bridge = channel.objects.bridge;
// })
// function onShowMsgBox() {
// 	if (bridge) {
// 	  bridge.showMsgBox()
// 	}
// }