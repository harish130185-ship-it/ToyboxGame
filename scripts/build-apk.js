#!/usr/bin/env node
'use strict';

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const JAVA_HOME = process.env.JAVA_HOME || 'C:\\Users\\Haris\\.jdk17\\jdk-17.0.21.1+2';
const ANDROID_HOME = process.env.ANDROID_HOME || 'C:\\Users\\Haris\\AppData\\Local\\Android\\Sdk';

console.log('--- 1. Building web bundle ---');
require('./build-www.js');

console.log('\n--- 2. Syncing Capacitor ---');
execSync('npx.cmd cap sync android', { cwd: ROOT, stdio: 'inherit' });

console.log('\n--- 3. Running Gradle assembleDebug ---');
const env = {
  ...process.env,
  JAVA_HOME,
  ANDROID_HOME,
  PATH: `${path.join(JAVA_HOME, 'bin')}${path.delimiter}${process.env.PATH}`
};

execSync('.\\gradlew.bat assembleDebug', { cwd: path.join(ROOT, 'android'), env, stdio: 'inherit' });

const srcApk = path.join(ROOT, 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
const destApk = path.join(ROOT, 'LibreToybox.apk');

if (fs.existsSync(srcApk)) {
  fs.copyFileSync(srcApk, destApk);
  const sizeMb = (fs.statSync(destApk).size / (1024 * 1024)).toFixed(2);
  console.log(`\nSuccess! APK built successfully (${sizeMb} MB): ${destApk}`);
}
