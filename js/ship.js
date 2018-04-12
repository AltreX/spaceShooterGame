class Ship {
	constructor(x, y, size, speed = 3){
		this.position = createVector(x, y);
		this.size = size;
		this.moving = createVector(0, 0);
		this.firing = 0;
		this.life = 100;
		this.speed = speed;
		this.bulletType = 0;
		this.bullets = [];
		this.isDead = false;
		this.tempoBullet = 0;
		this.cannonPos = createVector(0, 0);
		this.cannonLength = floor(this.size - 6);
	}

	keyEvent(keyCode, value) {
		switch(keyCode) {
			case UP_ARROW:
			case Z:
				this.moving.y -= value;
				break;
			case DOWN_ARROW:
			case S:
				this.moving.y += value;
				break;
			case LEFT_ARROW:
			case Q:
				this.moving.x -= value;
				break;
			case RIGHT_ARROW:
			case D:
				this.moving.x += value;
				break;
			case SPACEBAR:
				this.firing += value;
				break;
			case WEAP0:
				this.bulletType = 0;
				break;
			case WEAP1:
				this.bulletType = 1;
				break;
			case WEAP2:
				this.bulletType = 2;
				break;
			case WEAP3:
				this.bulletType = 3;
				break;
		}
	}

	update(){
		this.move();
		let direction = createVector(mouseX, mouseY);
		let angle = atan2(direction.y-this.position.y, direction.x-this.position.x) - HALF_PI;
		this.cannonPos.x = this.position.x - this.cannonLength * sin(angle);
		this.cannonPos.y = this.position.y + this.cannonLength * cos(angle);
	}

	move(){
		let limiter = createVector(0, 0)
		limiter.x += this.position.x - floor(this.size) >= 0 ? 0 : this.speed;
		limiter.x += this.position.x + floor(this.size) <= width ? 0 : -this.speed;
		limiter.y += this.position.y - floor(this.size) >= 0 ? 0 : this.speed;
		limiter.y += this.position.y + floor(this.size) <= height ? 0 : -this.speed;
		this.position.add(limiter);
		this.position.add(this.moving);
	}

	updateBullets() {
		if (this.firing && this.tempoBullet <= 0) {
			switch(abs(this.bulletType)) {
				case 0:
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y));
					break;
				case 1:
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, 1));
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, 2));
					break;
				case 2:
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, 0));
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, 1));
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, 2));
					break;
				case 3:
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, 0));
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, 1));
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, 2));
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, 3));
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, 4));
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
		noStroke();
		ellipseMode(CENTER);
		fill(120, 0, 30);
		ellipse(this.position.x,this.position.y, this.size * 2);
		fill(255);
		ellipse(this.cannonPos.x, this.cannonPos.y, 16);
	}
}