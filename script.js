var canvas = document.getElementById('stage');
var stage = canvas.getContext('2d');


// stage.fillRect(0,0,400,180)

function circle(x,y, size, color) {
    stage.fillStyle = color
    stage.beginPath()
    stage.arc(x, y, size, 0, Math.PI*2, true);
    stage.fill();
}

function deg(n) {
    return n*(180/Math.PI)
}

function rad(n) {
    return n*(Math.PI/180)
}

function atan(n) { // 角度を°で返す
    return deg(Math.atan(n));
}

function sin(n) {
    return Math.sin(rad(n));
}

function cos(n) {
    return Math.cos(rad(n));
}

class Mallet {
    constructor(x, y, color, name) {
        this.x = x;
        this.y = y;
        this.size = 50;
        this.color = color;
        this.name = name;
        this.speed = [0,0]
        this.shot = [0,0]
        this.ball = [1000,500]
    }

    move() {
        Math.abs(this.speed[0]) <= 10 ? this.x += this.speed[0] : this.x = this.x
        Math.abs(this.speed[1]) <= 10 ? this.y += this.speed[1] : this.y = this.y
    }

    set() {
        this.ball = [ball.x, ball.y];
    }

    program() {
        this.shot = [(Math.random()-0.5)*20, (Math.random()-0.5)*20];
        if (Math.abs(this.y - this.ball[1]) > 70) {
            if (this.y > this.ball[1]) {
                this.speed[1] = -10
            } else {
                this.speed[1] = 10
            }
        }
        if (Math.random() < 0.1) {
            this.speed[0] = (Math.random()-5)*10
        }
    }
}


class Ball {
    constructor() {
        this.x = 1000;
        this.y = 500;
        this.size = 20;
        this.speed = [Math.random()*20-10,Math.random()*20-10]
        this.color = "#8b826a"
        this.e = 5
    }

    hit(obj) {
        this.speed = obj.shot
    }

    rightWin() {
        alert("right win");
        this.speed = [Math.random() < 0.5 ? -10 : 10, Math.random() < 0.5 ? -10:10]
        this.x = 1000;
        this.y = 500;
    }

    leftWin() {
        alert("left win");
        this.speed = [Math.random()*10-5, Math.random()*10-5]
        this.x = 1000;
        this.y = 500;
    }

    update() {
        this.x += this.speed[0]
        this.y += this.speed[1]
        if (this.x < 20) {
            // 右端
            if (400 < this.y && this.y < 600) {
                this.rightWin();
            } else {
                this.speed[0] *= -1;
            }
        }
        if (this.x > 1980) {
            // 左端
            if (400 < this.y && this.y < 600) {
                this.leftWin();
            } else {
                this.speed[0] *= -1;
            }
        }
        if (this.y < 20 || this.y > 980) {
            // 上下
            this.speed[1] *= -1;
        }
    }
}

var left = new Mallet(300, 500, "#97c6bc", "left")
var right = new Mallet(1700, 500, "#c697bf", "right")
var ball = new Ball()

function touch(a, b) {
    return Math.abs(a.x - b.x)**2 + Math.abs(a.y - b.y)** 2 < 4900 // 75**2
}

function turn() {
    // 初期化
    stage.clearRect(0, 0, 2000, 1000);
    left.set()
    right.set()
    // 処理
    left.program()
    right.program()
    // 移動
    left.move()
    right.move()
    ball.update()
    // 位置確認
    left.x < 0 ? left.x = 0 : left.x > 1000 ? left.x = 1000 : left.x = left.x
    left.y < 0 ? left.y = 0 : left.y > 1000 ? left.y = 1000 : left.y = left.y
    right.x < 1000 ? right.x = 1000 : right.x > 2000 ? right.x = 2000 : right.x = right.x
    right.y < 0 ? right.y = 0 : right.y > 1000 ? right.y = 1000 : right.y = right.y
    // 描画
    circle(left.x, left.y, left.size, left.color)
    circle(right.x, right.y, right.size, right.color)
    circle(ball.x, ball.y, ball.size, ball.color)
    // 当たり判定
    if (touch(left, ball)) {
        ball.hit(left)
    }
    if (touch(right, ball)) {
        ball.hit(right)
    }
}

document.onmousemove = position;
 function position(e) {
    right.x = e.pageX;
    right.y = e.pageY;
 }

setInterval(turn,1);