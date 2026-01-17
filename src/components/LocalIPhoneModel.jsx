import React, { useRef } from 'react';
import { RoundedBox, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const LocalIPhoneModel = ({ color = '#1c1c1e', defect }) => {
    const meshRef = useRef();

    return (
        <group ref={meshRef}>
            {/* Phone Body */}
            <RoundedBox args={[1, 2, 0.1]} radius={0.1} smoothness={4}>
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
            </RoundedBox>

            {/* Screen */}
            <RoundedBox args={[0.94, 1.94, 0.02]} radius={0.08} smoothness={4} position={[0, 0, 0.05]}>
                <meshStandardMaterial color="#000" roughness={0.1} metalness={0.1} />
            </RoundedBox>

            {/* Camera Module */}
            <group position={[-0.25, 0.7, -0.05]}>
                <RoundedBox args={[0.4, 0.4, 0.05]} radius={0.05} smoothness={4}>
                    <meshStandardMaterial color={color} roughness={0.3} />
                </RoundedBox>
                {/* Lenses */}
                <mesh position={[0.1, 0.1, -0.03]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.02, 32]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[-0.1, -0.1, -0.03]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.02, 32]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[0.1, -0.1, -0.03]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.02, 32]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
            </group>

            {/* Visual Defects simulation on Primitives */}
            {defect === 'fissure_arriere' && (
                <mesh position={[0.1, -0.3, -0.06]} rotation={[0, 0, 0.5]}>
                    <planeGeometry args={[0.8, 0.01]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
                </mesh>
            )}
            {defect === 'rayure_legere_ecran' && (
                <mesh position={[-0.2, 0.2, 0.06]} rotation={[0, 0, 0.2]}>
                    <planeGeometry args={[0.4, 0.005]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
                </mesh>
            )}
        </group>
    );
};

export default LocalIPhoneModel;
