#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Building 782 Business Address...');

// Create a temporary tsconfig for build
const buildTsConfig = {
  compilerOptions: {
    target: 'ES2017',
    module: 'ESNext',
    lib: ['esnext', 'dom', 'dom.iterable'],
    jsx: 'react-jsx',
    noEmit: false,
    outDir: './dist',
    declaration: false,
    sourceMap: false,
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    moduleResolution: 'bundler',
    baseUrl: '.',
    resolveJsonModule: true,
    isolatedModules: true,
    allowJs: true,
    paths: {
      '@shared/*': ['./shared/*']
    }
  },
  include: ['server/**/*.ts', 'shared/**/*.ts'],
  exclude: ['node_modules', '**/*.test.ts']
};

fs.writeFileSync('tsconfig.build.json', JSON.stringify(buildTsConfig, null, 2));

try {
  // Compile TypeScript
  console.log('Compiling TypeScript...');
  execSync('tsc -p tsconfig.build.json', { stdio: 'inherit' });
  
  // Clean up build config
  fs.unlinkSync('tsconfig.build.json');
  
  console.log('✓ Build complete');
  process.exit(0);
} catch (error) {
  console.error('✗ Build failed:', error.message);
  if (fs.existsSync('tsconfig.build.json')) {
    fs.unlinkSync('tsconfig.build.json');
  }
  process.exit(1);
}
