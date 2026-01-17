import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Environment, useGLTF, Float } from '@react-three/drei';
import { Info, AlertCircle } from 'lucide-react';
import LocalIPhoneModel from './LocalIPhoneModel';

class ModelErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() { return { hasError: true }; }
    render() {
        if (this.state.hasError) {
            return <LocalIPhoneModel color={this.props.color} defect={this.props.defect} />;
        }
        return this.props.children;
    }
}

function RemoteModel({ color, defect, ...props }) {
    // Attempting to load remote model
    const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf');

    if (materials['body']) {
        materials['body'].color.set(color || '#222');
    }

    return <primitive object={nodes.Scene} {...props} />;
}

const iPhoneViewer = ({ color = '#1c1c1e', defect = null }) => {
    return (
        <div className="glass-card 3d-container" style={{ height: '500px', width: '100%', cursor: 'grab', position: 'relative', overflow: 'hidden' }}>
            <Canvas shadows dpr={[1, 2]}>
                <Suspense fallback={<LocalIPhoneModel color={color} defect={defect} />}>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
                    <Environment preset="city" />
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Stage environment="city" intensity={0.6} contactShadow={true} shadowBias={-0.0015}>
                            <ModelErrorBoundary color={color} defect={defect}>
                                <RemoteModel color={color} defect={defect} scale={0.01} />
                            </ModelErrorBoundary>
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
                Inspection 3D Interactive
            </div>

            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                backgroundColor: 'rgba(0,113,227,0.5)',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '12px',
                color: 'white',
                backdropFilter: 'blur(10px)',
                fontWeight: '600'
            }}>
                Haute Fidélité
            </div>
        </div>
    );
};

export default iPhoneViewer;
