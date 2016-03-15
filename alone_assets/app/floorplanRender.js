///////////////////////////////////////////////
/* BELOW USES THREE.JS TO DRAW MAZE BY FLOOR */
//////////////////////////////////////////////

var simpleGraphics = true;

//uses
function drawFloor(elevation, dims, loader, scene){
  var floorPlans = cleanMaze(makeMaze(dims),dims),
      walls = [];
  for(var i=0; i<dims; i++){
    for(var j=0; j<dims; j++){
      // var rot = j%2 === 0 ? 0 : Math.PI/2;
      var rot = 0;
      if (floorPlans[i][j] === 1)
        makeWall(i,elevation,j,rot,loader,scene);
      else if(floorPlans[i][j] === 0)
        drawCeiling(i,elevation,j, dims,loader, scene);
    }
  }
  return floorPlans;
}

function groundFloor(dims, loader, scene){
  for(var i=0; i<dims; i++){
    for(var j=0; j<dims; j++){
      drawCeiling(i,-1,j, dims,loader, scene);
    }
  }
}

function makeWall(x,y,z,r,loader,scene){
  var WALLWIDTH = 1,
      WALLHEIGHT= 1,
      WALLDEPTH = 1;
  var geo = new THREE.BoxGeometry( WALLWIDTH, WALLDEPTH, WALLHEIGHT );
  // load a resource
  if(!simpleGraphics){
    loader.load('alone_assets/images/concrete2.jpg', function ( tex ) {
        // var texture = new THREE.TextureLoader().load( 'assets/images/' );
        var mat = new THREE.MeshPhongMaterial({ map: tex }),
            cube = new THREE.Mesh(geo,mat);
        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;
        cube.castShadow = true;
        cube.receiveShadow = false;
        scene.add( cube );
      },
      function ( xhr ) { // Function called when download progresses
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      },
      function ( xhr ) { // Function called when download errors
        console.log( xhr, 'Texture Load Error Occurred' );
      });
    }else{
      var cols = ["#B7B7B7", "#BAB1AA", "#BEAB9D", "#C2A590", "#C69F84", "#CA9977", "#CD936A", "#D18D5E", "#D58751", "#D98144", "#DD7B38"];
      var mat = new THREE.MeshPhongMaterial({ color: cols[Math.floor(Math.random()*cols.length)] }),
          cube = new THREE.Mesh(geo,mat);
      cube.position.x = x;
      cube.position.y = y;
      cube.position.z = z;
      cube.castShadow = true;
      cube.receiveShadow = false;
      scene.add( cube );
    }
  }

//draws the floor tile for a given position
function drawCeiling(x, y, z, dims, loader, scene){
  var WALLWIDTH = 1,
      WALLHEIGHT= 1,
      WALLDEPTH = 0.01;

  y+=0.5;
  var geo = new THREE.BoxGeometry( WALLWIDTH, WALLDEPTH, WALLHEIGHT );
  // load a resource
  if(!simpleGraphics){
    loader.load('alone_assets/images/concrete2.jpg', function ( tex ) {
        // var texture = new THREE.TextureLoader().load( 'assets/images/' );
        var mat = new THREE.MeshPhongMaterial({ map: tex }),
            cube = new THREE.Mesh(geo,mat);
        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;
        cube.castShadow = true;
        cube.receiveShadow = false;
        scene.add( cube );
      },
      function ( xhr ) { // Function called when download progresses
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      },
      function ( xhr ) { // Function called when download errors
        console.log( xhr, 'Texture Load Error Occurred' );
      });
    }else{
      var cols = ["#B7B7B7", "#AFB1BA", "#A8ABBE", "#A0A5C2", "#999FC6", "#9299CA", "#8A93CD", "#838DD1", "#7B87D5", "#7481D9", "#6D7BDD"];
      var mat = new THREE.MeshPhongMaterial({ color: cols[Math.floor(Math.random()*cols.length)] }),
          cube = new THREE.Mesh(geo,mat);
      cube.position.x = x;
      cube.position.y = y;
      cube.position.z = z;
      cube.castShadow = true;
      cube.receiveShadow = false;
      scene.add( cube );
    }

}
