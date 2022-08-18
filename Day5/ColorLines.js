let board=[]

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let posXfrom,posYfrom,posXto,posYto;
let score=0;
let scoreCopy=score;

function askCoordinateXfrom(){
    rl.question('Enter the "from" X coordinate. (between 0 and 9 inclusive)\n', x => {
        if(x>9 || x<0){
            askCoordinateXfrom();
        } else {
            posXfrom=x;
            askCoordinateYfrom();
        }
    })
}
// askCoordinateX()
function askCoordinateYfrom(){
    rl.question('Enter the "from" Y coordinate. (between 0 and 9 inclusive)\n', y =>{
        if(y>9 || y<0){
            askCoordinateYfrom();
        } else {
            posYfrom=y;
            if(board[posYfrom][posXfrom].state=="free"){
                askCoordinateXfrom();
            } else {
                console.log(`Your coordinates ${posXfrom} and ${posYfrom}`)
                askCoordinateXto();
            }
        }
    })
}


function askCoordinateXto(){
    rl.question('Enter the "to" X coordinate. (between 0 and 9 inclusive)\n', x => {
        if(x>9 || x<0){
            askCoordinateXto();
        } else {
            posXto=x;
            askCoordinateYto();
        }
    })
}


function askCoordinateYto(){
    rl.question('Enter the "to" Y coordinate. (between 0 and 9 inclusive)\n', y =>{
        if(y>9 || y<0){
            askCoordinateYto();
        } else {
            posYto=y;
            if(board[posYto][posXto].state=="busy"){
                askCoordinateXto();
            } else {
                console.log(`Your coordinates ${posXto} and ${posYto}`)
                Xfrom=Number(posXfrom)
                Yfrom=Number(posYfrom)
                Xto=Number(posXto)
                Yto=Number(posYto)
                let astar = new Astar(board);
                console.log(astar.search(Xfrom,Yfrom,Xto,Yto))
                if(astar.search(Xfrom,Yfrom,Xto,Yto)){
                    let temp;
                    temp=board[Yfrom][Xfrom].content;
                    board[Yfrom][Xfrom].emptyLetter();
                    board[Yto][Xto].state="busy";
                    board[Yto][Xto].content=temp;
                    showBoard();
                    checkLines(Xto,Yto);
                    checkLines(randomCellsCoordinates[0][0],randomCellsCoordinates[0][1]);
                    checkLines(randomCellsCoordinates[1][0],randomCellsCoordinates[1][1]);
                    checkLines(randomCellsCoordinates[2][0],randomCellsCoordinates[2][1]);
                    console.log(`\nScore: ${score}, Lines Checked`)
                    showBoard();
                    if(scoreCopy==score){
                        randomFreeCells();
                        console.log(`\nLetters randomly added.`)
                        showBoard();
                        askCoordinateXfrom();
                    } else{
                        scoreCopy=score;
                        askCoordinateXfrom();
                    }
                } else {
                    let freeCells=0;
                    for(let i=0;i<board.length;i++){
                        for(let j=0;j<board[0].length;j++){
                            if(board[i][j].content="*"){
                                freeCells++;
                            }

                        }
                    }
                    if(freeCells<=1){
                        console.log("The Game is Over");
                        process.exit();
                    }else{
                        console.log("No path found. Choose another coordinates.");
                        askCoordinateXfrom();
                    }
                }
            }
        }
    })
}


let randomCellsCoordinates=[];

function Cell(){
    this.content="*"
    this.state="free"
}
Cell.prototype.addRandomLetter=function(){
    this.state="busy"
    const letters=["a","b","c","d","e","f","g"]
    this.content=letters[Math.floor(Math.random()*letters.length)]
}
function randomFreeCells(){
    let randomX,randomY;
    for(k=0;k<3;k++){
        function generateRandomCell(){
            randomX=Math.floor(Math.random()*10)
            randomY=Math.floor(Math.random()*10)
            if(board[randomY][randomX].state=="busy"){
                generateRandomCell();
            } else {
                board[randomY][randomX].addRandomLetter();
                randomCellsCoordinates.push([randomX,randomY])

            }
        }
        generateRandomCell();
    }
}

Cell.prototype.emptyLetter=function(){
    this.state="free"
    this.content="*"
}

for(let i=0;i<10;i++){
    board.push([])
    for(let j=0;j<10;j++){
        board[i].push(new Cell())
    }
}
function showBoard(){
    for(let i=0;i<10;i++){
        if(i==0){
            process.stdout.write(`    0  1  2  3  4  5  6  7  8  9 `);
            console.log("")
        }
        for(let j=0;j<10;j++){
            if(j==0){
                process.stdout.write(` ${i} `);
            }
            process.stdout.write(` ${board[i][j].content} `);
        }
        console.log("")
    }
}

