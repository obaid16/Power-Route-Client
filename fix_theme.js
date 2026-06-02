const fs = require('fs');
const path = require('path');

const directories = ['app', 'components'];

const replaceRules = [
    // Backgrounds
    { regex: /(?:([a-z-]+):)?bg-white\/5(?!0)/g, color: 'black/5', darkColor: 'white/5', type: 'bg' },
    { regex: /(?:([a-z-]+):)?bg-white\/10/g, color: 'black/10', darkColor: 'white/10', type: 'bg' },
    { regex: /(?:([a-z-]+):)?bg-white\/20/g, color: 'black/20', darkColor: 'white/20', type: 'bg' },
    
    // Borders
    { regex: /(?:([a-z-]+):)?border-white\/5(?!0)/g, color: 'black/5', darkColor: 'white/5', type: 'border' },
    { regex: /(?:([a-z-]+):)?border-white\/10/g, color: 'black/10', darkColor: 'white/10', type: 'border' },
    { regex: /(?:([a-z-]+):)?border-white\/20/g, color: 'black/20', darkColor: 'white/20', type: 'border' },
    { regex: /(?:([a-z-]+):)?border-white(?!\/)/g, color: 'black/20', darkColor: 'white', type: 'border' },
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            for (const rule of replaceRules) {
                content = content.replace(rule.regex, (match, prefix, offset, string) => {
                    const beforeMatch = string.substring(0, offset);
                    if (beforeMatch.endsWith('dark:')) return match; 
                    
                    const pfx = prefix ? prefix + ':' : '';
                    return `${pfx}${rule.type}-${rule.color} dark:${pfx}${rule.type}-${rule.darkColor}`;
                });
            }

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

for (const dir of directories) {
    processDirectory(path.join(__dirname, dir));
}
console.log("Done.");
