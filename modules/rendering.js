import * as THREE from "three";
import { displayPaintingInfo, hidePaintingInfo } from "./paintingInfo.js";
import { updateMovement } from "./movement.js";

export const setupRendering = (
  scene,
  camera,
  renderer,
  paintings,
  controls,
  walls
) => {
  const clock = new THREE.Clock();

  // Create painting meshes and add them to the scene
  paintings.forEach((painting) => {
    const paintingGeometry = new THREE.BoxGeometry(
      painting.width,
      painting.height,
      painting.thickness
    );
    const paintingTexture = new THREE.TextureLoader().load(painting.imgSrc);
    const paintingMaterial = new THREE.MeshStandardMaterial({
      map: paintingTexture,
    });
    const paintingMesh = new THREE.Mesh(paintingGeometry, paintingMaterial);

    paintingMesh.position.copy(painting.position);
    paintingMesh.rotation.y = painting.rotationY;

    paintingMesh.castShadow = true;
    paintingMesh.receiveShadow = true;

    scene.add(paintingMesh);
  });

  let render = function () {
    const delta = clock.getDelta();

    updateMovement(delta, controls, camera, walls);

    const distanceThreshold = 8;

    let paintingToShow;
    paintings.forEach((painting) => {
      const distanceToPainting = camera.position.distanceTo(
        painting.position
      );
      if (distanceToPainting < distanceThreshold) {
        paintingToShow = painting;
      }
    });

    if (paintingToShow) {
      displayPaintingInfo(paintingToShow.userData.info);
    } else {
      hidePaintingInfo();
    }

    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
};
