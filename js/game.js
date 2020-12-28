const fps = 10;      // frames per second, or lifeCycle per seconds in our case
const mapSize = 50;  // function createMap() will generate the map with area = mapSize x mapSize
const cellSize = 15; // pixel size of one cell
const cells = [];

const canvas = document.getElementById("game");
canvas.width = mapSize * cellSize;
canvas.height = mapSize * cellSize;
const context = canvas.getContext("2d");

function Cell(vx = 0, vy = 0, isAlive = 0, neighbors = 0) {
    this.vx = vx;   // virtual X position in cells[][] array
    this.vy = vy;   // virtual Y position in cells[][] array
    this.isAlive = isAlive;
    this.neighbors = neighbors;
}

function generateCells() {
    for (let i = 0; i < mapSize; i++) {
        cells[i] = [];
        for (let j = 0; j < mapSize; j++) {
            cells[i][j] = new Cell(i, j, Math.floor(Math.random() * Math.floor(2))); // generate cell with random isAlive status
        }
    }
}

function lifeCycle() {
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {         // array of cells
            cells[i][j].neighbors = 0;                      // reset neighbors to calculate new value
            for (let vi = i - 1; vi <= i + 1; vi++) {
                for (let vj = j - 1; vj <= j + 1; vj++) {   // array of neighbors of selected cell
                    if ((vi < 0) || (vj < 0) || (vi > cells.length - 1) || (vj > cells.length - 1)) continue; // if neighbot is out of border, goto next iteration
                    if ((vi === i) && (vj === j)) continue;                                                   // if self alive, self is not a neighbor, goto next iteration
                    if (cells[vi][vj].isAlive) { cells[i][j].neighbors += 1; }
                }
            }
            if ((!cells[i][j].isAlive) && (cells[i][j].neighbors === 3)) { cells[i][j].isAlive = 1; continue }  // if empty cell has 3 neighbors, it becomes alive !!!!!!!!!!
            if ((cells[i][j].neighbors < 2) || (cells[i][j].neighbors > 3)) { cells[i][j].isAlive = 0; }        // if cell has less than 2, or more than 3 neighbors, it dies
        }
    }
}

function gameRun() {
    gameUpdate();
    gameRender();
    gameAnimate();
}

function gameAnimate() {
    setTimeout(function () {
        requestAnimationFrame(gameRun);
    }, 1000 / fps);
}

function gameUpdate() {
    lifeCycle();
}

function gameRender() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            context.fillStyle = 'grey';
            if (cells[i][j].isAlive) { context.fillRect(cells[i][j].vx * cellSize, cells[i][j].vy * cellSize, cellSize, cellSize); }
        }
    }
}

generateCells();
gameRun();