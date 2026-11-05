#!/usr/bin/env node

/**
 * AIPose Official MCP Server CLI Entrypoint.
 * Communicates via JSON-RPC over Standard Input/Output (stdio).
 */

import { startStdioServer } from '../dist/index.js';

startStdioServer();
