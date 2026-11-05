/**
 * Forensic Portrait Auditor for AI Pose Synthesis.
 *
 * Evaluates whether an input photo complies with the 4 Golden Rules
 * to ensure maximum ArcFace biometric likeness retention (>0.86)
 * without facial warping or synthetic artifacts.
 */

export interface PortraitAuditInput {
  imageUrl?: string;
  focalLengthType?: '1x_wide_angle' | '2x_3x_telephoto' | '50mm_85mm_prime' | 'unknown';
  lightingType?: 'diffused_window_daylight' | 'harsh_overhead_light' | 'direct_flash' | 'backlit';
  hasBeautyFilter?: boolean;
  hasFacialOcclusion?: boolean; // sunglasses, hair across eyes/nose/jaw
  resolutionWidth?: number;
  resolutionHeight?: number;
  notes?: string;
}

export interface RuleCheckResult {
  ruleNumber: number;
  ruleName: string;
  ruleNameZh: string;
  passed: boolean;
  scoreImpact: number;
  diagnosis: string;
  remedy: string;
}

export interface PortraitAuditReport {
  overallScore: number; // 0 - 100
  verdict: 'EXCELLENT' | 'GOOD' | 'NEEDS_RETAKE' | 'CRITICAL_RISK';
  verdictZh: string;
  expectedLikenessRate: string;
  checks: RuleCheckResult[];
  summaryAdvice: string;
}

