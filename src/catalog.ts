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
  diffusionCompatibilityScore: number; // 1-10
  diffusionPrompt: string;
  caution: string;
}

export const CURATED_POSES: StudioPose[] = [
  {
    id: 'pose_contrapposto_classic',
    name: 'Classical Contrapposto S-Curve',
    nameZh: '经典对立平衡对角 S 动势',
    category: 'standing',
    difficulty: 'beginner',
    kinematics: {
      spineRotationDegrees: 15,
      shoulderTiltDegrees: 8,
      weightBearingLeg: 'right',
      handAnchor: 'One hand hooked loosely into side pocket, other arm relaxed naturally along thigh',
      headTilt: '5 degrees toward lowered shoulder',
    },
    recommendedFor: ['Full body portraits', 'Lookbook', 'Casual chic', 'Street fashion'],
    compositionTip: 'Breaks rigid square shoulders by tilting pelvis opposite to shoulder line, creating an organic relaxed silhouette.',
    cameraAngles: ['front', 'diag', 'low'],
  },
  {
    id: 'pose_over_shoulder_turn',
    name: 'Dynamic Over-the-Shoulder 45°',
    nameZh: '微侧身 45° 回眸轮廓',
    category: 'editorial',
    difficulty: 'intermediate',
    kinematics: {
      spineRotationDegrees: 45,
      shoulderTiltDegrees: 12,
      weightBearingLeg: 'left',
      handAnchor: 'Trailing hand lightly grazing collarbone or scarf',
      headTilt: 'Turned back toward lens, jawline parallel to floor',
    },
    recommendedFor: ['Backless outfits', 'Jawline accentuation', 'Magazine covers', 'Dramatic mood'],
    compositionTip: 'Highlights three-dimensional cheekbones and neck contours while visually slimming the torso by 30%.',
    cameraAngles: ['diag', 'side'],
  },
  {
    id: 'pose_studio_wall_lean',
    name: 'Architectural Wall Lean',
    nameZh: '建筑感背斜倚靠立姿',
    category: 'leaning',
    difficulty: 'beginner',
    kinematics: {
      spineRotationDegrees: 10,
      shoulderTiltDegrees: 5,
      weightBearingLeg: 'left',
      handAnchor: 'Both arms crossed loosely across ribs without gripping',
      headTilt: 'Level with camera, chin slightly tucked',
    },
    recommendedFor: ['Business casual', 'Architectural fashion', 'Overcoats', 'Tailored suits'],
    compositionTip: 'Body rests 15 degrees against a vertical plane, projecting grounded authority without stiffness.',
    cameraAngles: ['front', 'diag'],
  },
  {
    id: 'pose_studio_chair_relaxed',
    name: 'Studio Stool Casual Perch',
    nameZh: '高脚圆凳微前倾松弛坐姿',
    category: 'sitting',
    difficulty: 'intermediate',
    kinematics: {
      spineRotationDegrees: 20,
      shoulderTiltDegrees: 10,
      weightBearingLeg: 'both',
      handAnchor: 'One elbow resting on thigh, fingers curled gently toward chin',
      headTilt: '10 degrees forward, eye-level gaze',
    },
    recommendedFor: ['LinkedIn executive headshot', 'Knitwear', 'Warm conversational portraits'],
    compositionTip: 'Only front 1/3 of the seat is used. Spine remains elongated to prevent midriff compression.',
    cameraAngles: ['front', 'diag', 'high'],
  },
  {
    id: 'pose_high_fashion_power_stance',
    name: 'Editorial Haute Couture Stance',
    nameZh: '先锋高定杂志阔腿站姿',
    category: 'glamour',
    difficulty: 'advanced',
    kinematics: {
      spineRotationDegrees: 25,
      shoulderTiltDegrees: 15,
      weightBearingLeg: 'right',
      handAnchor: 'Single hand firmly anchored on high waist, elbow pointing 45° outward',
      headTilt: 'Lifted 5 degrees, looking slightly past camera axis',
    },
    recommendedFor: ['Trench coats', 'Wide-leg trousers', 'Evening wear', 'Avant-garde styling'],
    compositionTip: 'Triangular negative spaces formed between limbs create powerful geometry and dynamic visual tension.',
    cameraAngles: ['low', 'front', 'diag'],
  },
];

