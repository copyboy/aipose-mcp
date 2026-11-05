/**
 * AIPose Cloud Engine Client.
 * Connects to AIPose REST APIs using API Key authentication.
 */
export interface AIPoseConfig {
    apiKey?: string;
    baseUrl?: string;
}
export interface CreditStatus {
    totalRemaining: number;
    activePlan: string;
    hasPosePass: boolean;
    canGenerate: boolean;
}
export interface GeneratePoseInput {
    portraitUrl: string;
    poseId: string;
    outfitId?: string;
    sceneId?: string;
    customOutfitPrompt?: string;
    denoiseStrength?: number;
}
export interface GeneratePoseResult {
    jobId: string;
    status: 'completed' | 'queued' | 'processing';
    resultImageUrl?: string;
    creditsDeducted: number;
    studioUrl: string;
}
export declare class AIPoseClient {
    private apiKey;
    private baseUrl;
    constructor(config?: AIPoseConfig);
    hasApiKey(): boolean;
    getCreditStatus(): Promise<CreditStatus>;
    generateStudioPose(input: GeneratePoseInput): Promise<GeneratePoseResult>;
}
//# sourceMappingURL=client.d.ts.map