import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AirplaneScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Create airplane shape with realistic front
    const airplaneGroup = new THREE.Group();

    // Airplane body (cylinder, sleeker shape)
    const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.4, 5, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.x = Math.PI / 2; // Rotate the body to lay horizontally
    airplaneGroup.add(body);

    // Airplane nose (cone)
    const noseGeometry = new THREE.ConeGeometry(0.25, 1, 32);
    const noseMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 0, 2.5); // Position at the front of the airplane
    airplaneGroup.add(nose);

    // Airplane cockpit (glass)
    const cockpitGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const cockpitMaterial = new THREE.MeshStandardMaterial({ color: 0x87cefa, opacity: 0.5, transparent: true });
    const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
    cockpit.position.set(0, 0, 3); // Position in front of the airplane body
    airplaneGroup.add(cockpit);

    // Airplane tail (cone)
    const tailGeometry = new THREE.ConeGeometry(0.2, 1, 4);
    const tailMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(0, 0, -2.5); // Position at the back
    tail.rotation.x = Math.PI; // Rotate for better look
    airplaneGroup.add(tail);

    // Airplane wings (box)
    const wingGeometry = new THREE.BoxGeometry(2, 0.1, 0.5);
    const wingMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const wing = new THREE.Mesh(wingGeometry, wingMaterial);
    wing.position.set(0, 0, 0); // Position in the center
    airplaneGroup.add(wing);

    scene.add(airplaneGroup);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    // Camera position
    camera.position.z = 10;

    // Create background elements (mountains, trees, and river)
    const createMountains = () => {
      const mountains = new THREE.Group();
      const geometry = new THREE.ConeGeometry(1, 2, 4);
      const material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
      for (let i = 0; i < 5; i++) {
        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.set(i * 3 - 6, -3, -10);
        mountain.rotation.y = Math.random() * Math.PI;
        mountains.add(mountain);
      }
      return mountains;
    };

    const createTrees = () => {
      const trees = new THREE.Group();
      const trunkGeometry = new THREE.CylinderGeometry(0.05, 0.1, 1);
      const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
      const treeTopGeometry = new THREE.ConeGeometry(0.5, 1, 4);
      const treeTopMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });

      for (let i = 0; i < 15; i++) {
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.set(Math.random() * 20 - 10, -2, Math.random() * 20 - 10);

        const treeTop = new THREE.Mesh(treeTopGeometry, treeTopMaterial);
        treeTop.position.set(trunk.position.x, trunk.position.y + 1, trunk.position.z);

        trees.add(trunk);
        trees.add(treeTop);
      }
      return trees;
    };

    const createRiver = () => {
      const riverGeometry = new THREE.PlaneGeometry(20, 2);
      const riverMaterial = new THREE.MeshStandardMaterial({ color: 0x1e90ff, side: THREE.DoubleSide });
      const river = new THREE.Mesh(riverGeometry, riverMaterial);
      river.rotation.x = -Math.PI / 2;
      river.position.set(0, -2, 0);
      return river;
    };

    // Create grass and runway
    const createRunway = () => {
      const runwayGeometry = new THREE.PlaneGeometry(10, 0.2);
      const runwayMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
      const runway = new THREE.Mesh(runwayGeometry, runwayMaterial);
      runway.rotation.x = -Math.PI / 2; // Rotate it horizontally
      runway.position.set(0, -1.9, 0);
      return runway;
    };

    const createGrass = () => {
      const grassGeometry = new THREE.PlaneGeometry(30, 30);
      const grassMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const grass = new THREE.Mesh(grassGeometry, grassMaterial);
      grass.rotation.x = -Math.PI / 2;
      grass.position.set(0, -2.1, 0); // Slightly lower to place below runway
      return grass;
    };

    const createPeople = () => {
      const people = new THREE.Group();

      // Simple person with cylinder for body and sphere for head
      for (let i = 0; i < 5; i++) {
        const bodyGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.set(Math.random() * 10 - 5, -1.9, Math.random() * 5 - 2);

        const headGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(body.position.x, body.position.y + 0.7, body.position.z);

        people.add(body);
        people.add(head);
      }
      return people;
    };

    // Add the elements to the scene
    scene.add(createMountains());
    scene.add(createTrees());
    scene.add(createRiver());
    scene.add(createRunway());
    scene.add(createGrass());
    scene.add(createPeople());

    // Animation (moving the airplane)
    const animate = () => {
      requestAnimationFrame(animate);

      // Move the airplane from left to right and then take off
      if (airplaneGroup.position.x < 5) {
        airplaneGroup.position.x += 0.05; // Move airplane on the runway
      } else if (airplaneGroup.position.y < 5) {
        airplaneGroup.position.y += 0.05; // Airplane moves upward (takeoff)
      }

      // Ensure airplane keeps flying straight without rotation
      airplaneGroup.rotation.x = 0;
      airplaneGroup.rotation.y = 0;
      airplaneGroup.rotation.z = 0;

      // Render the scene
      renderer.render(scene, camera);

      // Reset airplane position when it goes out of view
      if (airplaneGroup.position.x > 10) {
        airplaneGroup.position.set(-5, -1, 0);  // Reset position to the left
      }
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} />;
};

export default AirplaneScene;
