var ship;
var monsters = [];
var tempoBullet;
var shipTexture;
var score = 0;
var monsterCooldown = 200;

function preload() {
		loadImage('ship.png', image => shipTexture = image);
}

function setup() {
	createCanvas(800,500);
	background(0);
	ship = new Ship(floor(width / 2), 360, 25, 25);
	setInterval(createMonsters, 10);
	setInterval(() => ship.update(), 10);
	setInterval(() => ship.updateBullets(), 20);
	setInterval(updateMonsters, 20);
	setInterval(updateMonstersBullets, 20);
	setInterval(bulletMonsterIntersect, 20);
	setInterval(bulletShipIntersect, 20);
	textSize(18);
}

function draw() {
	background(0);
	let monsterCount = 0;
	for(let monster of monsters){
		monster.show();
		for(let bullet of monster.bullets) {
			fill(20,75,200);
			bullet.show();
		}
		monster.isDead ? 0 : monsterCount++;
	}

	ship.show();
	for(let bullet of ship.bullets){
			fill(200,75,20);
			bullet.show();
	}
	fill(255);
	text('Weapon : ' + (ship.bulletType + 1), 5, 20);
	text('life : ' + ship.life, 5, 40);
	text('Monsters : ' + monsterCount, 5, 60);
	text('Score : ' + score, 5, 80);

	if (ship.isDead) {
		background(0);
		textAlign(CENTER);
		textSize(32);
		text('GAME OVER', 400, 100);
		text('Score : ' + score, 400, 200);
		noLoop();
	}
}

function updateMonsters() {
	for(let monster of monsters) {
			monster.update();
	}
}

function updateMonstersBullets() {
	for(let monster of monsters) {
		monster.updateBullets();
	}
}

function bulletMonsterIntersect() {
	for(let bullet of ship.bullets){
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
				if (!monster.scored) {
					score += 50;
					monster.scored = true;
				}
			}
		}
	}
	this.monsters = this.monsters.filter(monster => !monster.isDead || monster.bullets.length > 0);
}

function bulletShipIntersect() {
	for(let monster of monsters) {
		for(let bullet of monster.bullets){
			if(bullet.toDelete){
				continue;
			}
			if(bullet.position.dist(ship.position) < bullet.size + ship.width && ship.isDead === false){
				ship.life -= bullet.damage;
				bullet.toDelete = true;
			}
			if(ship.life <= 0){
				ship.isDead = true;
			}
		}
	}
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
	if(monsterCooldown <= 0){
		monsters.push(new Monster(random(width), random(height - 50), 20, 30));
		monsterCooldown = map(score, 0, 3000, 200, 10, true);
	}
	monsterCooldown--;
}
