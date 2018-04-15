class Monster {
	constructor(x, y, width, height){
		this.position = createVector(x, y);
		this.width = width;
		this.height = height;
		this.life = 100;
		this.isDead = false;
		this.bullets = []
		this.bulletType = 0;
	}

	update() {

	}

	updateBullets() {
		if (this.firing && this.tempoBullet <= 0) {
			switch(abs(this.bulletType)) {
				case 0:
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y));
					break;
			}
			this.tempoBullet = 10;
		}
		this.bullets = this.bullets.filter(bullet => !bullet.toDelete);
		for(let bullet of this.bullets){
			bullet.update();
		}
		this.tempoBullet --;
	}

	show(){
		ellipseMode(CENTER);
		fill(map(this.life, 0, 100, 255, 0), map(this.life, 0, 100, 0, 255), 60);
		ellipse(this.position.x, this.position.y, this.width, this.height);
	}
}
