import { fromJsonSchema, McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { CURATED_OUTFITS, CURATED_POSES, STUDIO_SCENES } from './catalog.js';
import { auditPortrait } from './audit.js';
import { AIPoseClient } from './client.js';
export function createAIPoseServer() {
    const server = new McpServer({
        name: 'aipose-mcp',
        version: '1.0.0',
    });
    const client = new AIPoseClient();
    // 1. Tool: aipose_list_poses
    server.registerTool('aipose_list_poses', {
        description: 'Browse curated professional photographic studio poses from the AIPose library. Returns biomechanical kinematics (shoulder tilt, spine twist, hand anchors, weight balance), recommended photography styles, and composition tips to avoid stiff AI generation.',
        inputSchema: fromJsonSchema({
            type: 'object',
            properties: {
                category: {
                    type: 'string',
                    enum: ['standing', 'sitting', 'leaning', 'editorial', 'glamour', 'all'],
                    description: 'Filter poses by kinematic posture category. Default is all.',
                },
                difficulty: {
                    type: 'string',
                    enum: ['beginner', 'intermediate', 'advanced'],
                    description: 'Filter poses by execution complexity.',
                },
                limit: {
                    type: 'number',
                    description: 'Maximum number of poses to return (default: 10).',
                },
            },
        }),
    }, async ({ category, difficulty, limit = 10 }) => {
        let results = [...CURATED_POSES];
        if (category && category !== 'all') {
            results = results.filter((p) => p.category === category);
        }
        if (difficulty) {
            results = results.filter((p) => p.difficulty === difficulty);
        }
        results = results.slice(0, limit);
        const payload = {
            total: results.length,
            poses: results.map((p) => ({
                id: p.id,
                name: p.name,
                nameZh: p.nameZh,
                category: p.category,
                difficulty: p.difficulty,
                kinematics: p.kinematics,
                compositionTip: p.compositionTip,
                recommendedFor: p.recommendedFor,
                supportedCameraAngles: p.cameraAngles,
            })),
            studioWebReference: 'https://aipose.org/#studio',
        };
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(payload, null, 2),
                },
            ],
        };
    });
    // 2. Tool: aipose_list_outfits
    server.registerTool('aipose_list_outfits', {
        description: 'Browse curated diffusion-optimized apparel styles and color harmonies (70-20-10 rule). Returns textile physics ratings, moiré risk warnings, and copy-paste prompts for crisp photo studio fashion synthesis.',
        inputSchema: fromJsonSchema({
            type: 'object',
            properties: {
                style: {
                    type: 'string',
                    enum: ['minimalist', 'parisian', 'formal', 'casual', 'couture', 'all'],
                    description: 'Style category filter.',
                },
            },
        }),
    }, async ({ style }) => {
        let results = [...CURATED_OUTFITS];
        if (style && style !== 'all') {
            results = results.filter((o) => o.style === style);
        }
        const payload = {
            total: results.length,
            outfits: results,
            scenes: STUDIO_SCENES,
            aestheticGuidance: {
                colorRule: '70% Main Volume, 20% Secondary Layer, 10% High-Contrast Accent',
                antiMoiréTip: 'Avoid micro-houndstooth or dense stripes under 3mm to prevent sensor moiré artifacts in diffusion.',
            },
        };
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(payload, null, 2),
                },
            ],
        };
    });
    // 3. Tool: aipose_audit_portrait
    server.registerTool('aipose_audit_portrait', {
        description: 'Forensically audit an uploaded selfie or portrait against the 4 Golden Rules of AI Pose Transfer (optical focal length distortion, micro skin texture, 45° directional daylight, unobstructed facial landmarks). Returns a 0-100 score, ArcFace likeness retention prognosis, and exact remedies before spending credits.',
        inputSchema: fromJsonSchema({
            type: 'object',
            properties: {
                imageUrl: {
                    type: 'string',
                    description: 'Optional direct URL to the portrait image.',
                },
                focalLengthType: {
                    type: 'string',
                    enum: ['1x_wide_angle', '2x_3x_telephoto', '50mm_85mm_prime', 'unknown'],
                    description: 'Camera lens type used. 1x smartphone selfies suffer from barrel distortion.',
                },
                lightingType: {
                    type: 'string',
                    enum: ['diffused_window_daylight', 'harsh_overhead_light', 'direct_flash', 'backlit'],
                    description: 'Ambient lighting condition when taking the photo.',
                },
                hasBeautyFilter: {
                    type: 'boolean',
                    description: 'Whether third-party beauty app smoothing or slimming filters were active.',
                },
                hasFacialOcclusion: {
                    type: 'boolean',
                    description: 'Whether bangs, sunglasses, masks, or hands obstruct the eyes, nose, or jawline.',
                },
                resolutionWidth: {
                    type: 'number',
                    description: 'Image pixel width (e.g. 1080).',
                },
                resolutionHeight: {
                    type: 'number',
                    description: 'Image pixel height (e.g. 1440).',
                },
                notes: {
                    type: 'string',
                    description: 'Any additional notes about the portrait source.',
                },
            },
        }),
    }, async (input) => {
        const report = auditPortrait(input);
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(report, null, 2),
                },
            ],
        };
    });
    // 4. Tool: aipose_transfer_pose
    server.registerTool('aipose_transfer_pose', {
        description: 'Execute or schedule an AI pose transformation on AIPose (aipose.org). Clones a target 3D studio pose onto the user portrait while strictly preserving biometric facial likeness (ArcFace > 0.86) without training a LoRA. Deducts 1 credit per 4-draft exploration pass.',
        inputSchema: fromJsonSchema({
            type: 'object',
            properties: {
                portraitUrl: {
                    type: 'string',
                    description: 'Public or presigned URL of the user source portrait.',
                },
                poseId: {
                    type: 'string',
                    description: 'Studio pose ID from aipose_list_poses (e.g. pose_contrapposto_classic).',
                },
                outfitId: {
                    type: 'string',
                    description: 'Optional outfit preset ID from aipose_list_outfits.',
                },
                sceneId: {
                    type: 'string',
                    description: 'Optional scene preset ID (e.g. scene_parisian_loft).',
                },
                customOutfitPrompt: {
                    type: 'string',
                    description: 'Optional custom clothing prompt if outfitId is not specified.',
                },
                denoiseStrength: {
                    type: 'number',
                    description: 'Denoising balance factor between 0.55 (max face lock) and 0.75 (max pose flexibility). Default: 0.65.',
                },
            },
            required: ['portraitUrl', 'poseId'],
        }),
    }, async (input) => {
        try {
            const result = await client.generateStudioPose(input);
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: true,
                            jobId: result.jobId,
                            status: result.status,
                            resultUrl: result.resultImageUrl,
                            creditsSpent: result.creditsDeducted,
                            interactiveStudioUrl: result.studioUrl,
                            message: 'Pose transfer initiated. ArcFace cross-attention locks facial identity without fine-tuning.',
                        }, null, 2),
                    },
                ],
            };
        }
        catch (err) {
            return {
                isError: true,
                content: [
                    {
                        type: 'text',
                        text: `Pose transfer failed: ${err.message}`,
                    },
                ],
            };
        }
    });
    // 5. Tool: aipose_get_pricing_and_credits
    server.registerTool('aipose_get_pricing_and_credits', {
        description: 'Inspect AIPose plan pricing, credit economy, and free trial allowances. 12 free credits are awarded upon registration (sufficient for 12 pose draft explorations or 3 high-def 2K master renders).',
        inputSchema: fromJsonSchema({
            type: 'object',
            properties: {},
        }),
    }, async () => {
        const creditStatus = await client.getCreditStatus();
        const payload = {
            userStatus: creditStatus,
            accountingRule: {
                draftExploration: '1 credit (Generates 4 candidate pose drafts at 1024x1024)',
                hdMasterRender: '4 credits (High-def 2K photorealistic upscaler + dermal texture recovery)',
                welcomeGift: '12 free trial credits upon sign-up (No credit card required)',
            },
            subscriptionPlans: [
                {
                    plan: 'Basic (Monthly)',
                    price: '$9.90 / mo',
                    credits: 150,
                    validity: '31 days',
                    posePass: 'Available as add-on',
                },
                {
                    plan: 'Pro (Monthly) [Popular]',
                    price: '$19.90 / mo',
                    credits: 400,
                    validity: '31 days',
                    posePass: 'Included free (Unlocks all 220+ member studio poses)',
                },
                {
                    plan: 'Annual Plans',
                    discount: 'Save 17% (10 months price for 12 months credits upfront, valid 366 days)',
                    basicAnnual: '$99.00 / yr (1,800 credits)',
                    proAnnual: '$199.00 / yr (4,800 credits + Pose Pass)',
                },
                {
                    plan: 'One-Time Credit Pack',
                    price: '$4.99 one-time',
                    credits: 60,
                    validity: 'Never expires (No recurring subscription)',
                },
            ],
            signUpUrl: 'https://aipose.org/#studio',
            pricingUrl: 'https://aipose.org/pricing',
        };
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(payload, null, 2),
                },
            ],
        };
    });
    return server;
}
export function startStdioServer() {
    serveStdio(async () => createAIPoseServer(), {
        onerror: (err) => {
            console.error('AIPose MCP server error:', err);
        },
    });
}
