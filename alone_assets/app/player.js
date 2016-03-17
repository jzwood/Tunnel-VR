

function setupPerson(cam, floorplans, mazedim){

  var isMoving = false, gameOver = false;

  window.playcam = cam;
  window.fpg = floorplans;


  var getStartPos = function(){ //finds a floor tile (x,y) guaranteed to not be inside a wall
    var getIndex = function(){ return Math.floor(Math.random()*(mazedim-1));}
    var startIndexX = getIndex();
    if(startIndexX%2 === 0)
      startIndexX++;
    var startIndexZ = getIndex();
    if(startIndexZ%2 === 0)
      startIndexZ++;
    cam.position.set(startIndexX, 0, startIndexZ);
  }();

  var move = function(vecDir, distance){

    cam.position.round();

    var level = floorplans[cam.position.y],
        currCell = level[cam.position.x + vecDir.x][cam.position.z + vecDir.z];

    var moveDown = function(){
      if (cam.position.y < 1) return false;
      var belowForwardVal = floorplans[cam.position.y-1][cam.position.x + vecDir.x][cam.position.z + vecDir.z];
      return vecDir.y === -1 && belowForwardVal === 2;
    }

    var endGame = function(){
      var escape = cam.position.y === 1 && currCell === 2 && vecDir.y === 1;
      if(escape){
        gameOver = true;
      }
      return escape;
    }

    if(currCell != 1 && (vecDir.y === 0 || (vecDir.y === 1 && currCell === 2)) || moveDown()){

      isMoving = true;
      var counter = 0;
      var travelDist = endGame() ? 4 : 1, step = 100;

      var movement = setInterval(function(){
        if(counter >= step){
          isMoving = false;
          clearInterval(movement);
        }else{
          cam.position.addScaledVector(vecDir,travelDist/step);
          counter ++ ;
        }
      }, 15);
    }

    // isMoving = !endGame();

  }

  var moveForward = function(){
    var direction = cam.getWorldDirection(),
        x = Math.abs(direction.x),
        y = Math.abs(direction.y),
        z = Math.abs(direction.z),
        heading = Math.max(x, y, z);

    var steps = 5, dist = 1;

    switch(heading){
      case x:
        x === direction.x ? move(new THREE.Vector3(1,0,0), dist) : move(new THREE.Vector3(-1,0,0), dist);
        break;
      case y:
        y === direction.y ? move(new THREE.Vector3(0,1,0), dist) : move(new THREE.Vector3(0,-1,0), dist);
        break;
      case z:
        z === direction.z ? move(new THREE.Vector3(0,0,1), dist) : move(new THREE.Vector3(0,0,-1), dist);
        break;
    }
  }

  window.addEventListener("keypress", function(event){
    //console.log(event.keyCode);
    if((event.keyCode === 113 || event.key === 'q') && !isMoving && !gameOver){
      moveForward();
    }
  });

}
