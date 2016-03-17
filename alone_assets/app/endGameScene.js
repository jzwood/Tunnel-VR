function returnSkyBox(fp, dims){

    var loadr = new THREE.CubeTextureLoader();
    window.ldr = loadr;
    var dir = 'alone_assets/images/sky/';

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
      new THREE.CubeGeometry(100, 100, 100),
      skyBoxMaterial
    );

    window.sb = skybox;

    return skybox;
}
