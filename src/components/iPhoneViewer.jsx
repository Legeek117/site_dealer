import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Float } from '@react-three/drei';
import { Info } from 'lucide-react';
import LocalIPhoneModel from './LocalIPhoneModel';

const iPhoneViewer = ({ color = '#1c1c1e', defect = null }) => {
    return (
        <div className="glass-card 3d-container" style={{ height: '500px', width: '100%', cursor: 'grab', position: 'relative', overflow: 'hidden' }}>
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 35 }}>
                <Suspense fallback={null}>
                    <color attach="background" args={['#050505']} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Stage intensity={0.6} contactShadow={true} shadowBias={-0.0015}>
                            <LocalIPhoneModel color={color} defect={defect} />
                        </Stage>
                    </Float>
                    <OrbitControls makeDefault enablePan={false} enableZoom={true} minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
                </Suspense>
            </Canvas>

            <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '11px',
                color: 'white',
                backdropFilter: 'blur(10px)',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <Info size={14} />
                Inspection 3D 100% Locale (Offline)
            </div>

            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                backgroundColor: 'rgba(52, 199, 89, 0.5)',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '12px',
                color: 'white',
                backdropFilter: 'blur(10px)',
                fontWeight: '600'
            }}>
                Sécurisé & Rapide
            </div>
        </div>
    );
};

export default iPhoneViewer;
