const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Icon sizes for Android
const androidSizes = [
  { folder: "mipmap-mdpi", size: 48 },
  { folder: "mipmap-hdpi", size: 72 },
  { folder: "mipmap-xhdpi", size: 96 },
  { folder: "mipmap-xxhdpi", size: 144 },
  { folder: "mipmap-xxxhdpi", size: 192 },
];

const sourceIcon = "icon.png";
const androidResPath = "android/app/src/main/res";

console.log("🎨 Generating Android icons from icon.png...\n");

// Check if source icon exists
if (!fs.existsSync(sourceIcon)) {
  console.error("❌ Error: icon.png not found in root directory");
  process.exit(1);
}

// Check if Android project exists
if (!fs.existsSync(androidResPath)) {
  console.error(
    '❌ Error: Android project not found. Run "npx cap add android" first.'
  );
  process.exit(1);
}

// Check if sharp is installed
try {
  require.resolve("sharp");
} catch (e) {
  console.log("📦 Installing sharp for image processing...");
  execSync("npm install --save-dev sharp", { stdio: "inherit" });
}

const sharp = require("sharp");

// Generate icons for each size
async function generateIcons() {
  for (const { folder, size } of androidSizes) {
    const outputDir = path.join(androidResPath, folder);

    // Create directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, "ic_launcher.png");

    try {
      await sharp(sourceIcon)
        .resize(size, size, {
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${folder}/ic_launcher.png (${size}x${size})`);
    } catch (error) {
      console.error(
        `❌ Error generating ${folder}/ic_launcher.png:`,
        error.message
      );
    }
  }

  // Also generate round icons
  console.log("\n🔄 Generating round icons...\n");

  for (const { folder, size } of androidSizes) {
    const outputDir = path.join(androidResPath, folder);
    const outputPath = path.join(outputDir, "ic_launcher_round.png");

    try {
      // Create a circular mask
      const roundedCorners = Buffer.from(
        `<svg><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`
      );

      await sharp(sourceIcon)
        .resize(size, size, {
          fit: "cover",
        })
        .composite([
          {
            input: roundedCorners,
            blend: "dest-in",
          },
        ])
        .png()
        .toFile(outputPath);

      console.log(
        `✅ Generated ${folder}/ic_launcher_round.png (${size}x${size})`
      );
    } catch (error) {
      console.error(
        `❌ Error generating ${folder}/ic_launcher_round.png:`,
        error.message
      );
    }
  }

  console.log("\n✨ Icon generation complete!");
  console.log("\n📝 Next steps:");
  console.log("   1. Run: npm run build");
  console.log("   2. Run: npx cap sync android");
  console.log("   3. Run: npm run android");
}

generateIcons().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
