import * as THREE from 'three';
import { useEffect } from 'react';
import { useThree } from '../ThreeJSManager/';

const Sky = () => {
  const setup = context => {
    const { scene } = context;
    const skyGeometry = new THREE.SphereBufferGeometry(500, 32, 32);
    skyGeometry.scale(-1, 1, 1); // invert the geometry on the x-axis so that all of the faces point inward

    const skyTexture = new THREE.TextureLoader().load(
      'TychoSkymapII.t5_04096x02048.jpg',
    );
    skyTexture.minFilter = THREE.LinearFilter;

    const skyMaterial = new THREE.MeshBasicMaterial({
      map: skyTexture,
      side: THREE.DoubleSide,
    });
    const sphere = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sphere);

    return sphere;
  };

  const { getEntity, timer } = useThree(setup);

  useEffect(
    () => {
      const sky = getEntity();
      sky.rotation.y += 0.0008;
    },
    [timer],
  );

  return null;
};

export default Sky;
