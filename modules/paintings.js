import * as THREE from 'three';

import { paintingData } from './paintingData.js';

export function createPaintings(scene, textureLoader) {
  let paintings = [];

  paintingData.forEach((data) => {
    // Use BoxBufferGeometry instead of BoxGeometry
    const paintingGeometry = new THREE.BoxGeometry(data.width, data.height, 0.2); // Increased thickness to 0.5
    // Define bevel parameters
    const bevelSize = 1;
    const bevelSegments = 1;
    const bevelEnabled = true;
    // Create materials for each side of the painting
    const paintingMaterials = [
      // Front side
      new THREE.MeshLambertMaterial({ map: textureLoader.load("/OfficeCeiling004_1K-JPG/OfficeCeiling004_1K-JPG_Color.jpg")}),
      // Back side (optional)
      new THREE.MeshBasicMaterial({ map: textureLoader.load("/OfficeCeiling004_1K-JPG/OfficeCeiling004_1K-JPG_Color.jpg")}),
      // Top side (optional)
      new THREE.MeshBasicMaterial({ map: textureLoader.load("/OfficeCeiling004_1K-JPG/OfficeCeiling004_1K-JPG_Color.jpg")}),
      // Bottom side (optional)
      new THREE.MeshBasicMaterial({ map: textureLoader.load("/OfficeCeiling004_1K-JPG/OfficeCeiling004_1K-JPG_Color.jpg")}),
      // Left side (optional)
      new THREE.MeshBasicMaterial({ map: textureLoader.load(data.imgSrc) }),
      // Right side (optional)
      new THREE.MeshBasicMaterial({ map: textureLoader.load("/OfficeCeiling004_1K-JPG/OfficeCeiling004_1K-JPG_Color.jpg")}),
    ];
    // Apply beveling to the geometry
    paintingGeometry.computeVertexNormals(); // Compute vertex normals for correct shading
    const painting = new THREE.Mesh(paintingGeometry, paintingMaterials);

    painting.position.set(data.position.x, data.position.y, data.position.z);
    painting.rotation.y = data.rotationY;

    painting.userData = {
      type: 'painting',
      info: data.info,
      url: data.info.link,
    };

    painting.castShadow = true;
    painting.receiveShadow = true;

    paintings.push(painting);
  });

  // Add directional light to cast shadows
  const light = new THREE.DirectionalLight(0xffffff, 0); // White light with intensity 1
  light.position.set(10, 20, 10); // Adjust light position as needed
  light.castShadow = true;
  scene.add(light);

  return paintings;
}
