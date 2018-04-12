var ship;
var monsters = [];
var tempoBullet;

function setup() {
	createCanvas(800,500);
	background(0);

	ship = new Ship(floor(width / 2), 360, 20);
	setInterval(createMonsters, 2000);
	setInterval(() => ship.update(), 10);
	setInterval(updateMonsters, 20);
	setInterval(updateBullets, 20);
	setInterval(bulletMonsterIntersect, 20);
	textSize(18);
}

function draw() {
	background(0);
	for(let monster of monsters){
		monster.show();
	}

	ship.show();
	for(let bullet of ship.bullets){
			bullet.show();
	}
	fill(255);
	text('Weapon : ' + (ship.bulletType + 1), 5, 20);
	text('life : ' + ship.life, 5, 40);
	text('Monsters : ' + monsters.length, 5, 60);
}

function updateBullets() {
	ship.updateBullets();
}

function updateMonsters() {
	for(let monster of monsters) {
			monster.update();
	}
}

function bulletMonsterIntersect() {
	for (bullet of ship.bullets){
		for(monster of monsters) {
			if(bullet.toDelete){
				continue;
			}
			if(bullet.position.dist(monster.position) < bullet.size + monster.width && monster.isDead === false){
				monster.life -= bullet.damage;
				bullet.toDelete = true;
			}
			if(monster.life <= 0){
				monster.isDead = true;
			}
		}
	}
	this.monsters = this.monsters.filter(monster => !monster.isDead);
}

function keyPressed(e) {
	if(keyBindings.filter(x => x == keyCode).length) {
		e.preventDefault();
	}
	ship.keyEvent(keyCode, ship.speed);
}

function keyReleased() {
	ship.keyEvent(keyCode, -ship.speed);
}

function mousePressed() {
	ship.keyEvent(SPACEBAR, ship.speed);
}

function mouseReleased() {
	ship.keyEvent(SPACEBAR, -ship.speed);
}

function mouseWheel(e) {
	if(ship.bulletType === 0){
		ship.bulletType = NUM_BULLET_TYPES;
	}
	ship.bulletType += e.delta < 0 ? -1 : 1;
	ship.bulletType %= NUM_BULLET_TYPES;
}

function createMonsters() {
	monsters.push(new Monster(random(width), random(height - 50), 20, 30));
}