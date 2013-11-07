; Quintus.DuckHuntScenes = function (Q) {
    // create the scenes
    Q.scene("startScene", function (stage) {
    });

    Q.scene("endScene", function (stage) {

        //createTimesheet(Q.DUCK_COUNT, Q.DUCKS, Q.state.get('username')); //Q.BUGS_COUNT, Q.BUGS, Q.state.get('username'));// 
    });

    Q.scene("duckScene", function (stage) {
        var duckHits = 0;
        var ducksActive = 0;

        stage.hit = function (duckIndex) {

            Q.DUCK_COUNT[Q.CurrentDay - 1].ducks[duckIndex].count++;
            //Q.BUGS_COUNT[Q.CurrentDay - 1].ducks[duckIndex].count++;

            duckHits++;
            // both ducks have been shot, don't show the timeout
            if(duckHits == 2)
                window.clearTimeout(timerId);
        }

        stage.next = function () {
            if (Q.CurrentDay < Q.WEEKDAYS.length) {
                Q.stageScene("grassScene", 1);
                Q.stageScene("dogIntro", 2, {
                    day: Q.WEEKDAYS[Q.CurrentDay++]
                });
            }
            else {
                Q.clearStages();
                Q.stageScene("endScene");
            }
        }

        // execute fly away after 5 seconds
        var timerId = window.setTimeout(function () {
            var daylabel = stage.insert(new Q.UI.Button({
                label: "Fly Away",
                x: Q.width / 2,
                y: 50,
                fill: "red",
                border: 5,
                shadow: 10,
                shadowColor: "rgba(0,0,0,0.5)",
            }, function () { }));

            Q("Duck").invoke("flyAway");

        }, 5000);

        stage.duckGone = function(){
            if(ducksActive > 0)
                ducksActive--;
            if (ducksActive == 0)
            {
                Q("UI.Button").destroy();
                var dog = stage.insert(new Q.Dog());
                dog.show(duckHits);
            }
        }

        var duck = stage.insert(new Q.Duck());
        var duck2 = stage.insert(new Q.Duck());
        ducksActive+= 2;
    });

    Q.scene("grassScene", function (stage) {
        var grass = stage.insert(new Q.Grass());

        var username = stage.insert(new Q.UI.Text({
            label: Q.state.get("username"),
            x: Q.width - 50,
            y: Q.height - 20,
            color: "red",
            align: "right"
        }, function () { }));
    });

    Q.scene("dogIntro", function (stage) {
        //var container = stage.insert(new Q.UI.Container({
        //    fill: "gray",
        //    border: 5,
        //    shadow: 10,
        //    shadowColor: "rgba(0,0,0,0.5)",
        //    y: 50,
        //    x: 50,
        //    w: 200,
        //    h:200
        //}));

        //var daylabel = stage.insert(new Q.UI.Text({
        //    x: 0,
        //    y: 0,
        //    label: stage.options.day
        //}));

        //container.fit(20, 20);

        // TODO-rro: container seems not to display, fake it with a button
        var daylabel = stage.insert(new Q.UI.Button({
            label: stage.options.day,
            x: Q.width / 2,
            y: 50,
            fill: "gray",
            border: 5,
            shadow: 10,
            shadowColor: "rgba(0,0,0,0.5)",
        }, function () { }));

        var dog = stage.insert(new Q.Dog());
        dog.walk();

        stage.next = function () {
            Q.stageScene("duckScene", 0);
            Q.clearStage(2);
        }
    });
}