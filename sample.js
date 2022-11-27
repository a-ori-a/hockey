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
