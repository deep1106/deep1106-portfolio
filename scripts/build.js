const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');

// Clean dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(path.join(distDir, 'functions', 'api'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'css'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'js'), { recursive: true });

// Copy static files
const copyRecursive = (src, dest) => {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(file => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

// Copy public files
copyRecursive(path.join(rootDir, 'public'), distDir);

// Copy functions
copyRecursive(path.join(rootDir, 'functions'), path.join(distDir, 'functions'));

console.log('✅ Build complete! Files copied to /dist');
console.log('📦 Ready for deployment to Cloudflare Pages');
