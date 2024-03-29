/*
* @Author: YOYO
* @Date:   2018-07-13 11:16:38
* @Lscript: 用户的一些操作
*/
var Local = function () {
	// 游戏对象
	var game;
	var timer = null;
	// 时间计时器
	var timeCount = 0;
	var time = 0
	// 绑定键盘事件
	var bindKeyEvent = function () {
		document.onkeydown = function (e) {
			if (e.keyCode == 38) { // up
        game.rotate();
			} else if (e.keyCode == 39) { // right
				game.right();
			} else if (e.keyCode == 40) { // down
        game.down();
			} else if (e.keyCode == 37) { // left
        game.left();
			} else if (e.keyCode == 32) { // space
        game.fall();
			}
		}
	}
	// 移动
	var move = function () {
		timeFunc()
		if (!game.down()){
			game.fixed();
			var line = game.checkClear();
			if (line) {
				game.addScore(line)
			}
			var gameOver = game.checkGameOver();
			if (gameOver) {
				game.gameOver(false);
				stop();
			} else {
				game.performNext(generateType(), generateDir());
			}
		};
	}
	// 计时开始
	var timeFunc = function () {
		timeCount += 1
		if (timeCount == 5) {	
			timeCount = 0
			time += 1
			game.setTime(time)
		}
	}
	// 随机生成一个方块类型
	var generateType = function () {
		return Math.floor(Math.random() * 7)
	}
	// 随机生成一个旋转次数
	var generateDir = function () {
		return Math.floor(Math.random() * 4)
	}
	// 开始
	var start = function () {
		var doms = {
			gameDiv: document.getElementById('game'),
			nextDiv: document.getElementById('next'),
			timeDiv: document.getElementById('time'),
			scoreDiv: document.getElementById('score'),
			gameOver: document.getElementById('gameOver')
		}
		game = new Game();
		game.init(doms, generateType(), generateDir());
		bindKeyEvent();
		game.performNext(generateType(), generateDir());
		timer = setInterval(move, 200);
	}
	var stop = function () {
		if (timer) {
			clearInterval(timer);
			timer = null;
			document.onkeydown = null;
		}
	}
	// 导出API
	this.start = start;
}