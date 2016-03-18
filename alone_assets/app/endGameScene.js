function returnSkyBox(fp, dims){

    var endVersion = function(){
      if(querystring.search(/ending=[1-4]/) > -1){
        return querystring.match(/[1-4]/)[0];
      }else{
        return 2;
      }
    }();

    var loadr = new THREE.CubeTextureLoader();
    window.ldr = loadr;
    var dir = 'alone_assets/images/skybox/sky' + endVersion + '/';

    var cubemap = loadr.load( [
      dir+'0004.png', dir+'0002.png',
      dir+'0006.png', dir+'0005.png',
      dir+'0001.png', dir+'0003.png'
    ] );

    cubemap.format = THREE.RGBFormat;

    var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
    shader.uniforms['tCube'].value = cubemap; // apply textures to shader

    // create shader material
    var skyBoxMaterial = new THREE.ShaderMaterial( {
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
    });

    // create skybox mesh
    var skybox = new THREE.Mesh(
      new THREE.CubeGeometry(1000, 1000, 1000),
      skyBoxMaterial
    );

    skybox.isSky = true;

    window.sb = skybox;

    return skybox;
}
