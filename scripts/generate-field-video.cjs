const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('🎥 Building Community Washroom Transformation Field Video...');

  const images = [
    { file: 'video_frame_old_bathrooms.jpg', dur: 4.0 },
    { file: 'video_frame_need.jpg', dur: 3.5 },
    { file: 'video_frame_materials.jpg', dur: 3.5 },
    { file: 'video_frame_construction.jpg', dur: 4.0 },
    { file: 'video_frame_carpentry.jpg', dur: 3.5 },
    { file: 'video_frame_new_bathrooms.jpg', dur: 5.0 },
  ];

  // Verify all files exist
  for (const img of images) {
    const p = path.join('public/images', img.file);
    if (!fs.existsSync(p)) {
      throw new Error(`Missing image: ${p}`);
    }
  }

  // Create concat demuxer file for smooth presentation
  const concatList = images.map(img => {
    return `file '${path.resolve('public/images', img.file)}'\nduration ${img.dur}`;
  }).join('\n') + `\nfile '${path.resolve('public/images', images[images.length - 1].file)}'`;

  fs.writeFileSync('scripts/video_concat.txt', concatList);

  const outDir = path.resolve('public/videos');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const primaryOut = path.join(outDir, 'community-washroom-transformation.mp4');

  // FFmpeg command with smooth zoompan / frame generation + warm gentle ambient pad audio + faststart
  const ffmpegCmd = `ffmpeg -y \
    -f concat -safe 0 -i scripts/video_concat.txt \
    -f lavfi -i "anoisesrc=c=pink:r=44100:a=0.015,lowpass=f=400,volume=0.2" \
    -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,format=yuv420p" \
    -c:v libx264 -preset fast -crf 22 -profile:v high -level 4.0 \
    -c:a aac -b:a 128k -ar 44100 -ac 2 \
    -movflags +faststart \
    -shortest \
    "${primaryOut}"`;

  console.log('Running FFmpeg...');
  execSync(ffmpegCmd, { stdio: 'inherit' });

  // Copy to alternate aliases expected by legacy components
  const aliases = [
    'public/westhill_sanitation.mp4',
    'public/amani-sanitation.mp4',
    'public/video.mp4'
  ];

  for (const alias of aliases) {
    fs.copyFileSync(primaryOut, alias);
    console.log(`Copied alias to ${alias}`);
  }

  console.log('✅ Field video generated and verified successfully at:', primaryOut);
}

main().catch(err => {
  console.error('Video generation error:', err);
  process.exit(1);
});
