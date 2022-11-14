var pesawat = new Image();
var laser = new Image();
var asteroid = new Image();
pesawat.src = 'pesawat.png';
laser.src = 'laser.png';
asteroid.src = 'asteroid.png';
console.log(asteroid);
var alienHit = 0;
var prompt;
var start = false;


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var jumlahPeluru = 1;
var jumlahAsteroid = 10;
var count = 0;
var shoot = false;

window.addEventListener('keydown', function () {
    canvas.key = event.keyCode;
    if (canvas.key === 32) {
        canvas.key = event.keyCode;
        shoot = true;
    }
})


window.addEventListener('keyup', function () {
    canvas.key = false;
})

function startGame() {
    var input = prompt("Mulai Permainan: Y/T ")
    if (input === "y" || input === "y") {
        start = true;
    }
    animate();
}

function sound(src) {
    this.sound = document.getElementById('music');
    this.sound.src = src;
    this.sound.setAttribute('preload', 'auto');
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

function Component(img, x, y, width, height, isBullet, isShip, isComet, color, dx, dy) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.dx = dx;
    this.radius = 20;
    this.dy = dy;

    this.draw = function () {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    this.collisionShipStars = function () {
        if ((this.x) < (ship.x + ship.width) && (this.x) > ship.x &&
            (this.y) < (ship.y + ship.height) && (this.y) > (ship.y)) {
            console.log('hit by alien')
            ctx.font = "30px Arial";
            ctx.fillStyle = "#ffffff"
            ctx.fillText("Permainan Selesai!", innerWidth / 2, innerHeight / 2);
            playAgain("play Again? Y/N");
        }
    }
    this.collision = function () {
        if ((this.x) < (bullet.x + bullet.width) && (this.x) > bullet.x &&
            (this.y) < bullet.y + bullet.height && (this.y) > bullet.y) {
            console.log('alien hit');
            alienHit += 1;
            console.log(alienHit);
            this.width = 0;
            this.x = 0;
            this.y = 0;
            this.dx = 0;
            this.dy = 0;
            this.height = 0;
            console.log(this.width, this.height, this.x, this.y, this.dx, this.dy);


        }
        if (alienHit >= jumlahAsteroid) {
            ctx.font = "30px Arial";
            ctx.fillStyle = "#ffffff"
            ctx.fillText("Kamu Menang!", innerWidth / 2, innerHeight / 2);
        }

    }
    this.update = function () {
        if (isBullet) {

            if (canvas.key && canvas.key === 32) {
                soundBullet.play();
                bullet.y = ship.y;
                bullet.x = ship.x;
            }
            bullet.y -= 20;

            this.draw();
        }

        else if (isShip) {
            if (this.x >= innerWidth - this.width - 5 || this.x <= 0) {
                this.x = -this.x
            }
            if (this.y >= innerHeight - this.height - 5 || this.y <= 0) {
                this.y = -this.y;

            }

            if (canvas.key && canvas.key == 37) {
                this.x -= 5;
            }
            else if (canvas.key && canvas.key == 39) {
                this.x += 5;
            }
            else if (canvas.key && canvas.key == 38) {
                this.y -= 5;
            }
            else if (canvas.key && canvas.key == 40) {
                this.y += 5;
            }
            this.draw();

        }
        else if (isComet) {
            // gets points or bullets with collision of bullet
            if ((this.x + this.radius > innerWidth) || (this.x - this.radius) < 0) {
                this.dx = -this.dx;

            }
            else if ((this.y + this.radius > innerHeight) || (this.y - this.radius) < 0) {
                this.dy = -this.dy;

            }
            this.x += this.dx;
            this.y += this.dy;
            this.collisionShipStars();
            this.draw();
        }
    }

}

var ship = new Component(pesawat, innerWidth / 2, innerHeight / 2, 100, 50, false, true, false);
var bullet = new Component(laser, Math.random() * innerWidth, Math.random() * (innerHeight - 110), 100, 50, true, false, false);
soundBullet = new sound('laser.mp3');

var starArrays = [];
var bulletArray = [];
for (var i = 0; i < jumlahPeluru; i++) {

    bulletArray.push(bullet);
}


for (var i = 0; i < jumlahAsteroid; i++) {
    var dx = Math.random() * 2;
    var dy = Math.random() * 2;

    var star_x = Math.random() * innerWidth;
    var star_y = Math.random() * innerHeight;
    starArrays.push(new Component(asteroid, 50 + 20, 30, 75, 75, false, false, true, "red", dx, dy));
    console.log(starArrays)
}

function animate() {
    if (start) {

        playAgain("Main Lagi? Y/T");
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "30px Arial";
        ctx.fillStyle = "#ffffff"
        ctx.fillText("Score:" + alienHit, 10, 50);
        for (var i = 0; i < starArrays.length; i++) {
            starArrays[i].update();
            starArrays[i].collision(starArrays[i]);
        }
        for (var b = 0; b < bulletArray.length; b++) {
            if (shoot) {
                bulletArray[b].update()
                bulletArray[b].collision(bulletArray[b]);
            }
        }
        ship.update();
    }
}

function playAgain(str) {
    if (alienHit >= jumlahAsteroid) {
        prompt = prompt(str);
        if (prompt == "Y" || prompt === "y") {
            location.reload();
        }
        else {
            console.log("pass");
        }

    }
}
