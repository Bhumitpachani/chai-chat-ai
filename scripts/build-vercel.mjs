import { execSync } from 'node:child_process';
import { mkdirSync, cpSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function run(cmd, opts = {}) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd: root, ...opts });
}

// ─── 1. Build app with Vercel-compatible nitro preset ────────────────────────
console.log('\n📦  Step 1: Building TanStack Start with Vercel preset…');
run('NITRO_PRESET=vercel bun run build');

// Verify the server entry was produced
const serverEntry = resolve(root, 'dist/server/index.mjs');
if (!existsSync(serverEntry)) {
  console.error('❌  dist/server/index.mjs not found after build');
  process.exit(1);
}

// ─── 2. Prepare .vercel/output structure ─────────────────────────────────────
console.log('\n🗂️   Step 2: Creating .vercel/output structure…');
const vercelOut = resolve(root, '.vercel/output');
rmSync(vercelOut, { recursive: true, force: true });
mkdirSync(`${vercelOut}/functions/index.func`, { recursive: true });
mkdirSync(`${vercelOut}/static`, { recursive: true });

// ─── 3. Bundle server into a single Node.js file ─────────────────────────────
console.log('\n🔧  Step 3: Bundling server function (Node.js target)…');
run(
  [
    'bun build',
    resolve(root, 'scripts/vercel-entry.mjs'),
    '--bundle',
    '--target=node',
    '--format=esm',
    `--outfile=${vercelOut}/functions/index.func/index.js`,
  ].join(' ')
);

// ─── 4. Copy static assets ───────────────────────────────────────────────────
console.log('\n📂  Step 4: Copying static assets…');
const clientDir = resolve(root, 'dist/client');
if (existsSync(clientDir)) {
  cpSync(clientDir, `${vercelOut}/static`, { recursive: true });
  console.log('    Copied dist/client/ → .vercel/output/static/');
} else {
  console.warn('    ⚠️  dist/client/ not found — skipping static copy');
}

// ─── 5. Write Vercel function config ─────────────────────────────────────────
console.log('\n⚙️   Step 5: Writing function config…');
writeFileSync(
  `${vercelOut}/functions/index.func/.vc-config.json`,
  JSON.stringify(
    {
      runtime: 'nodejs20.x',
      handler: 'index.js',
      maxDuration: 30,
    },
    null,
    2
  )
);

// ─── 6. Write Vercel routing config ──────────────────────────────────────────
console.log('\n🔀  Step 6: Writing routing config…');
writeFileSync(
  `${vercelOut}/config.json`,
  JSON.stringify(
    {
      version: 3,
      routes: [
        { handle: 'filesystem' },
        { src: '/(.*)', dest: '/index' },
      ],
    },
    null,
    2
  )
);

console.log('\n✅  Vercel build complete!');
console.log(`    Output: ${vercelOut}`);
console.log('    Deploy with: vercel --prebuilt');
