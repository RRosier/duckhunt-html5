function randomFromInterval(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function startGameCanvas(username) { // wait until the window is fully loaded

    // create Quintus instance
    var Q = new Quintus()
            .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
            .include("DuckHuntSprites, DuckHuntScenes")
            .setup("gameCanvas");
    Q.touch(Q.SPRITE_ALL);

    Q.DUCKS = ['black_duck', 'brown_duck', 'blue_duck'];
    Q.WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    Q.CurrentDay = 0;
    Q.DUCK_COUNT = [
        { day: "Monday", ducks: [{ name: "black_duck", count: 0 }, { name: "brown_duck", count: 0 }, { name: "blue_duck", count: 0 }] },
        { day: "Tuesday", ducks: [{ name: "black_duck", count: 0 }, { name: "brown_duck", count: 0 }, { name: "blue_duck", count: 0 }] },
        { day: "Wednesday", ducks: [{ name: "black_duck", count: 0 }, { name: "brown_duck", count: 0 }, { name: "blue_duck", count: 0 }] },
        { day: "Thursday", ducks: [{ name: "black_duck", count: 0 }, { name: "brown_duck", count: 0 }, { name: "blue_duck", count: 0 }] },
        { day: "Friday", ducks: [{ name: "black_duck", count: 0 }, { name: "brown_duck", count: 0 }, { name: "blue_duck", count: 0 }] },
    ];

    /* specific timesheet adaptations */
    Q.BUGS = ["bug", "feature", "request", "barbie"];
    Q.BUGS_COUNT = [
        { day: "Monday", ducks: [{ name: "bug", count: 0 }, { name: "feature", count: 0 }, { name: "request", count: 0 }, { name: "barbie", count: 0 }] },
        { day: "Tuesday", ducks: [{ name: "bug", count: 0 }, { name: "feature", count: 0 }, { name: "request", count: 0 }, { name: "barbie", count: 0 }] },
        { day: "Wednesday", ducks: [{ name: "bug", count: 0 }, { name: "feature", count: 0 }, { name: "request", count: 0 }, { name: "barbie", count: 0 }] },
        { day: "Thursday", ducks: [{ name: "bug", count: 0 }, { name: "feature", count: 0 }, { name: "request", count: 0 }, { name: "barbie", count: 0 }] },
        { day: "Friday", ducks: [{ name: "bug", count: 0 }, { name: "feature", count: 0 }, { name: "request", count: 0 }, { name: "barbie", count: 0 }] },
    ];

    Q.state.reset({ username: username });

    // set the animations
    Q.animations("duck", {
        fly_up: { frames: [0, 2, 4], rate: 1 / 4 },
        fly_straight: { frames: [6, 8, 10], rate: 1 / 4 },
        fly_away: { frames: [13, 15, 17], rate: 1 / 4 },
        shot: { frames: [12], next: "fall", rate: 1 / 1, trigger: "shot" },
        fall: { frames: [14, 16], rate: 1 / 4 }
    });

    Q.animations("dog", {
        walk: { frames: [0, 2, 4, 6, 8], rate: 1 / 4 },
        stand: { frames: [10], rate: 1 / 1, next: "jump_up" },
        jump_up: { frames: [1], rate: 3.5 / 1, next: "jump_down" },
        jump_down: { frames: [3], loop: false },
        laugh: { frames: [9, 11], rate: 1 / 4 },
        show_one: { frames: [5], rate: 2 / 1 },
        show_two: { frames: [7], rate: 2 / 1 }
    });

    Q.animations("bug", {
        fly_up: { frames: [4, 6, 5], rate: 1 / 4 },
        fly_straight: { frames: [6, 8, 10], rate: 1 / 4 },
        fly_away: { frames: [1, 2, 7], rate: 1 / 4 },
        shot: { frames: [2], next: "fall", rate: 1 / 1, trigger: "shot" },
        fall: { frames: [0, 3], rate: 1 / 4 }
    });

    // load the assets
    Q.load(["sprites.png", "sprites.json", "timesheetsprites.png", "timesheetsprites.json"], function () {
        Q.compileSheets("sprites.png", "sprites.json");
        Q.compileSheets("timesheetsprites.png", "timesheetsprites.json");

        // set the stage
        //Q.stageScene("duckScene", 0);

        Q.stageScene("grassScene", 1);
        Q.stageScene("dogIntro", 2, {
            day: Q.WEEKDAYS[Q.CurrentDay++]
        });
    });
};