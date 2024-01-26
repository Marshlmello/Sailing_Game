import * as THREE from "three";

import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise";

class Water {
  constructor() {
    this.waterGeometry = new THREE.PlaneGeometry(500, 500, 10, 10);
    this.waterMaterial = new THREE.MeshPhongMaterial({
      color: 0x78a8f5,
      specular: 0x000000,
      //side: THREE.DoubleSide,
      wireframe: false,
    });
    this.count = this.waterGeometry.attributes.position.count;
    this.mesh = this.init();
  }

  init() {
    const water = new THREE.Mesh(this.waterGeometry, this.waterMaterial);
    water.rotation.x = -Math.PI / 2;
    water.receiveShadow = true;

    return water;
  }

  update() {
    console.log("water is updating");
    const now = Date.now() * 0.001;
    const Noise = new ImprovedNoise();

    for (let i = 0; i < this.count; i++) {
      this.waterGeometry.attributes.position.setZ(
        i,
        Noise.noise(
          this.waterGeometry.attributes.position.getX(i),
          this.waterGeometry.attributes.position.getY(i),
          now * 0.2
        ) *
          0.1 +
          Math.sin(now * 0.8 + i / 3) * 0.08
      );
    }
    this.waterGeometry.computeVertexNormals();
    this.waterGeometry.attributes.position.needsUpdate = true;
  }
}

export { Water };
