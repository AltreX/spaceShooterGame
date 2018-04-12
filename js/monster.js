class Monster {
	constructor(x, y, width, height){
		this.position = createVector(x, y);
		this.width = width;
		this.height = height;
		this.life = 100;
		this.isDead = false;
	}

	update(){

	}

	show(){
		ellipseMode(CENTER);
		fill(map(this.life, 0, 100, 255, 0), map(this.life, 0, 100, 0, 255), 60);
		ellipse(this.position.x, this.position.y, this.width, this.height);
	}
}