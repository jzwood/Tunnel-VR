window.onload = function(){
  //important global vars
  var scene, camera, loader, renderer, effect;
  var isMobile, controls, clock;
  var floorPlans, player, light, spotLight;
  var scaleHeight = 0.99, mazeDimensions = 7;

  var person;

  function init(){ //thoughtful comment here
    isMobile = typeof window.orientation !== 'undefined';//using mobile device?
    scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight,
        fov = 100,
        near = 0.05,
        far = 10;
    camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    scene.add( camera );//necessary for spotlight to follow camera
    // instantiate a loader
    loader = new THREE.TextureLoader();

    //renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer({ antialias: true});

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize( window.innerWidth, window.innerHeight*scaleHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    window.addEventListener( 'resize', onWindowResize, false );
    document.body.appendChild( renderer.domElement );

    if(isMobile){
      //mobile controls
      controls = new THREE.DeviceOrientationControls( camera );

      effect = new THREE.StereoEffect(renderer);
      effect.eyeSeparation = 0.05;
      effect.setSize( window.innerWidth, window.innerHeight );

    }else{
      //desktop controls
      clock  = new THREE.Clock();
      controls = new THREE.FirstPersonControls(camera);
      controls.lookSpeed = 0.1;
      controls.movementSpeed = 0.5;
      controls.constrainVertical = true;
    }

    light = new THREE.AmbientLight( 0x7F7F7F ); // debugging light. turn off for real
    //light = new THREE.AmbientLight( 0xffffff );
    //scene.add(light);

    var flashlight = new THREE.SpotLight(0xffffff, 1, 2, Math.PI/3, 1);

    flashlight.position.set(0,0,0.1);
    flashlight.target = camera;
    flashlight.castShadow = true;
    flashlight.shadowDarkness = 0.5;
    flashlight.shadowMapWidth = 1024;
    flashlight.shadowMapHeight = 1024;

    flashlight.shadowCameraNear = 750;
    flashlight.shadowCameraFar = 4000;
    flashlight.shadowCameraFov = 30;

    camera.add(flashlight);

    floorPlans = [];
    groundFloor(mazeDimensions, loader, scene);
    floorPlans.push(drawFloor(0, mazeDimensions, loader, scene), drawFloor(1, mazeDimensions, loader, scene));
    window.fp = floorPlans;

    setupPerson(camera, floorPlans, mazeDimensions);

    var onWindowResize = function(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        if(isMobile)
          effect.setSize( window.innerWidth, window.innerHeight );
        else
          renderer.setSize( window.innerWidth, window.innerHeight*scaleHeight );
      }

    window.addEventListener("resize", onWindowResize, false);
  }

  function render() {
    requestAnimationFrame(render);
    if(isMobile){
      controls.update();
    }else{
      var delta = clock.getDelta();
      controls.update(delta);
    }
    if(isMobile){
      effect.render( scene, camera );
    }else{
      renderer.render( scene, camera );
    }
  }

  init();

  render();

}
