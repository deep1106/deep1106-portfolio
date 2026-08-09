const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(process.cwd());
const distDir = path.join(rootDir, 'dist');

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

const copyRecursive = (src, dest) => {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((file) => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

['public', 'functions'].forEach((dir) => {
  const src = path.join(rootDir, dir);
  const dest = path.join(distDir, dir);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing source directory: ${src}`);
  }
  copyRecursive(src, dest);
});

// Ensure index.html is served from root
const publicIndex = path.join(distDir, 'public', 'index.html');
const rootIndex = path.join(distDir, 'index.html');
if (fs.existsSync(publicIndex)) {
  fs.copyFileSync(publicIndex, rootIndex);
}

console.log('Build complete!');