function Astar(board){
    let grid=[]
    let openList=[]
    function init(posXfrom,posYfrom){
        for(let i=0;i<board.length;i++){
            grid[i]=[];
            for(let j=0;j<board.length;j++){
                grid[i][j] = {obstacle: board[i][j].state, parent:0, f:0, g:0, h:0, x:j, y:i, closed: false};
            }
        }
        openList.push(grid[posYfrom][posXfrom])
    }

    function search(posXfrom,posYfrom,posXto,posYto){
        init(posXfrom,posYfrom)

        while(openList.length!=0){
            let lowInd=0;
            for(let i=0;i<openList.length;i++) {
                if(openList[i].f < openList[lowInd].f){
                    lowInd = i;
                }
            }
            let current = openList[lowInd];

            if(current.x==posXto && current.y==posYto) {
                return true;
            }
            openList.splice(lowInd, 1);
            current.closed = true;

            let neighbors = [];
            let	x = current.x;
            let	y = current.y;

            if(y-1>=0){neighbors.push(grid[y-1][x]);}
            if(y+1<board.length){neighbors.push(grid[y+1][x]);}
            if(x-1>=0){neighbors.push(grid[y][x-1]);}
            if(x+1<board.length){neighbors.push(grid[y][x+1]);}

            for(let neighbor of neighbors){

                if(neighbor.closed || neighbor.obstacle != "free"){
                    continue;
                }

                let g = current.g+1;
                let gIsBest = false;

                if( !isOpened(neighbor)){
                    gIsBest = true;
                    neighbor.h = Math.abs(neighbor.x-posXto) + Math.abs(neighbor.y-posYto);
                    openList.push(neighbor);
                } else if(g < neighbor.g){
                    gIsBest = true;
                }

                if(gIsBest){
                    neighbor.parent = current;
                    neighbor.g = g;
                    neighbor.f = neighbor.g + neighbor.h;
                }
            }
        }
        //No such path
        return false;
    }

    function isOpened(node){

        for(let i=0; i<openList.length; i++){
            if(openList[i].x == node.x && openList[i].y == node.y){
                return true;
            }
        }
        return false;
    }
    return {
        search: search
    };

}

function checkLines(x,y){
    let oldScore=score;

    let horizontal
    let horizontal_first=[]
    let horizontal_second=[]

    let vertical
    let vertical_first=[]
    let vertical_second=[]

    let left_diagonal
    let left_diagonal_first=[]
    let left_diagonal_second=[]

    let right_diagonal
    let right_diagonal_first=[]
    let right_diagonal_second=[]

    for(let i=1;i<5;i++){
        if(x-i>=0){
            horizontal_first.push([board[y][x-i],x-i,y])
        }
        if(x+i<10){
            horizontal_second.push([board[y][x+i],x+i,y])
        }

        if(y-i>=0){
            vertical_first.push([board[y-i][x],x,y-i])
        }
        if(y+i<10){
            vertical_second.push([board[y+i][x],x,y+i])
        }

        if(y-i>=0 && x-i>=0){
            left_diagonal_first.push([board[y-i][x-i],x-i,y-i])
        }
        if(y+i<10 && x+i<10){
            left_diagonal_second.push([board[y+i][x+i],x+i,y+i])
        }

        if(y+i<10 && x-i>=0){
            right_diagonal_first.push([board[y+i][x-i],x-i,y+i])
        }
        if(y-i>=0 && x+i<10){
            right_diagonal_second.push([board[y-i][x+i],x+i,y-i])
        }
    }
    horizontal=[...horizontal_first.reverse(),...horizontal_second]
    vertical=[...vertical_first.reverse(),...vertical_second]
    left_diagonal=[...left_diagonal_first.reverse(),...left_diagonal_second]
    right_diagonal=[...right_diagonal_first.reverse(),...right_diagonal_second]

    if(horizontal.length<4){
        horizontal=[]
    }
    if(vertical.length<4){
        vertical=[]
    }
    if(left_diagonal.length<4){
        left_diagonal=[]
    }
    if(right_diagonal.length<4){
        right_diagonal=[]
    }


    let lines=[[...horizontal],[...vertical],[...left_diagonal],[...right_diagonal]]

    for(let k=0;k<lines.length;k++){
        if(lines[k].length!=0){
            let count=0;
            let counts=[]
            let indexes=[]
            for(let i=0;i<lines[k].length;i++){
                if(lines[k][i][0].content==board[y][x].content && board[y][x].content!="*"){
                    count++;
                } else{
                    counts.push(count);
                    indexes.push(i)
                    count=0;
                }
            }
            if(counts.length==0){
                counts.push(count)
                indexes.push(count)
                count=0;
            } else {
                counts.push(count)
                indexes.push(lines[k].length)
            }
            if(Math.max(...counts)>=4){
                for(let i=indexes[counts.indexOf(Math.max(...counts))]-Math.max(...counts);i<indexes[counts.indexOf(Math.max(...counts))];i++){
                    board[lines[k][i][2]][lines[k][i][1]].emptyLetter();
                }
                score+=10;
            }
        }
    }

    if(oldScore!=score){
        board[y][x].emptyLetter();
    }
}

randomFreeCells();
showBoard();
askCoordinateXfrom();
