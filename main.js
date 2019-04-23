let grid = blankGrid();
function blankGrid() {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
}



function creat_game() {
    let board = document.getElementById('board');
    for (let i = 0; i < 4; i++) {
        tr = document.createElement('tr');
        //tr.setAttribute("id", "row_"+i);
        board.appendChild(tr);
        for (let j = 0; j < 4; j++) {
            let td = document.createElement('td');
            td.setAttribute("id", "row_" + i + "col_" + j);
            //td.appendChild(document.createTextNode(arr_game[i][j]));
            tr.appendChild(td);
        }
    }
    

}
let arrColor = {
    "0": "#CDC1B4",
    "2": "#EEE4DA",
    "4": "#EDE0C8",
    "8": "#F2B179",
    "16": "#F59563",
    "32": "#F67C5F",
    "64": "#F65E3B",
    "128": "#edcf72",
    "256": "#edcc61",
    "512": "#edc850",
    "1024": "#edc53f",
    "2048": "#edc22e"
}

function addValue() {
    let score=0;
    for (let i = 0; i < 4; i++) {

        for (let j = 0; j < 4; j++) {
            score+=grid[i][j];
            let idCell = "row_" + i + "col_" + j;
            
            document.getElementById(idCell).style.backgroundColor = arrColor[grid[i][j].toString()];
            document.getElementById(idCell).style.transition = "all 0.4s";
            document.getElementById(idCell).innerHTML = grid[i][j] || "";
            document.getElementById("my_score").innerHTML = score;
        }
    }
}
function addNumber() {
    let option = []
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                option.push({
                    x: i,
                    y: j
                });
            }
        }
    }
    if (option.length > 0) {
        let spot = option[Math.floor(Math.random() * option.length)];
        grid[spot.x][spot.y] = Math.random() > 0.5 ? 2 : 4;
    }
}
function slide(row) {
    let arr = row.filter(val => val);
    let missing = 4 - arr.length;
    let zeros = Array(missing).fill(0);

    zeros.push(...arr);
    return zeros;
}

function combine(row) {
    for (let i = 0; i < 3; i++) {
        let a = row[i];
        let b = row[i + 1];
        if (a === b) {
            row[i + 1] = a + b;
            row[i] = 0;
        }
    }
    return row;
}
function flipGrid(grid) {
    for (let i = 0; i < 4; i++) {
        grid[i].reverse();
    }
    return grid;
}

function operate(row) {
    row = slide(row);
    row = combine(row);
    //row = slide(row);

    return row;
}
function flip(grid) {
    for (let i = 0; i < 4; i++) {
        grid[i].reverse();
    }
    return grid
}
function transposeGrid(grid) {
    let newGrid = blankGrid();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            newGrid[i][j] = grid[j][i];
        }
    }
    return newGrid;
}
function key() {
    
    document.addEventListener("keydown", function (event) {

        if (event.which === 37) {//left
            grid = flipGrid(grid);
            for (let i = 0; i < 4; i++) {
                grid[i] = operate(grid[i])
            }
            grid = flipGrid(grid);
            addNumber();
            addValue();
        }
        if (event.which === 39) {//right
            for (let i = 0; i < 4; i++) {
                grid[i] = operate(grid[i])
            }
            addNumber();
            addValue();

        }
        if (event.which === 38) {//up
            grid = transposeGrid(grid)
            grid = flipGrid(grid);
            for (let i = 0; i < 4; i++) {
                grid[i] = operate(grid[i])
            }
            grid = flipGrid(grid);
            grid = transposeGrid(grid)

            addNumber();
            addValue();
        }
        if (event.which === 40) {//down
            grid = transposeGrid(grid)
            for (let i = 0; i < 4; i++) {
                grid[i] = operate(grid[i])
            }
            grid = transposeGrid(grid)

            addNumber();
            addValue();
        }


    });
}

creat_game();

key();
