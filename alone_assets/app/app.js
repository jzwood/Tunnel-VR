window.onload = function(){
  //important global vars
  var renderer, scene, camera, loader, effect;
  var controls, clock, lastRender, manager;
  var floorPlans, player, light, lantern, faceMesh;
  var scaleHeight = 0.99, mazeDimensions = 7;

  var person;

  function init(){ //thoughtful comment here
    // isMobile = typeof window.orientation !== 'undefined';//using mobile device?
    //renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer({ antialias: true});

    var initRender = function(){
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      //renderer.setSize( window.innerWidth, window.innerHeight*scaleHeight );
      renderer.setPixelRatio( window.devicePixelRatio );
    }();

    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();


    var aspect = window.innerWidth / window.innerHeight,
        fov = 100,
        near = 0.05,
        far = 2000;

    camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    scene.add( camera );//necessary for spotlight to follow camera instantiate a loader

    // Apply VR headset positional data to camera.
    controls = new THREE.VRControls(camera);
    // controls.lookSpeed = 0.1;
    // controls.movementSpeed = 0.5;
    // controls.constrainVertical = true;


    // Apply VR stereo rendering to renderer.
    // effect = new THREE.VREffect(renderer);
    effect = new THREE.StereoEffect(renderer);
    effect.eyeSeparation = 0.05;
    effect.focalLength = 0.5;
    effect.setSize(window.innerWidth, window.innerHeight);

    loader = new THREE.TextureLoader();

    // Create a VR manager helper to enter and exit VR mode.
    var params = {
      hideButton: false, // Default: false.
      isUndistorted: false // Default: false.
    };
    manager = new WebVRManager(renderer, effect, params);

    var initLights = function(){

      lantern = new THREE.SpotLight(0xffffff, 1, 2, Math.PI/3, 1);

      lantern.position.set(0,0,0.1);
      lantern.target = camera;
      lantern.castShadow = true;
      lantern.shadowDarkness = 0.5;
      lantern.shadowMapWidth = 1024;
      lantern.shadowMapHeight = 1024;

      lantern.shadowCameraNear = 750;
      lantern.shadowCameraFar = 4000;
      lantern.shadowCameraFov = 30;

      camera.add(lantern);

    }();

    var initWalls = function(){
      floorPlans = [];
      groundFloor(mazeDimensions, loader, scene);
      floorPlans.push(drawFloor(0, mazeDimensions, loader, scene), drawFloor(1, mazeDimensions, loader, scene));
      window.fp = floorPlans;
    }();

    setupPerson(camera, floorPlans, mazeDimensions);

    scene.add(returnSkyBox(floorPlans, mazeDimensions));
    // var theFace = THREE.ImageUtils.loadTexture('alone_assets/images/black.png', {}, function() {
    //   renderer.render(scene);
    // }),
    // faceMat = new THREE.MeshBasicMaterial({map: theFace}),
    // // material = new THREE.MeshPhongMaterial({color: 0xCC0000});
    // faceGeo = new THREE.PlaneGeometry(1, 1);
    //
    // faceMesh = new THREE.Mesh(faceGeo, faceMat);
    //
    // scene.add(faceMesh);

    // var getIndex = function(){ return Math.floor(Math.random()*(mazeDimensions-1));}
    // var startIndexX = getIndex();
    // if(startIndexX%2 === 0)
    //   startIndexX++;
    // var startIndexZ = getIndex();
    // if(startIndexZ%2 === 0)
    //   startIndexZ++;
    // faceMesh.position.set(startIndexX, 0, startIndexZ);
    // faceMesh.material.transparent = true;
    // endGame();

    lastRender = 0;
    this.fm = faceMesh;
  }

  function animate(timestamp) {

    // faceMesh.quaternion.copy( camera.quaternion );

    var delta = Math.min(timestamp - lastRender, 500);
    lastRender = timestamp;

    // Update VR headset position and apply to camera.
    controls.update();

    // Render the scene through the manager.
    manager.render(scene, camera, timestamp);

    requestAnimationFrame(animate);
  }

  init();
  animate(performance ? performance.now() : Date.now());

}
