class Bullet {
	constructor(x, y, dirX, dirY, type = 0,speed = 8, size = 6, damage = 10){
		this.position = createVector(x, y);
		this.origin = createVector(x, y);
		this.direction = createVector(dirX, dirY);
		this.angle = atan2(this.direction.y-this.position.y, this.direction.x-this.position.x) - HALF_PI;
		this.damage = damage;
		this.speed = speed;
		this.size = size;
		this.toDelete = false;
		this.type = type;
	}

	update(){
		let distance = this.origin.dist(this.position) + this.speed;
		if (this.position.x < 0 || this.position.x > width || this.position.y < 0 || this.position.y > height){
			this.toDelete = true;
		}
		switch(this.type) {
			case 0:
				this.position.x = this.origin.x - distance * sin(this.angle);
				this.position.y = this.origin.y + distance * cos(this.angle);
				break;
			case 1:
				this.position.x = this.origin.x - distance * sin(this.angle - PI / 64);
				this.position.y = this.origin.y + distance * cos(this.angle - PI / 64);
				break;
			case 2:
				this.position.x = this.origin.x - distance * sin(this.angle + PI / 64);
				this.position.y = this.origin.y + distance * cos(this.angle + PI / 64);
				break;
			case 3:
				this.position.x = this.origin.x - distance * sin(this.angle - PI / 32);
				this.position.y = this.origin.y + distance * cos(this.angle - PI / 32);
				break;
			case 4:
				this.position.x = this.origin.x - distance * sin(this.angle + PI / 32);
				this.position.y = this.origin.y + distance * cos(this.angle + PI / 32);
				break;
		}
	}

	show(){
		noStroke();
		ellipseMode(CENTER);
		ellipse(this.position.x, this.position.y, this.size * 2, this.size * 2);
	}
}