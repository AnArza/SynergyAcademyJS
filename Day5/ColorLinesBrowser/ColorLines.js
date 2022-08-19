let board=[]

let posXfrom,posYfrom,posXto,posYto;
let score=0;
let scoreCopy=score;


let randomCellsCoordinates=[];

function Cell(){
    this.color="no-color"
    this.state="free"
}
Cell.prototype.addRandomCell=function(){
    this.state="busy"
    const colors=["red","blue","green","purple","white","tan","gray"]
    this.color=colors[Math.floor(Math.random()*colors.length)]
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
                board[randomY][randomX].addRandomCell();
                randomCellsCoordinates.push([randomX,randomY])

            }
        }
        generateRandomCell();
    }
}

Cell.prototype.emptyCell=function(){
    this.state="free"
    this.color="no-color"
}

let boardGrid=document.getElementById("board")

function createBoard(){
    for(let i=0;i<10;i++){
        board.push([])
        for(let j=0;j<10;j++){
            board[i].push(new Cell())
        }
    }
    
}
let scoreDiv=document.getElementById("score");
scoreDiv.append(`Score: ${score}`);
let clicked=false

function showBoard(){
    boardGrid.innerHTML=""
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            let cell=document.createElement("div")
            cell.classList.add("cell")
            cell.classList.add(board[i][j].state)
            cell.classList.add(board[i][j].color)
            cell.addEventListener("click", function(){
                if(board[i][j].state=="free"){

                    //free cell onclick

                    if(clicked){

                        clicked=false
                        posXto=j;
                        posYto=i;
                        Xfrom=Number(posXfrom)
                        Yfrom=Number(posYfrom)
                        Xto=Number(posXto)
                        Yto=Number(posYto)
                        let astar = new Astar(board);
                        if(astar.search(Xfrom,Yfrom,Xto,Yto)){
                            let temp;
                            temp=board[Yfrom][Xfrom].color;
                            board[Yfrom][Xfrom].emptyCell();
                            board[Yto][Xto].state="busy";
                            board[Yto][Xto].color=temp;
                            showBoard();
                            checkLines(Xto,Yto);
                            if(randomCellsCoordinates.length!=0){
                                checkLines(randomCellsCoordinates[0][0],randomCellsCoordinates[0][1]);
                                checkLines(randomCellsCoordinates[1][0],randomCellsCoordinates[1][1]);
                                checkLines(randomCellsCoordinates[2][0],randomCellsCoordinates[2][1]);
                            }
                            randomCellsCoordinates=[]
                            scoreDiv.innerText=`Score: ${score}`;
                            showBoard();
                            if(scoreCopy==score){
                                randomFreeCells();
                                showBoard();
                            } else{
                                scoreCopy=score;
                            }

                            //check if game is over

                            let freeCells=0;
                            for(let i=0;i<board.length;i++){
                                for(let j=0;j<board[0].length;j++){
                                    if(board[i][j].state=="free"){
                                            freeCells++;
                                    }
                            
                                }
                            }
                            if(freeCells<3){
                                boardGrid.innerHTML=""
                                alert("The Game is Over");
                            } else{
                                freeCells=0;
                            }

                        }else{
                            console.log("No path found. Choose another coordinates.");
                        }

                    } 
                } else{

                    //busy cell onclick

                    posXfrom=j;
                    posYfrom=i;
                    
                    let cells=boardGrid.querySelectorAll(".cell");
                    for(let cell of cells){
                        if(cell.classList.contains("clicked")){
                            cell.classList.remove("clicked");
                        }
                    }

                    cell.classList.add("clicked")
                    clicked=true
                }
            })
            boardGrid.append(cell)
        }
    }
}


//path searching algorithm A*

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
                if(lines[k][i][0].color==board[y][x].color && board[y][x].color!="no-color"){
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
                    board[lines[k][i][2]][lines[k][i][1]].emptyCell();
                }
                score+=10;
            }
        }
    }

    if(oldScore!=score){
        board[y][x].emptyCell();
    }
}
createBoard();
randomFreeCells();
showBoard();
