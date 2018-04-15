class Monster {
	constructor(x, y, width, height){
		this.position = createVector(x, y);
		this.width = width;
		this.height = height;
		this.life = 100;
		this.isDead = false;
		this.bullets = []
		this.bulletType = 0;
		this.tempoBullet = 100;
		this.scored = false;
	}

	update() {

	}

	updateBullets() {
		if (!this.isDead && this.tempoBullet <= 0) {
			switch(abs(this.bulletType)) {
				case 0:
					this.bullets.push(new Bullet(this.position.x, this.position.y, ship.position.x, ship.position.y, 0, 4, 4, 1));
					break;
			}
			this.tempoBullet = 50;
		}
		this.bullets = this.bullets.filter(bullet => !bullet.toDelete);
		for(let bullet of this.bullets){
			bullet.update();
		}
		this.tempoBullet --;
	}

	show(){
		if(!this.isDead){
			ellipseMode(CENTER);
			fill(map(this.life, 0, 100, 255, 0), map(this.life, 0, 100, 0, 255), 60);
			ellipse(this.position.x, this.position.y, this.width, this.height);
		}
	}
}
