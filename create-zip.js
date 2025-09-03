import archiver from 'archiver';
import fs from 'fs';
import path from 'path';

const createProjectZip = () => {
  const output = fs.createWriteStream('qr-code-generator-project.zip');
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });

  // Listen for archive events
  output.on('close', () => {
    console.log(`✅ ZIP file created successfully!`);
    console.log(`📦 Total bytes: ${archive.pointer()}`);
    console.log(`📁 File saved as: qr-code-generator-project.zip`);
    console.log(`\n🚀 You can now download this file and upload it to GitHub!`);
  });

  archive.on('error', (err) => {
    console.error('❌ Error creating ZIP:', err);
    throw err;
  });

  // Pipe archive data to the file
  archive.pipe(output);

  // Files to include in the ZIP
  const filesToInclude = [
    'package.json',
    'index.html',
    'vite.config.ts',
    'tailwind.config.js',
    'postcss.config.js',
    'tsconfig.json',
    'tsconfig.app.json',
    'tsconfig.node.json',
    'eslint.config.js',
    'src/main.tsx',
    'src/App.tsx',
    'src/index.css',
    'src/vite-env.d.ts',
    'src/components/Header.tsx',
    'src/components/Footer.tsx',
    'src/components/QrCodeGenerator.tsx'
  ];

  // Add each file to the archive
  filesToInclude.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      archive.file(filePath, { name: filePath });
      console.log(`📄 Added: ${filePath}`);
    } else {
      console.log(`⚠️  Skipped (not found): ${filePath}`);
    }
  });

  // Add README for GitHub
  const readmeContent = `# QR Code Generator Service

A modern, feature-rich QR code generator built with React, TypeScript, and Tailwind CSS.

## Features

- 🎯 Real-time QR code generation
- 📱 Multiple input types (URL, text, phone, email, WiFi)
- 🎨 Customizable colors and sizes
- 📊 Error correction level options
- 💾 Download as PNG or SVG
- 📋 Copy to clipboard
- 📚 History of recent QR codes
- 📱 Fully responsive design

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **QR Generation**: qrcode library
- **Icons**: Lucide React
- **Build Tool**: Vite
- **File Downloads**: file-saver

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open your browser and navigate to the local development URL

## Build for Production

\`\`\`bash
npm run build
\`\`\`

## Project Structure

\`\`\`
src/
├── components/
│   ├── Header.tsx          # App header with branding
│   ├── Footer.tsx          # App footer
│   └── QrCodeGenerator.tsx # Main QR code generation component
├── App.tsx                 # Main app component
├── main.tsx               # App entry point
└── index.css              # Global styles with Tailwind

## Features Overview

### QR Code Types
- **URL**: Generate QR codes for websites and links
- **Text**: Plain text QR codes
- **Phone**: Direct dial phone numbers
- **Email**: Pre-filled email composition
- **WiFi**: Easy WiFi network sharing

### Customization Options
- Adjustable size (128px - 512px)
- Custom foreground and background colors
- Error correction levels (L, M, Q, H)
- Real-time preview

### Export Options
- PNG format for general use
- SVG format for scalable graphics
- Copy content to clipboard

## License

MIT License - feel free to use this project for personal or commercial purposes.
`;

  archive.append(readmeContent, { name: 'README.md' });
  console.log(`📄 Added: README.md`);

  // Add .gitignore
  const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# ZIP files
*.zip
`;

  archive.append(gitignoreContent, { name: '.gitignore' });
  console.log(`📄 Added: .gitignore`);

  // Finalize the archive
  archive.finalize();
};

// Run the script
console.log('🔄 Creating ZIP file for QR Code Generator project...\n');
createProjectZip();