/**
 * AIPose Cloud Engine Client.
 * Connects to AIPose REST APIs using API Key authentication.
 */
export class AIPoseClient {
    apiKey;
    baseUrl;
    constructor(config = {}) {
        this.apiKey = config.apiKey || process.env.AIPOSE_API_KEY || '';
        this.baseUrl = (config.baseUrl || process.env.AIPOSE_BASE_URL || 'https://aipose.org').replace(/\/+$/, '');
    }
    hasApiKey() {
        return Boolean(this.apiKey && this.apiKey.trim().length > 0);
    }
    async getCreditStatus() {
        if (!this.hasApiKey()) {
            return {
                totalRemaining: 12, // Default trial allowance for new users
                activePlan: 'Free Trial',
                hasPosePass: false,
                canGenerate: true,
            };
        }
        try {
            const res = await fetch(`${this.baseUrl}/api/credits`, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                },
            });
            if (!res.ok) {
                throw new Error(`AIPose API error: HTTP ${res.status}`);
            }
            const data = await res.json();
            return {
                totalRemaining: data?.data?.balance ?? 0,
                activePlan: data?.data?.plan ?? 'Standard',
                hasPosePass: Boolean(data?.data?.hasPosePass),
                canGenerate: (data?.data?.balance ?? 0) > 0,
            };
        }
        catch {
            // Fallback
            return {
                totalRemaining: 0,
                activePlan: 'Connected (Offline balance)',
                hasPosePass: false,
                canGenerate: true,
            };
        }
    }
    async generateStudioPose(input) {
        const isMockOrUnset = !this.hasApiKey();
        if (isMockOrUnset) {
            // Return preview guidance and direct handoff link when running in developer/demo mode
            const simulatedJobId = `job_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
            return {
                jobId: simulatedJobId,
                status: 'queued',
                resultImageUrl: 'https://aipose.org/imgs/studio/sample-pose-contrapposto-2k.jpg',
                creditsDeducted: 1,
                studioUrl: `https://aipose.org/#studio?pose=${encodeURIComponent(input.poseId)}&ref=${encodeURIComponent(input.portraitUrl)}`,
            };
        }
        const response = await fetch(`${this.baseUrl}/api/studio/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                source_image: input.portraitUrl,
                pose_id: input.poseId,
                outfit_id: input.outfitId,
                scene_id: input.sceneId,
                prompt: input.customOutfitPrompt,
                denoise: input.denoiseStrength ?? 0.65,
            }),
        });
        if (!response.ok) {
            const errBody = await response.text();
            throw new Error(`AIPose Studio generation failed [${response.status}]: ${errBody}`);
        }
        const json = await response.json();
        return {
            jobId: json?.data?.id || `job_${Date.now()}`,
            status: 'completed',
            resultImageUrl: json?.data?.imageUrl,
            creditsDeducted: json?.data?.creditsDeducted ?? 1,
            studioUrl: `${this.baseUrl}/my-show`,
        };
    }
}
