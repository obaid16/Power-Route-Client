const fs = require('fs');
const path = require('path');

const scratchDir = __dirname;
const Jimp = require(path.join(scratchDir, 'node_modules', 'jimp'));

const clientPublicDir = 'c:\\Users\\USER\\Desktop\\PoweRoute1\\Client\\public';
const srcPath = path.join(clientPublicDir, 'logo_horizontal.png');

async function processLogo() {
  try {
    const image = await Jimp.read(srcPath);
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    console.log(`Original Dimensions: ${width}x${height}`);
    
    // Find bounding box of non-black pixels
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;
    
    // Threshold to consider a pixel as "non-black"
    const blackThreshold = 45; 
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const color = image.getPixelColor(x, y);
        const rgba = Jimp.intToRGBA(color);
        
        // If it's not black, update bounding box
        if (rgba.r > blackThreshold || rgba.g > blackThreshold || rgba.b > blackThreshold) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    
    console.log(`Bounding box: X: ${minX} to ${maxX}, Y: ${minY} to ${maxY}`);
    const croppedWidth = maxX - minX + 1;
    const croppedHeight = maxY - minY + 1;
    console.log(`Cropped dimensions: ${croppedWidth}x${croppedHeight} (Aspect Ratio: ${(croppedWidth / croppedHeight).toFixed(2)})`);
    
    if (croppedWidth <= 0 || croppedHeight <= 0) {
      console.log('Error: Could not find any non-black pixels in the image.');
      return;
    }
    
    // Create dark mode logo (transparent background, white text, glowing icon)
    const darkLogo = new Jimp(croppedWidth, croppedHeight, 0x00000000); // transparent background
    
    // Create light mode logo (transparent background, dark text, glowing icon)
    const lightLogo = new Jimp(croppedWidth, croppedHeight, 0x00000000); // transparent background
    
    // Fill the cropped images
    for (let cy = 0; cy < croppedHeight; cy++) {
      for (let cx = 0; cx < croppedWidth; cx++) {
        const ox = minX + cx;
        const oy = minY + cy;
        
        const color = image.getPixelColor(ox, oy);
        const rgba = Jimp.intToRGBA(color);
        
        // Check if pixel is black/background
        const brightness = Math.max(rgba.r, rgba.g, rgba.b);
        if (brightness <= blackThreshold) {
          // Keep transparent (default)
          continue;
        }
        
        // Let's compute a smooth alpha for pixels near the threshold to anti-alias the edges
        let alpha = rgba.a;
        if (brightness < 80) {
          // Smooth fade out for dark border pixels
          const factor = (brightness - blackThreshold) / (80 - blackThreshold);
          alpha = Math.floor(255 * factor);
        }
        
        // Dark theme logo (keep original colors but make background transparent)
        const darkColor = Jimp.rgbaToInt(rgba.r, rgba.g, rgba.b, alpha);
        darkLogo.setPixelColor(darkColor, cx, cy);
        
        // Light theme logo:
        // We want to turn white text into dark violet/indigo (#1A1235)
        // A pixel is "white text" if all R, G, B are high and close to each other.
        // Let's define "white/gray text" as: r > 150, g > 150, b > 150, and max difference between them is small.
        const isWhiteOrGray = rgba.r > 150 && rgba.g > 150 && rgba.b > 150 && 
                              Math.abs(rgba.r - rgba.g) < 40 && 
                              Math.abs(rgba.r - rgba.b) < 40 && 
                              Math.abs(rgba.g - rgba.b) < 40;
                              
        if (isWhiteOrGray) {
          // Convert to a very elegant dark brand purple/black (#1A1235)
          // R: 26, G: 18, B: 53
          // Let's preserve the original brightness/intensity to maintain anti-aliasing
          const intensity = (rgba.r + rgba.g + rgba.b) / 3 / 255;
          const targetR = Math.floor(26 + (255 - 26) * (1 - intensity)); // Keep it dark, or simply:
          const r = Math.floor(26 * intensity + (1-intensity)*255); // wait, let's keep it simple:
          // A clean dark violet color matching the brand: #06020E or #1F1147
          // Let's use #1F1147: R:31, G:17, B:71
          // We scale it with the pixel's original relative brightness
          const factor = brightness / 255;
          const nr = Math.floor(15 * factor);
          const ng = Math.floor(10 * factor);
          const nb = Math.floor(35 * factor);
          const lightColor = Jimp.rgbaToInt(nr, ng, nb, alpha);
          lightLogo.setPixelColor(lightColor, cx, cy);
        } else {
          // It's the colorful glowing icon (purple/pink/blue)
          // Keep original colors for light mode too, because it glows nicely on light background
          const lightColor = Jimp.rgbaToInt(rgba.r, rgba.g, rgba.b, alpha);
          lightLogo.setPixelColor(lightColor, cx, cy);
        }
      }
    }
    
    // Autocrop transparent edges just in case
    darkLogo.autocrop();
    lightLogo.autocrop();
    
    // Save the processed images
    const outDarkPath = path.join(clientPublicDir, 'logo_horizontal_dark.png');
    const outLightPath = path.join(clientPublicDir, 'logo_horizontal_light.png');
    
    await darkLogo.writeAsync(outDarkPath);
    await lightLogo.writeAsync(outLightPath);
    
    console.log(`Saved transparent dark logo: ${outDarkPath}`);
    console.log(`Saved transparent light logo: ${outLightPath}`);
    
    // Also copy the dark one as the default logo_horizontal.png
    fs.copyFileSync(outDarkPath, path.join(clientPublicDir, 'logo_horizontal.png'));
    console.log(`Copied dark logo to logo_horizontal.png`);
    
  } catch (err) {
    console.error('Error processing logo:', err);
  }
}

processLogo();
