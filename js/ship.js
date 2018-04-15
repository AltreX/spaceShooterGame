class Ship {
	constructor(x, y, width, height, speed = 3){
		this.position = createVector(x, y);
		this.width = width;
		this.height = height;
		this.moving = createVector(0, 0);
		this.firing = 0;
		this.life = 100;
		this.speed = speed;
		this.bulletType = 0;
		this.bullets = [];
		this.isDead = false;
		this.tempoBullet = 0;
		this.cannonPos = createVector(0, 0);
		this.cannonLength = floor(this.height / 2);
		this.angle = 0;
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
		this.angle = atan2(direction.y-this.position.y, direction.x-this.position.x) - HALF_PI;
		this.cannonPos.x = this.position.x - this.cannonLength * sin(this.angle);
		this.cannonPos.y = this.position.y + this.cannonLength * cos(this.angle);
	}

	move(){
		let limiter = createVector(0, 0)
		limiter.x += this.position.x - floor(this.width) >= 0 ? 0 : this.speed;
		limiter.x += this.position.x + floor(this.width) <= width ? 0 : -this.speed;
		limiter.y += this.position.y - floor(this.height) >= 0 ? 0 : this.speed;
		limiter.y += this.position.y + floor(this.height) <= height ? 0 : -this.speed;
		this.position.add(limiter);
		this.position.add(this.moving);
	}

	updateBullets() {
		if (this.firing && this.tempoBullet <= 0) {
			switch(abs(this.bulletType)) {
				case 0:
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, mouseX, mouseY));
					break;
				case 1:
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, mouseX, mouseY, 1));
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, mouseX, mouseY, 2));
					break;
				case 2:
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, mouseX, mouseY, 0));
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, mouseX, mouseY, 1));
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, mouseX, mouseY, 2));
					break;
				case 3:
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, mouseX, mouseY, 0));
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, mouseX, mouseY, 1));
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, mouseX, mouseY, 2));
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, mouseX, mouseY, 3));
					this.bullets.push(new Bullet(this.cannonPos.x, this.cannonPos.y, mouseX, mouseY, 4));
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
		imageMode(CENTER);
		push();
		translate(this.position.x, this.position.y);
		rotate(this.angle - PI);
		image(shipTexture, 0, 0, 50, 50);
		pop();
	}
}
