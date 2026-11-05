/**
 * Curated Photographic Studio Pose & Style Catalog for AIPose.
 *
 * Grounded in classical artistic kinematics (Contrapposto, diagonal shoulder lines,
 * natural hand anchoring) and diffusion textile physics.
 */
export interface StudioPose {
    id: string;
    name: string;
    nameZh: string;
    category: 'standing' | 'sitting' | 'leaning' | 'editorial' | 'glamour';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    kinematics: {
        spineRotationDegrees: number;
        shoulderTiltDegrees: number;
        weightBearingLeg: 'left' | 'right' | 'both';
        handAnchor: string;
        headTilt: string;
    };
    recommendedFor: string[];
    compositionTip: string;
    cameraAngles: ('front' | 'diag' | 'side' | 'high' | 'low')[];
}
export interface StudioOutfit {
    id: string;
    name: string;
    nameZh: string;
    style: 'minimalist' | 'parisian' | 'formal' | 'casual' | 'couture';
    fabrics: string[];
    colorPalette: {
        base60: string;
        secondary30: string;
        accent10: string;
    };
    diffusionCompatibilityScore: number;
    diffusionPrompt: string;
    caution: string;
}
export declare const CURATED_POSES: StudioPose[];
export declare const CURATED_OUTFITS: StudioOutfit[];
export declare const STUDIO_SCENES: {
    id: string;
    name: string;
    nameZh: string;
    lighting: string;
    backdrop: string;
}[];
//# sourceMappingURL=catalog.d.ts.map