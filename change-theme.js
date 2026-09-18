const fs = require('fs');
const path = require('path');

const mappings = {
  'bg-[#0a0a0a]': 'bg-[#faf9f6]',
  'bg-[#080808]': 'bg-[#faf9f6]',
  'bg-black': 'bg-[#faf9f6]',
  'bg-[#1a1a1a]': 'bg-white',
  'bg-[#111111]': 'bg-white',
  'bg-[#111]': 'bg-white',
  'bg-[#2a2a2a]': 'bg-[#f0f0f0]',
  'border-[#2a2a2a]': 'border-[#eaeaea]',
  'border-[#333]': 'border-[#eaeaea]',
  'text-[#f5f5f0]': 'text-[#111111]',
  'text-[#a0a0a0]': 'text-[#555555]',
  'text-[#707070]': 'text-[#666666]',
  'text-gray-400': 'text-gray-600',
  'hover:bg-[#333]': 'hover:bg-[#f0f0f0]',
  'hover:text-white': 'hover:text-black',
  'text-white': 'text-white' // keep this for gold buttons usually
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // First, fix globals.css
    if (filePath.endsWith('globals.css')) {
      content = content.replace(/bg-\[#0a0a0a\]/g, 'bg-[#faf9f6]')
                       .replace(/text-\[#f5f5f0\]/g, 'text-[#111111]')
                       .replace(/bg-\[#111111\]/g, 'bg-white')
                       .replace(/border-\[#2a2a2a\]/g, 'border-[#eaeaea]')
                       .replace(/text-\[#f5f5f0\]/g, 'text-[#111111]');
    }

    // Replace based on mappings
    for (const [dark, light] of Object.entries(mappings)) {
      // Create a global regex to replace all instances
      const regex = new RegExp(dark.replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\#/g, '\\#'), 'g');
      content = content.replace(regex, light);
    }
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
