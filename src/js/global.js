var game = {			
	lv: 0,
	time: 60,
	score: 0,
	isPause: false,
	isGameOver: false,	
	start: function(){
		this.next();
		$(".guide, .mask").hide();
		$(".game").show();
		$(".mask").empty();
		this.timeLimit();
	},
	next: function(){
		this.lv++;
		this.renderMisson(this.lv);
	},
	togglePause: function(){
		this.isPause = !this.isPause;		
	},
	renderMisson: function(curLv){
		var e = curLv+1;
		var j = 6,k=16,m=34,n=61;
		var lvClass = curLv > 5 ? 5 : curLv;
		var num = curLv > 5 ? 36 : e*e;
		var random = Math.floor(Math.random() * num);
		var box = "",html="";			
		for(var i=0;i<num;i++){
			box += '<span></span>';
		}
		$(".misson-num").html(curLv);		
		$(".inbox").removeClass().addClass('inbox lv'+lvClass).empty().append(box);
		var span = $(".inbox").find('span');
		var n = span.length;
		var b = span.data("type", "b"),
			a = span.eq(random).data("type", "a");
		var imgUrl = "src/img/icon/";
		function changeImg(url,imgArr){
			console.log(imgArr);
			b.html('<img src="'+url+'i'+imgArr[0]+'.png">');
			a.html('<img src="'+url+'i'+imgArr[1]+'.png">');
		}
		if(curLv<2){
			changeImg(imgUrl,['012','011']);
		}else if(curLv<6){
			changeImg(imgUrl,['012','011']);
			this.score = this.score + 2;
		}else if(curLv<11){
			changeImg(imgUrl,['012','011']);
			this.score = this.score + 3;
		}else if(curLv<16){
			changeImg(imgUrl,['022','021']);
			this.score = this.score + 4;
		}else if(curLv<21){
			changeImg(imgUrl,['022','021']);
			this.score = this.score + 5;
		}else if(curLv<26){
			changeImg(imgUrl,['032','031']);
			this.score = this.score + 6;
		}else if(curLv<36){
			j = j+1;
			changeImg(imgUrl,['032','031']);
			this.score = this.score + 6 + j;
		}else if(curLv<46){
			k = k+2;
			changeImg(imgUrl,['042','041']);
			this.score = this.score + 6 + k;
		}else if(curLv<56){
			m = m+3;
			changeImg(imgUrl,['042','041']);
			this.score = this.score + 6 + m;
		}else if(curLv<66){
			n = n+4;
			changeImg(imgUrl,['052','051']);
			this.score = this.score + 6 + n;
		}else{
			changeImg(imgUrl,['052','051']);
			this.score = this.score + 97;
		}
		$(".score-num").html(this.score);
		span.on('click',function(){
			if($(this).data("type")=="a"){
				game.next();
			}else{
				game.isGameOver = true;
				game.gameOver();
			}
		});
	},
	timeLimit: function(){
		var time = this.time;
		var timeTips = "";
		var percent;
		var action = setInterval(function(){
			time--;					
			percent = (1-(time/60))*100+"%";
			$(".progress-bar i").css("width",percent);
			if(time<1){
				game.isGameOver = true;
				game.gameOver();
				clearTimeout(action);
			}
		},1000);
	},
	gameOver: function(){
		var percent = Math.floor((this.lv/66)*100)+'%';		
		var gameOverTips = '<div class="alert-pop status-gameover">'+
						   '<div class="alert-title"></div>'+
						   '<div class="alert-text">'+
						   '<span class="last-mission">'+this.lv+'</span>'+
						   '<span class="last-score">'+this.score+'</span>'+
						   '<span class="last-percent">'+percent+'</span>'+
						   '</div><div class="alert-btn">'+
						   '<a href="javascript:;" onclick="game.start()" class="btn-again">再来一次</a>'+
						   '<a href="javascript:;" class="btn-invite">邀请好友</a>'+
						   '</div></div>';		
		this.lv = this.score = 0;
		if(this.isGameOver){
			method.alertAppend(gameOverTips);
		}		
	}				
},
method = {
	alertAppend: function(html){
		$(".mask").show().empty().append(html);
	},
	doTab: function(tabBtn,tabBox){
		$(tabBtn).on("click",function(){
			var cur = $(this).index();
			$(this).addClass('hover').siblings('a').removeClass('hover');
			$(tabBox).eq(cur).show().siblings(tabBox).hide();
		});
	},
	showMore: function(){
		var moreHtml = '<div class="alert-more">'+
					   '<a href="/" class="link-home">主页</a>'+
			           '<a href="" class="link-refresh">刷新</a>'+
			           '<a href="/sign-in.html" class="link-sign">签到</a>'+
		               '</div>';
		this.alertAppend(moreHtml);
	},
	prizePop: function(){
		var status = false;
		var successHtml = '<div class="alert-pop status-success">'+
						  '<div class="alert-title"></div>'+
						  '<div class="alert-text"></div>'+
						  '<div class="alert-btn">'+
						  '<a href="" class="btn-confirm">确定</a>'+
						  '</div></div>';
		var failHtml = '<div class="alert-pop status-fail">'+
					   '<div class="alert-title"></div>'+
					   '<div class="alert-text"></div>'+
					   '<div class="alert-btn">'+
					   '<a href="" class="btn-confirm">确定</a>'+
					   '<a href="" class="btn-login">重新登陆</a>'+
					   '</div></div>';
		if(status){
			this.alertAppend(successHtml);
		}else{
			this.alertAppend(failHtml);
		}
	}
};
!function(){
	$(".mask").hide().empty();
	$('.btn-more').on('click',function(){
		method.showMore();
	});
	$(".btn-prize").on('click',function(){
		method.prizePop();
	});
}();