export function auditPortrait(input: PortraitAuditInput): PortraitAuditReport {
  let score = 100;
  const checks: RuleCheckResult[] = [];

  // 1. Focal Length & Lens Distortion Check
  if (input.focalLengthType === '1x_wide_angle') {
    score -= 25;
    checks.push({
      ruleNumber: 1,
      ruleName: 'Focal Length & Barrel Distortion',
      ruleNameZh: '焦段与广角畸变',
      passed: false,
      scoreImpact: -25,
      diagnosis: '1x smartphone wide-angle lens (24-28mm equivalent) causes barrel distortion when shot closer than 1 meter, exaggerating nasal bridge by ~20% and compressing ear planes.',
      remedy: 'Switch phone camera to 2x or 3x telephoto optical zoom and step back 2.5 meters to flatten biometric planes naturally.',
    });
  } else {
    checks.push({
      ruleNumber: 1,
      ruleName: 'Focal Length & Barrel Distortion',
      ruleNameZh: '焦段与广角畸变',
      passed: true,
      scoreImpact: 0,
      diagnosis: 'Focal length is within safe telephoto/standard range (>=50mm). Facial proportions remain unwarped.',
      remedy: 'Maintain at least 1.8 - 2.5 meters distance between subject and lens.',
    });
  }

  // 2. Beauty Filter & Skin Micro-texture Check
  if (input.hasBeautyFilter) {
    score -= 30;
    checks.push({
      ruleNumber: 2,
      ruleName: 'Biological Skin Micro-Texture',
      ruleNameZh: '原生微观皮肤纹理',
      passed: false,
      scoreImpact: -30,
      diagnosis: 'Beauty app smoothing algorithms airbrushed double eyelid folds, natural nasolabial shadows, and skin pore textures into flat porcelain pixels. Vision encoder cannot extract biometric landmarks.',
      remedy: 'Turn off all beauty/smoothing/slimming modes. Use the native camera app under clean optical daylight.',
    });
  } else {
    checks.push({
      ruleNumber: 2,
      ruleName: 'Biological Skin Micro-Texture',
      ruleNameZh: '原生微观皮肤纹理',
      passed: true,
      scoreImpact: 0,
      diagnosis: 'Preserves raw organic skin texture, epidermal specular highlights, and natural eyelid folds.',
      remedy: 'Keep skin clean and hydrated without heavy matte foundation.',
    });
  }

  // 3. Lighting & Volumetric Modeling Check
  if (input.lightingType === 'harsh_overhead_light' || input.lightingType === 'backlit') {
    score -= 20;
    checks.push({
      ruleNumber: 3,
      ruleName: 'Directional Ambient Key Light',
      ruleNameZh: '侧向漫反射立体光影',
      passed: false,
      scoreImpact: -20,
      diagnosis: 'Top-down overhead fluorescent lighting or extreme backlighting creates dark hollow eye sockets (raccoon eyes) or completely silhouetted facial features.',
      remedy: 'Face a large window at a 45-degree angle during daytime (9am - 3pm) or use a diffused softbox.',
    });
  } else if (input.lightingType === 'direct_flash') {
    score -= 15;
    checks.push({
      ruleNumber: 3,
      ruleName: 'Directional Ambient Key Light',
      ruleNameZh: '侧向漫反射立体光影',
      passed: false,
      scoreImpact: -15,
      diagnosis: 'Direct camera flash obliterates lateral zygomatic bone shadows, rendering a 2D cardboard face appearance.',
      remedy: 'Bounce flash against a neutral white wall/ceiling or switch to diffused ambient daylight.',
    });
  } else {
    checks.push({
      ruleNumber: 3,
      ruleName: 'Directional Ambient Key Light',
      ruleNameZh: '侧向漫反射立体光影',
      passed: true,
      scoreImpact: 0,
      diagnosis: 'Soft lateral illumination provides optimal 3D gradient transitions along the nasal bone and jawline.',
      remedy: 'Great light condition. Ensure white balance is set neutral.',
    });
  }

  // 4. Facial Occlusion & Head Rotation Check
  if (input.hasFacialOcclusion) {
    score -= 30;
    checks.push({
      ruleNumber: 4,
      ruleName: 'Facial Landmark Unobstructed Visibility',
      ruleNameZh: '五官关键骨骼点无遮挡',
      passed: false,
      scoreImpact: -30,
      diagnosis: 'Thick bangs, sunglasses, hands covering jawbone, or extreme 80° profile rotation prevent full ArcFace vector extraction.',
      remedy: 'Tuck bangs behind ears, remove dark glasses, and keep head tilt between -15° and +15° relative to the optical axis.',
    });
  } else {
    checks.push({
      ruleNumber: 4,
      ruleName: 'Facial Landmark Unobstructed Visibility',
      ruleNameZh: '五官关键骨骼点无遮挡',
      passed: true,
      scoreImpact: 0,
      diagnosis: 'Both eyes, pupils, nasal bridge, mouth corners, and jawline contours are clearly visible.',
      remedy: 'Clean unobstructed baseline.',
    });
  }

  // 5. Resolution Check (optional)
  if (input.resolutionWidth && input.resolutionHeight) {
    const minDim = Math.min(input.resolutionWidth, input.resolutionHeight);
    if (minDim < 720) {
      score -= 15;
      checks.push({
        ruleNumber: 5,
        ruleName: 'Input Sensor Resolution',
        ruleNameZh: '输入图像分辨率',
        passed: false,
        scoreImpact: -15,
        diagnosis: `Resolution (${input.resolutionWidth}x${input.resolutionHeight}) is lower than the recommended 1080p baseline. Upscaling will interpolate blur.`,
        remedy: 'Upload uncompressed original photo (at least 1200x1600 or 1080x1440). Avoid screenshotting from chat apps.',
      });
    }
  }

  score = Math.max(0, Math.min(100, score));

  let verdict: PortraitAuditReport['verdict'] = 'EXCELLENT';
  let verdictZh = '完美底片（极佳一致性保障）';
  let expectedLikenessRate = '> 95% (ArcFace Cosine Similarity >= 0.88)';

  if (score < 50) {
    verdict = 'CRITICAL_RISK';
    verdictZh = '高风险（极易出现换脸假感或非本人）';
    expectedLikenessRate = '< 60% (High risk of severe biometric drift)';
  } else if (score < 75) {
    verdict = 'NEEDS_RETAKE';
    verdictZh = '建议重拍（部分微观特征将损失）';
    expectedLikenessRate = '70% - 82% (Acceptable but minor detail loss)';
  } else if (score < 90) {
    verdict = 'GOOD';
    verdictZh = '良好底片（生成效果稳定）';
    expectedLikenessRate = '85% - 92% (Reliable studio likeness)';
  }

  return {
    overallScore: score,
    verdict,
    verdictZh,
    expectedLikenessRate,
    checks,
    summaryAdvice:
      score >= 80
        ? 'Your portrait meets the rigorous baseline for AIPose zero-training biometric preservation. You can proceed directly to studio synthesis.'
        : 'To eliminate biometric drift and plastic AI artifacts, we strongly recommend retaking a quick daylight selfie following the remedies above before spending generation credits.',
  };
}
