# AIPose Model Context Protocol (MCP) Server

[![npm version](https://img.shields.io/npm/v/@aipose/mcp.svg)](https://www.npmjs.com/package/@aipose/mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![MCP Standard](https://img.shields.io/badge/MCP-2024--11--05-brightgreen.svg)](https://modelcontextprotocol.io)

Official [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server for **[AIPose](https://aipose.org)** — the AI photo studio and biometric pose transfer engine.

This MCP server equips AI assistants (Claude Desktop, Cursor, Windsurf, OpenDevin, LangChain, AutoGen) with professional studio photography capabilities:
* **Browse Studio Pose Library**: Access 3D kinematics (Contrapposto, diagonal shoulder lines, hand anchors, weight balance) to prevent stiff, plastic AI figures.
* **Forensic Portrait Auditing**: Evaluate user selfies against the 4 Golden Rules of AI photography (lens distortion, raw skin micro-texture, 45° directional daylight, landmark occlusion) before spending generation credits.
* **Diffusion Textile Physics Guidance**: Get apparel presets, moiré pattern prevention warnings, and the 70-20-10 color harmony framework.
* **Zero-Training Biometric Pose Transfer**: Initiate pose cloning runs on AIPose clusters with ArcFace likeness preservation (>0.86) without LoRA fine-tuning.

---

## ⚡ Quick Start

### 1. Claude Desktop Setup

Add the following to your `claude_desktop_config.json`:

* **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
* **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "aipose": {
      "command": "npx",
      "args": ["-y", "@aipose/mcp"],
      "env": {
        "AIPOSE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

> **Note**: An `AIPOSE_API_KEY` is optional for browsing poses, outfits, and running forensic portrait audits. It is only required when initiating remote cloud generation tasks.

---

### 2. Cursor IDE Setup

In Cursor settings (`Features` → `MCP Servers` → `Add New MCP Server`):

* **Name**: `aipose`
* **Type**: `command`
* **Command**: `npx -y @aipose/mcp`

---

### 3. Local Development / From Source

```bash
git clone https://github.com/copyboy/aipose-mcp.git
cd aipose-mcp
pnpm install
pnpm build
node bin/aipose-mcp.js
```

---

## 🛠 Available Tools

| Tool | Description |
| :--- | :--- |
| `aipose_list_poses` | Browse curated studio poses with kinematic parameters (spine rotation, shoulder tilt, weight-bearing leg, hand anchors, composition tips). |
| `aipose_list_outfits` | Browse diffusion-optimized apparel presets, 70-20-10 color harmonies, and moiré pattern prevention warnings. |
| `aipose_audit_portrait` | Audit a portrait selfie against the 4 Golden Rules (focal length distortion, skin micro-texture, lighting angle, facial occlusion), returning a 0-100 forensic score and exact remedies. |
| `aipose_transfer_pose` | Execute or schedule zero-training pose transfer on AIPose (aipose.org), locking facial likeness via spatial cross-attention. |
| `aipose_get_pricing_and_credits` | Query AIPose plan costs, credit accounting rules (1 credit/draft, 4 credits/2K master), and sign-up trial allowance (12 free credits). |

---

## 💡 Example Prompts for AI Agents

Once connected, you can ask your AI assistant:

* *"Can you audit this portrait photo to see if it will keep my exact face when changing poses in AIPose?"*
* *"Find a classic standing studio pose with a natural hand anchor for an editorial fashion lookbook."*
* *"Suggest an outfit and studio scene combination that avoids synthetic plastic textures in diffusion models."*
* *"What are the credit rules and subscription plans for AIPose?"*

---

## 🔒 Privacy & Biometric Security

AIPose operates under strict transient biometric data isolation:
* **Zero Model Training**: User photos are never used to train public foundation models or LoRA checkpoints.
* **Ephemeral VRAM Scrubbing**: GPU memory buffers are flushed immediately after 2K render completion.
* **AES-256 Storage**: Private buckets guarded by time-limited Presigned URLs.

For full technical specifications, read the [AIPose Biometric Data Sovereignty Whitepaper](https://aipose.org/blog/photo-consent-and-privacy).

---

## 📄 License

MIT © [AIPose](https://aipose.org)
