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
    hasFacialOcclusion?: boolean;
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
    overallScore: number;
    verdict: 'EXCELLENT' | 'GOOD' | 'NEEDS_RETAKE' | 'CRITICAL_RISK';
    verdictZh: string;
    expectedLikenessRate: string;
    checks: RuleCheckResult[];
    summaryAdvice: string;
}
export declare function auditPortrait(input: PortraitAuditInput): PortraitAuditReport;
//# sourceMappingURL=audit.d.ts.map