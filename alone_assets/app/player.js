

function setupPerson(cam, floorplans, mazedim){

  var px = 1,
      py = 0,
      pz = 3;
  var isMoving = false;


  window.playcam = cam;
  window.fpg = floorplans;
  //cam.lookAt(new THREE.Vector3(0,0,0));


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

    cam.position.round ();

    var level = floorplans[cam.position.y],
        currCell = level[cam.position.x + vecDir.x][cam.position.z + vecDir.z],
        forwCell = level[cam.position.x + vecDir.x][cam.position.z + vecDir.z];

    if((forwCell != 1) && (vecDir.y === 0 || (vecDir.y === 1 && currCell === 2))){

      isMoving = true;
      var counter = 0;

      var movement = setInterval(function(){
        var travelDist = 1, step = 100
        if(counter >= step){
          isMoving = false;
          clearInterval(movement);
        }else{
          cam.position.addScaledVector(vecDir,travelDist/step);
          counter ++ ;
        }
      }, 15);
    }

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

  addEventListener("keypress", function(event){
    //console.log(event.keyCode);
    if(event.keyCode === 113 && !isMoving)
      moveForward();

  });

}
