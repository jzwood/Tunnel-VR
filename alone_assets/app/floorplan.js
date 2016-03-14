/*
 *	Jake Wood
 *	Procedural MAZE Generation using Prim's Algorithm
 *	9/1/15
 *
 */

//creates a grid with special characters to represent classes of connective cells and walls
function initMaze(side){
  var sideLen = side; //must be odd number
  var size = Math.pow(sideLen, 2);
  var mazeArray = [];
  for(var i=0; i< size; i++){
    var yVal = Math.floor(i/sideLen);
    if(i <= sideLen || i >= (sideLen*(sideLen -1)-1) || (i%sideLen === 0) || (i%sideLen === sideLen-1) ||( i%2 === 0 && yVal%2 === 0 ))
      mazeArray[i] = 9;//immutable wall
    else{
      if(i%2 === 1 && yVal%2 ==1)
        mazeArray[i] = 1;//horizontal connecting mutable wall
      else if(i%2 === 0 && yVal%2 === 1)
        mazeArray[i] = 0;//unvisited cell
      else if(i%2 === 1 && yVal%2 === 0)
        mazeArray[i] = 2;//vertical connecting mutable wall
      else if(i%2 === 0 && yVal%2 === 0)
        mazeArray[i] = 9;//immutable wall
      else
        throw "error: unreachable code reached";
    }
  }
  return mazeArray;
}

//returns list of mutable walls belonging to cell at index
function wallsOf(maze,size,index){
  var walls = [];
  if (maze[index+1] < 4)
    walls.push(index+1);
  if (maze[index-1] < 4)
    walls.push(index-1);
  if(maze[index+size] < 4)
    walls.push(index+size);
  if(maze[index-size] < 4)
    walls.push(index-size);
  return walls;
}

function getOddRandomTileIndex(dim){
  var startIndexX = Math.floor(Math.random()*(dim-1));
  if(startIndexX%2 === 0)
    startIndexX++;
  var startIndexY = Math.floor(Math.random()*(dim-1));
  if(startIndexY%2 === 0)
    startIndexY++;
  return dim * startIndexY + startIndexX;
}

//carves away solid grid of walls to make passages
function excavateMaze(foundation,sidelen){
  var startIndex = getOddRandomTileIndex(sidelen);
  foundation[startIndex] = 4;
  var walls = wallsOf(foundation,sidelen,startIndex);
  while(walls.length > 0){
    var w = walls.splice((Math.floor(Math.random()*50)+walls.length)%walls.length,1)[0];
    if (foundation[w] === 1){ //potential horizontal passageways
      if(foundation[w+1] + foundation[w-1] < 8){
        if(foundation[w-1]==4){
          foundation[w+1] = 4;
          foundation[w] = 4;
          walls = walls.concat(wallsOf(foundation,sidelen,w+1));
        }else if(foundation[w+1]==4){
          foundation[w-1] = 4;
          foundation[w] = 4;
          walls = walls.concat(wallsOf(foundation,sidelen,w-1));
        }else
          throw "error 0";
      }
    }else if (foundation[w] === 2){ //potential vertical passageways
      if(foundation[w+sidelen] + foundation[w-sidelen] < 8){
        if(foundation[w-sidelen]==4){
          foundation[w+sidelen] = 4;
          foundation[w] = 4;
          walls = walls.concat(wallsOf(foundation,sidelen,w+sidelen));
        }else if(foundation[w+sidelen]==4){
          foundation[w-sidelen] = 4;
          foundation[w] = 4;
          walls = walls.concat(wallsOf(foundation,sidelen,w-sidelen));
        }else
          throw "error 1";
      }
    }else{
      throw "error 2 " + w;
    }
  }
  return foundation;
}

//returns maze array
function makeMaze(side){
  var edge = Math.floor(side);
  if (edge%2 === 0) {
    edge++;
  }
  return excavateMaze(initMaze(edge),edge);
}

//partitions maze array into array of arrays -- easier for drawfloor
function cleanMaze(arr, side){
  arr[getOddRandomTileIndex(side)] = 'X';

  var edge = Math.floor(side);
  if (edge%2 === 0) {
    edge++;
  }
  var cols = [];
  for(var i=0; i<edge; i++){
    var row = [];
      for(var j=0; j<edge; j++){
        if(arr[i*edge+j] === 4)
          row.push(0);
        else if(arr[i*edge+j] === 'X')
          row.push(2);
        else
          row.push(1);
      }
      cols.push(row);
      row = [];
  }
  return cols;
}
