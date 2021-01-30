(function() {
    "use strict";

    function createNewElement(tagName, className, idName) {
        var newElement = document.createElement(tagName);
        if (className) { newElement.className = className; }
        if (idName) { newElement.id = idName; }
        return newElement;
    }
    function changeBackgroundColor(event, color) {
        event.preventDefault();
        event.target.style.backgroundColor = color;
    }

    const module = {
        el : [],
        c : {
            wo: "#ffff00",
            miss: "#FF4A48",
            hit: "#84FF77",
            filled: "#CEE7FF",
            hidden: "#8B93C0"
        },

        lev : 7,
        height : 6,
        width : 5,
        order : [],
        choose : [],
        filled: {},
        xx: 42,
        getX: function() {
            return this.xx;
        },
        getOrder: function() {
            return this.order;
        },
        getlev: function() {
            return this.lev;
        },
        getfill: function(){
            return this.filled;
        },
        getc : function(){
            return this.c;
        },
        getel: function(){
            return this.el;
        },
        getch: function(){
            return this.choose;
        },
        
        setOrder: function(ord){
            this.order = ord;
        },
        setfill : function(f){
            this.filled = f;
        },
        setel : function(l){
            this.el = l;
        },
        setch : function(ch){
            this.choose = ch;
        }
      };
    const mgetel = module.getel;
    const bgetel = mgetel.bind(module);

    const msetel = module.setel;
    const bsetel = msetel.bind(module);

    const unboundGetX = module.getX;
    const boundGetX = unboundGetX.bind(module);
    console.log(boundGetX());

    // expected output: 42

    const mgetfill = module.getfill;
    const bgetfill = mgetfill.bind(module);

    const msetfill = module.setfill;
    const bsetfill = msetfill.bind(module);

    // module.filled = {};
    
    const mgetord = module.getOrder;
    const bgetord = mgetord.bind(module);

    const msetord = module.setOrder;
    const bsetord = msetord.bind(module);

    const mgetc = module.getc;
    const bgetc = mgetc.bind(module);

    const msetch = module.setch;
    const bsetch = msetch.bind(module);

    const mgetch= module.getch;
    const bgetch = mgetch.bind(module);
    
    function Grid() {
        this.height = 6;
        this.width = 5;
        this.fillNum = 0;
        this.filled = {};
        this.empty = {};
        this.elements = [];
        this.colors = {
            miss: "#FF4A48",
            hit: "#84FF77",
            filled: "#CEE7FF",
            hidden: "#8B93C0",
            wo: "#ffff00"
        };
        this.guesses = {
            used: 0,
            correct: 0
        };
        this.finished = false;
        this.gridBox = document.getElementById("grid-box");
        this.table = null;
        this.startButton = null;
        this.statusBar = null;
        this.finishBar = null;
        this.started = false;
        this.reload = null;

        // this.arrtest = new Array(5); 
        // // Loop to create 2D array using 1D array 
        // document.write("Creating 2D array1 <br>"); 
        // for (var i = 0; i < this.order.length; i++) { 
        //     this.order[i] = []; 
        // }
    }
    Grid.prototype.setFillNum = function() {
        this.fillNum = Math.floor((this.height*this.width)/3)+1;
    };
    Grid.prototype.createElements = function() {
        this.startButton = this.gridBox.appendChild(
            createNewElement("button", "status", "start-new")
        );
        this.startButton.innerText = "Start";
        
        this.reload = this.gridBox.appendChild(
            createNewElement("button", "status", "start-new")
        );
        this.reload.innerText = "reload";

        this.table = this.gridBox.appendChild(
            createNewElement("table", false, "grid")
        );
    };
    Grid.prototype.createGrid = function() {
        let tempel = [];
        
        this.createElements();
        this.setFillNum();
        var row, rowElement, cell, i, j;
        for (i = 0; i < this.height; i++) {
            rowElement = createNewElement("tr", "row");
            row = [];
            this.empty[i] = {};
            for (j = 0; j < this.width; j++) {
                cell = createNewElement("td", "cell");
                row.push(cell);
                rowElement.appendChild(cell);
                // Initialize as a boolean (clicked/not clicked) to be
                // handled for tallying in listener
                this.empty[i][j] = false;
            }
            this.elements.push(row);

            tempel.push(row);

            console.log('\n\ntempel');
            console.table(tempel);
            bsetel(tempel);

            console.log('\n\nbgetel()');
            console.table(bgetel());
            this.table.appendChild(rowElement);
        }
    };
    Grid.prototype.populateRandom = function() {
        var numAssigned = 0, random1, random2;

        let tempfill = bgetfill();
        let tempord = bgetord();
        let tempel = bgetel();

        // console.log(bindmorder());
    
            // Add random row number as key with its own object of random
            // cell keys
            var x = 0;
            // this.filled[random1] = {};
            // this.filled[random1][random2] = null;

            var intervalID = setInterval(function () {
                // Your logic here
                console.log("test");
                // setHiddenBoard();
                bgetel().forEach(function(row) {
                    row.forEach(function(cell) {
                        cell.style.backgroundColor = bgetc().hidden;
                    })
                });

                random1 = Math.floor(Math.random() * 6);
                console.log(
                    "ran"+random1
                );

                if (!(random1 in bgetfill())) {

                    tempfill[random1] = {};
                    bsetfill(tempfill);
                }

                // Populate random cell keys for each random row
                if (Object.keys(bgetfill()[random1]).length < 5) {
                    random2 = Math.floor(Math.random() * 5);
                    if (!(random2 in bgetfill()[random1])) {
                        // Don't need to store a value here, the purpose of
                        // this object is to do key lookups for cell validation

                        tempfill[random1][random2] = null;
                        bsetfill(tempfill);
                        tempord.push([random1,random2])
                        bsetord(tempord);
                        
                        console.log('tempel????????');
                        console.table(tempel);

                        // Change background color as we populate
                        bgetel()[random1][random2].style.backgroundColor =
                            bgetc().filled;
                        
                        numAssigned++;
                        // console.log(Grid.filled[0]);
                        // alert(this);
                    }
                }
                console.log(x);
                console.log(numAssigned);
                if (++x === 7 || numAssigned > 7) {
                    window.clearInterval(intervalID);
                }
            }, 1000);

        this.statusBar = this.gridBox.appendChild(
            createNewElement("div", "status", "remaining")
        );
        this.statusBar.innerText = "Memorize";
    };
    Grid.prototype.clearBoard = function() {
        while (this.gridBox.firstChild) {
            this.gridBox.removeChild(this.gridBox.firstChild);
        }
    };

    Grid.prototype.checkForWinner = function() {
        var doneMsg, rateCorrect;
        if (this.fillNum === this.guesses.used) {
            rateCorrect = this.guesses.correct + "/" + this.guesses.used;
            this.statusBar.innerText = rateCorrect + " correct";
            if (this.guesses.correct === this.fillNum) {
                doneMsg = "Perfect Game!";
            } else {
                doneMsg = "Game Over";
            }
            // Add game completion status element when finished
            
         

            this.finishBar = createNewElement("div", "status", "completion");
            this.finishBar.innerText = doneMsg;
            this.gridBox.insertBefore(this.finishBar, this.statusBar);
            this.finished = true;
            this.startButton.innerText = "New Game";
            this.startButton.addEventListener("click", function() {
                this.clearBoard();
                var newGrid = new Grid();
                newGrid.playGame();
            }.bind(this));
        }
    };
    Grid.prototype.cellClickHandler = function(event, correct, color, i1, i2) {
        if (!this.finished && !this.empty[i1][i2]) {
            let tempch = bgetch();
            tempch.push([i1,i2]);
            bsetch(tempch);

          
            
            // console.log(c1 === c2);
            // console.log(JSON.stringify(c1) == JSON.stringify(c2));
            console.log(this.guesses.used);
            console.log("this.choose");
            console.table(bgetch());
            // console.table(bgetch()[this.guesses.used-1]);
            console.log("this.order");
            console.table(bgetord());
            // console.table(bgetord()[this.guesses.used-1]);
            console.log("color?"+color);

            
            this.guesses.used++;
            let c1 = bgetch()[this.guesses.used-1];
            let c2 = bgetord()[this.guesses.used-1];
            console.log(c1);
            console.log(c2);
            if (correct) {
                this.guesses.correct++;
                if(!(JSON.stringify(c1) == JSON.stringify(c2))){
                    color = bgetc().wo;
                }
            }

            console.log("e: "+event+" / color: "+color);
            this.empty[i1][i2] = true;
            this.statusBar.innerText = (this.fillNum -
                                        this.guesses.used) +
                                        " Guesses left";
            
            changeBackgroundColor(event, color);
            this.checkForWinner();
        }
    };
    Grid.prototype.setHiddenBoard = function() {
        var hideAfterMs = 8000;
        setTimeout(function() {
            this.statusBar.innerText = this.fillNum + " Guesses left";
            // Configure all cells on the grid, hiding those populated
            bgetel().forEach(function(row, i1) {
                row.forEach(function(cell, i2) {
                    // Check correctness of each cell and tally accordingly
                    // to determine when game ends / prevent duplicate tallies
                    var color = this.colors.miss;
                    var correct = ((i1 in bgetfill()) && 
                                   (i2 in bgetfill()[i1]));
                    console.log("cor: "+correct);
                    if (correct) { color = this.colors.hit; }
                    cell.style.backgroundColor = this.colors.hidden;
                    cell.addEventListener("click", function(event) {                
                        this.cellClickHandler(event, correct, color, i1, i2);
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        }.bind(this), hideAfterMs);
    };
    Grid.prototype.playGame = function() {
        this.createGrid();
        this.startButton.addEventListener("click", function() {
            if (!this.started) {
                this.started = true;
                this.populateRandom();
                this.setHiddenBoard();
            }
        }.bind(this));

        this.reload.addEventListener("click", function() {
            location.reload();
        }.bind(this));
    };
    var grid = new Grid();
    grid.playGame();
})();
