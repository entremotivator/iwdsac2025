import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";


export const loadBenchModel = (scene) => {
  const loader = new GLTFLoader();

  loader.load("/models/double_bench/scene.gltf", (gltf) => {
    const bench = gltf.scene.clone(); // Create clones of the bench

    // Position and add the bench clone looking at the front
    const benchFront = bench.clone();
    benchFront.position.set(0, -3.12, -8);
    benchFront.rotation.set(0, 0, 0);
    benchFront.scale.set(3, 3, 3);
    scene.add(benchFront);

    // Position and add the bench clone looking at the back
    //const benchBack = bench.clone();
    //benchBack.position.set(0, -3.12, 8); // Adjust position for the back
    //benchBack.rotation.set(0, Math.PI, 0); // Rotate 180 degrees around Y-axis for the back
    //benchBack.scale.set(3, 3, 3);
    //scene.add(benchBack);

    // Position and add the bench clone looking at the left side
    const benchLeft = bench.clone();
    benchLeft.position.set(-10, -3.12, 6); // Adjust position for the left side
    benchLeft.rotation.set(0, -Math.PI / 2, 0); // Rotate -90 degrees around Y-axis for the left side
    benchLeft.scale.set(3, 3, 3);
    scene.add(benchLeft);

    // Position and add the bench clone looking at the right side
    const benchRight = bench.clone();
    benchRight.position.set(10, -3.12, 6); // Adjust position for the right side
    benchRight.rotation.set(0, Math.PI / 2, 0); // Rotate 90 degrees around Y-axis for the right side
    benchRight.scale.set(3, 3, 3);
    scene.add(benchRight);
  });
};
