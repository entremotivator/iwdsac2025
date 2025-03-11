import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const loadLightsModel = (scene) => {
  const loader = new GLTFLoader();

  loader.load(
    "/models/wall_lamp/scene.gltf",
    (gltf) => {
      const lightModel = gltf.scene.clone(); // Clone the light GLTF model

      // Set scale for the cloned model
      lightModel.scale.set(0.02, 0.02, 0.02); // Adjust scale if necessary
      lightModel.traverse((child) => {
        if (child.isMesh) {
          // Modify material properties if needed
          child.material.metalness = 0.0;
          child.material.roughness = 0.2;
          // Enable light emission
          child.material.emissiveIntensity = 0.1; // Adjust intensity if necessary
          child.material.emissive = new THREE.Color(0xffffff); // Set emission color
          // Enable shadow casting
          child.castShadow = true;
        }
      });

      // Create clones of the light model for each wall
      const lightModels = [];
      const positions = [
        { x: 0, y: 6.7, z: -17 }, // Front wall
        { x: 0, y: 6.7, z: 17 },   // Back wall
        { x: -17, y: 6.7, z: 0 },    // Left wall
        { x: 17, y: 6.7, z: 0 },     // Right wall
      ];
      
      const rotations = [
        { x: 0, y: 0, z: 0 },   // Front wall (no rotation needed)
        { x: 0, y: Math.PI, z: 0 },          // Back wall (no rotation needed)
        { x: 0, y: Math.PI / 2, z: 0 }, // Left wall (rotate -90 degrees around the y-axis)
        { x: 0, y: -Math.PI / 2, z: 0 },  // Right wall (rotate 90 degrees around the y-axis)
      ];

      positions.forEach((position, index) => {
        const lightClone = lightModel.clone();
        lightClone.position.set(position.x, position.y, position.z);
        lightClone.rotation.set(rotations[index].x, rotations[index].y, rotations[index].z);
        
        // Adjust intensity and angle for the front wall light
        if (index === 0) {
          createSpotlight(
            position.x, 
            position.y, 
            position.z, 
            2, // Intensity (adjust as needed)
            new THREE.Vector3(0, -15, -19), // Target position
            3, // Angle (adjust as needed)
            scene
          );
        } 
        else if (index === 1) {
            createSpotlight(
              position.x, 
              position.y, 
              position.z, 
              2, // Intensity (adjust as needed)
              new THREE.Vector3(0, 0, 19), // Target position
              3, // Angle (adjust as needed)
              scene
            );
          } 
          else if (index === 2) {
            createSpotlight(
              position.x, 
              position.y, 
              position.z, 
              2, // Intensity (adjust as needed)
              new THREE.Vector3(-19, 0, 0), // Target position
              3, // Angle (adjust as needed)
              scene
            );
          } 
        else {
          createSpotlight(
            position.x, 
            position.y, 
            position.z, 
            2, // Intensity
            new THREE.Vector3(19, 0, 0), // Target position
            3, // Angle
            scene
          );
        }

        scene.add(lightClone);
        lightModels.push(lightClone);
      });

      // Optional: return lightModels array if needed for further manipulation
      return lightModels;
    },
    undefined,
    (error) => {
      console.error("An error occurred while loading the model.", error);
    }
  );
};



function createSpotlight(x, y, z, intensity, targetPosition, angle, scene) {
  const spotlight = new THREE.SpotLight(0xffffff, intensity);
  spotlight.position.set(x, y, z);
  spotlight.target.position.copy(targetPosition);
  spotlight.castShadow = true;
  spotlight.angle = angle;
  spotlight.penumbra = 1.4;
  spotlight.decay = 3;
  spotlight.distance = 30;
  spotlight.shadow.mapSize.width = 1024;
  spotlight.shadow.mapSize.height = 1024;
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight);

  // Add spotlight and its target to the scene
  scene.add(spotlight);
  scene.add(spotlight.target);
}