export const CURATED_OUTFITS: StudioOutfit[] = [
  {
    id: 'outfit_parisian_minimalist',
    name: 'Parisian Trench & Cashmere Turtleneck',
    nameZh: '法式极简卡其风衣与羊绒高领',
    style: 'parisian',
    fabrics: ['Heavy gabardine cotton', 'Matte cashmere knit'],
    colorPalette: {
      base60: 'Warm camel / sand beige',
      secondary30: 'Oatmeal cream',
      accent10: 'Deep espresso leather',
    },
    diffusionCompatibilityScore: 9.8,
    diffusionPrompt: 'wearing a crisp tailored camel gabardine trench coat over a textured cream cashmere turtleneck, rich fabric folds, photorealistic textile weave, studio key light',
    caution: 'Avoid shiny synthetic polyester prompts to prevent plastic specular artifacts.',
  },
  {
    id: 'outfit_structured_blazer',
    name: 'Architectural Charcoal Wool Blazer',
    nameZh: '炭灰色垫肩精纺羊毛西装',
    style: 'formal',
    fabrics: ['Worsted wool', 'Silk lining'],
    colorPalette: {
      base60: 'Deep charcoal grey',
      secondary30: 'Crisp optical white',
      accent10: 'Silver button accents',
    },
    diffusionCompatibilityScore: 9.5,
    diffusionPrompt: 'wearing a razor-sharp charcoal wool double-breasted blazer with peaked lapels and subtle melange texture, clean architectural shoulder pads, white silk shirt collar',
    caution: 'Avoid dense houndstooth or tight micro-checks under 2mm to eliminate moire pattern interference.',
  },
  {
    id: 'outfit_silk_slip_and_knit',
    name: 'Silk Slip Dress & Chunky Mohair Cardi',
    nameZh: '真丝缎面吊带裙配松弛马海毛针织',
    style: 'minimalist',
    fabrics: ['Mulberry silk satin', 'Fluffy mohair wool'],
    colorPalette: {
      base60: 'Champagne ivory',
      secondary30: 'Soft muted taupe',
      accent10: 'Delicate gold chain',
    },
    diffusionCompatibilityScore: 9.2,
    diffusionPrompt: 'wearing a luminous champagne mulberry silk slip dress with fluid drape, paired with an oversized off-shoulder taupe mohair knit cardigan, soft tactile contrast',
    caution: 'Ensure diffusion steps >= 30 for proper organic specular sheen without posterization.',
  },
];

export const STUDIO_SCENES = [
  {
    id: 'scene_parisian_loft',
    name: 'Haussmann Parisian Apartment',
    nameZh: '奥斯曼法式公寓高窗白墙',
    lighting: 'Soft diffused natural daylight pouring through floor-to-ceiling French windows',
    backdrop: 'Muted cream walls with ornate baroque plaster mouldings, herringbone oak parquet',
  },
  {
    id: 'scene_minimal_studio',
    name: 'Neutral Cyclorama Studio',
    nameZh: '无影灰胶片棚',
    lighting: 'Large octabox key light with subtle fill card, clean studio shadows',
    backdrop: 'Seamless warm grey 18% neutral backdrop, soft gradient falloff',
  },
  {
    id: 'scene_editorial_sunlight',
    name: 'Architectural Shadow Gallery',
    nameZh: '光影交错艺术画廊',
    lighting: 'High-contrast directional late afternoon sunbeams creating Venetian blind patterns',
    backdrop: 'Concrete minimalist exhibition space, clean vertical planes',
  },
];
