function Main () {
	this.transverse = {
		0 : document.getElementsByClassName('one')[0].children[0].children,
		1 : document.getElementsByClassName('two')[0].children[0].children,
		2 : document.getElementsByClassName('three')[0].children[0].children,
		3 : document.getElementsByClassName('four')[0].children[0].children
	}; // 横向
	this.longitudinally = {
		0 : [this.transverse[0][0], this.transverse[1][0], this.transverse[2][0], this.transverse[3][0]],
		1 : [this.transverse[0][1], this.transverse[1][1], this.transverse[2][1], this.transverse[3][1]],
		2 : [this.transverse[0][2], this.transverse[1][2], this.transverse[2][2], this.transverse[3][2]],
		3 : [this.transverse[0][3], this.transverse[1][3], this.transverse[2][3], this.transverse[3][3]]
	}; // 纵向
	this.T_innerText = {
		0 : [],
		1 : [],
		2 : [],
		3 : []
	};
	this.L_innerText = {
		0 : [],
		1 : [],
		2 : [],
		3 : []
	};
	this.mark = 0;
	this.boolean_2048 = true;
	this.gameover = document.getElementsByClassName('gameover')[0];
	this.random(2);
	this.init();
	this.keydown();
}
// 取出横向纵向数字排列
Main.prototype.init = function () {
	for (var prop in this.transverse) {
		for (var i = 0; i < 4; i ++) {
			this.T_innerText[prop][i] = this.transverse[prop][i].innerText;
		}
	}
	for (var prop in this.longitudinally) {
		for (var i = 0; i < 4; i ++) {
			this.L_innerText[prop][i] = this.longitudinally[prop][i].innerText;
		}
	}
}
// 随机生成数字
Main.prototype.random = function (num) {
	for (var i  = 0; i < num; i ++) {
		var random1 = Math.floor(Math.random() * 4);
		var random2 = Math.floor(Math.random() * 4);
		if (this.transverse[random1][random2].className) {
			i --;
		} else {
			var probability = Math.random();
			if (probability > 0.7) {
				this.transverse[random1][random2].className = 'num4';
				this.transverse[random1][random2].innerText = '4';
			}else {
				this.transverse[random1][random2].className = 'num2';
				this.transverse[random1][random2].innerText = '2';
			}
		}
	}
}
// 键盘事件绑定
Main.prototype.keydown = function () {
	var that = this;
	document.addEventListener('keydown', keydown_fun, false);
	function keydown_fun (e) {
		var keyCode = e.keyCode;
		var obj = {};
		var newobj = {};
		var name;
		var reverse = false;
		if (keyCode == 37) {
			obj = that.T_innerText;
			name = 'transverse';
		}else if (keyCode == 38) {
			obj = that.L_innerText;
			name = 'longitudinally';
		}else if (keyCode == 39) {
			for (var i = 0; i < 4; i ++) {
				obj[i] = that.T_innerText[i].reverse();
			}
			name = 'transverse';
			reverse = true;
		}else if (keyCode == 40) {
			for (var i = 0; i < 4; i ++) {
				obj[i] = that.L_innerText[i].reverse();
			}
			name = 'longitudinally';
			reverse = true;
		}else {
			return false;
		}
		for (var i = 0; i < 4; i ++) {
			newobj[i] = that.newarr(obj[i], reverse);
			for (var j = 0; j < 4; j ++) {
				if (newobj[i][j] == '2048' && that.boolean_2048) {
					that.boolean_2048 = false;
				}
			}
		}
		if (newobj[0][4] && newobj[1][4] && newobj[2][4] && newobj[3][4]) {
			that.init();
			return false;
		}
		that.move(newobj, name);
		if (!that.boolean_2048 && that.gameover.children[0].innerText == '') {
			that.win();
		}
	}
}
// 新格局的innertext
Main.prototype.newarr = function (arr, boolean) {
	var newarr = [];
	var firstarr = [];
	for (var i = 0; i < 4; i ++) {
		newarr[i] = arr[i];
		firstarr[i] = arr[i];
	}
	for (var i = 0; i < 4; i ++) {
		if (newarr[i] == '') {
			newarr.splice(i, 1);
			i --;
		}
	}
	if (newarr.length == 1) {
		newarr.push('', '', '');
	} else if (newarr.length == 2) {
		if (newarr[0] == newarr[1]) {
			newarr[0] = String(Number(newarr[0]) * 2);
			this.mark = this.mark + Number(newarr[0]);
			newarr[1] = '';
		}
		newarr.push('', '');
	} else if (newarr.length == 3) {
		if (newarr[0] == newarr[1]) {
			newarr[0] = String(Number(newarr[0]) * 2);
			this.mark = this.mark + Number(newarr[0]);
			newarr[1] = newarr[2];
			newarr[2] = '';
		} else if (newarr[1] == newarr[2]) {
			newarr[1] = String(Number(newarr[1]) * 2);
			this.mark = this.mark + Number(newarr[1]);
			newarr[2] = '';
		}
		newarr.push('');
	} else if (newarr.length == 4) {
		if (newarr[0] == newarr[1]) {
			newarr[0] = String(Number(newarr[0]) * 2);
			this.mark = this.mark + Number(newarr[0]);
			if (newarr[2] == newarr[3]) {
				newarr[1] = String(Number(newarr[2]) * 2);
				this.mark = this.mark + Number(newarr[1]);
				newarr[2] = '';
				newarr[3] = '';
			} else {
				newarr[1] = newarr[2];
				newarr[2] = newarr[3];
				newarr[3] = '';
			}
		} else if (newarr[1] == newarr[2]) {
			newarr[1] = String(Number(newarr[1]) * 2);
			this.mark = this.mark + Number(newarr[1]);
			newarr[2] = newarr[3];
			newarr[3] = '';
		} else if (newarr[2] == newarr[3]) {
			newarr[2] = String(Number(newarr[2]) * 2);
			this.mark = this.mark + Number(newarr[2]);
			newarr[3] = '';
		}
	} else {
		newarr.push('', '', '', '');
	}
	if (String(firstarr) == String(newarr)) {
		newarr.push(true);
	}
	if (boolean) {
		if (newarr[4]) {
			newarr.splice(4, 1);
			newarr.reverse();
			newarr.push(true);
		} else {
			newarr.reverse();
		}
	}
	return newarr;
}
// 渲染新格局
Main.prototype.move = function (arr, key) {
	var span = document.getElementsByClassName('now')[0].children[0];
	span.innerText = this.mark;
	for (var prop in this.transverse) {
		for (var i = 0; i < 4; i ++) {
			this.transverse[prop][i].className = '';
		}
	}
	for (var prop in this[key]) {
		for (var i = 0; i < 4; i ++) {
			this[key][prop][i].innerText = arr[prop][i];
			if (arr[prop][i] !== '') {
				this[key][prop][i].className = 'num' + this[key][prop][i].innerText;
			}
		}
	}
	this.random(1);
	this.init();
	this.gameover_fun();
}
// gameover
Main.prototype.gameover_fun = function () {
	var obj = this.T_innerText;
	for (var i = 0; i < 4; i ++) {
		for (var j = 0; j < 4; j ++) {
			if (obj[i][j] == '') {
				return false;
			}
		}
	}
	var newobj = {};
	var boolean_t, boolean_l;
	var mark = this.mark;
	var opacity = document.getElementsByClassName('opacity')[0];
	//  横向
	for (var i = 0; i < 4; i ++) {
		newobj[i] = this.newarr(obj[i], false);
	}
	if (newobj[0][4] && newobj[1][4] && newobj[2][4] && newobj[3][4]) {
		boolean_t = true;
	}
	// 纵向
	obj = this.L_innerText;
	for (var i = 0; i < 4; i ++) {
		newobj[i] = this.newarr(obj[i], false);
	}
	if (newobj[0][4] && newobj[1][4] && newobj[2][4] && newobj[3][4]) {
		boolean_l = true;
	}
	// 判断游戏结束
	if (boolean_t && boolean_l) {
		setTimeout(function () {
			opacity.style.opacity = '0.5';
			this.gameover.style.display = 'block';
			this.gameover.children[0].innerText = '游戏结束!';
			this.gameover.children[1].innerText = '再试一次';
		}, 300)
	} else {
		this.mark = mark;
	}
}
// new game
Main.prototype.again = function () {
	var mark = document.getElementsByClassName('now')[0].children[0];
	mark.innerText = 0;
	this.mark = 0;
	this.boolean_2048 = true;
	this.gameover.children[0].innerText = '';
	for (var i = 0; i < 4; i ++) {
		for (var j = 0; j < 4; j ++) {
			this.transverse[i][j].innerText = '';
			this.transverse[i][j].className = '';
		}
	}
	this.random(2);
	this.init();
}
// win game
Main.prototype.win = function () {
	var that = this;
	var opacity = document.getElementsByClassName('opacity')[0];
	setTimeout(function () {
		opacity.style.opacity = '0.5';
		that.gameover.style.display = 'block';
		that.gameover.children[0].innerText = '你赢了!';
		that.gameover.children[1].innerText = '继续游戏';
	}, 300)
}
var main = new Main();