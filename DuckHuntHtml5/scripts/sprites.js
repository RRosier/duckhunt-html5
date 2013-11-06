; Quintus.DuckHuntSprites = function (Q) {
    var grassHeight = 170;

    Q.Sprite.extend("Grass", {
        init: function (p) {
            this._super(p, {
                //asset: 'grass.png',
                sheet: "grass",
                scale: 1.5,
                x: 0,
                y: Q.height - grassHeight,
                w: 1,
                h: 150
            });
        }
    });

    // Create the Sprites
    Q.Sprite.extend("Duck", {
        init: function (p) {
            p = p || {};

            p.speed = Math.random() * 20 + 180;
            p.isShot = false;
            p.isFlyAway = false;
            p.duckIndex = randomFromInterval(1, 4) - 1; //randomFromInterval(1, 3) - 1;
            p.duckType = Q.BUGS[p.duckIndex]; // Q.DUCKS[p.duckIndex];

            this._super(p, {
                x: randomFromInterval(1, Q.width),
                y: Q.height,
                dx: Math.random() < 0.5 ? -1 : 1,
                dy: -1,
                sheet: p.duckType,
                sprite: "bug", // "duck",
                scale: 1.5
            });

            this.add("animation");
            this.on("touch", this, "shot");

            // set the initial animation, based on the random direction.
            this.play("fly_up");
            if (this.p.dx === -1)
                this.p.flip = "x";
            else { this.p.flip = false; }
        },

        step: function (dt) {
            var p = this.p;

            if (p.isShot) {
                if (p.animation === 'shot') return;
                if (p.animation === 'fall') {
                    p.y += 1 * p.speed * dt;
                    if (p.y > Q.height - 100) {
                        this.destroyDuck();
                    }
                }
            }
            else if (p.isFlyAway) {
                p.y--;
                if (p.y < 0) {
                    this.destroyDuck();
                }
            }
            else {
                p.x += p.dx * p.speed * dt;
                p.y += p.dy * p.speed * dt;

                if (p.x > Q.width - p.w) {
                    p.x = Q.width - p.w;
                    p.dx = -1;
                    p.flip = "x";
                } else if (p.x < p.w) {
                    p.x = p.w;
                    p.dx = 1;
                    p.flip = false;
                }

                if (p.y > Q.height - p.h - 50) {
                    p.y = Q.height - p.h - 50;
                    p.dy = -1;
                } else if (p.y < p.h) {
                    p.y = p.h;
                    p.dy = 1;
                }
            }
        },

        destroyDuck: function () {
            this.stage.duckGone();
            this.destroy();
        },

        // triggered on 'touch' (click)
        shot: function (touch) {
            if (this.p.isShot || this.p.isFlyAway) return;

            this.p.isShot = true;
            this.play("shot");
            this.stage.hit(this.p.duckIndex);
        },

        flyAway: function () {
            if (this.p.isShot) return;
            this.p.isFlyAway = true;
            this.play("fly_away");
        }
    });

    Q.Sprite.extend("Dog", {

        init: function (p) {
            p = p || {};

            p.action = "hide";

            this._super(p, {
                x: 0,
                y: Q.height,
                sheet: "dog",
                sprite: "dog",
                scale: 1.5
            });

            this.add("animation");
            this.hide();
        },

        step: function (dt) {
            var p = this.p;

            if (p.animation === "walk") {
                p.x++;
                if (p.x === (Q.width / 2) - this.p.w) {
                    this.play("stand");
                }
            }

            if (p.animation === "jump_up") {
                p.x++;
                p.y--;
            }
            if (p.animation === "jump_down") {
                if (p.animationTime > 2) {
                    this.destroy();
                    var s = this.stage.next();
                }
                p.x += 0.5;
                p.y += 0.5;
            }

            if (p.action === "show_ascend") {
                if (p.y > Q.height - 100 - (p.h - 10)) {
                    p.y--;
                }
                else {
                    p.action = "show_descend";
                }
            }
            if (p.action === "show_descend") {
                //if (p.animationTime < 0.2) return;
                p.y++;
                if (p.y > Q.height - 100) {
                    this.stage.next();
                    this.destroy();
                }
            }
        },

        // show 1 or 2 ducks
        show: function (ducks) {
            this.p.x = Q.width / 2;
            this.p.y = Q.height - 100;
            this.p.action = "show_ascend";
            if (ducks === 0) {
                this.play("laugh");
            }
            if (ducks === 1) {
                this.play("show_one");
            }
            else if (ducks === 2) {
                this.play("show_two");
            }
        },

        // walk and jump
        walk: function () {
            this.p.action = "walk";
            this.play("walk");
            this.p.y = Q.height - this.p.h - 5;
            this.p.x = 0;
        },

        // don't display
        hide: function () {
            this.p.action = "hide";
            this.p.y = Q.height;
        }
    });
}