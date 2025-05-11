/**
 * Dithering shader implementation
 * Applies a dithering effect to the rendered scene
 * 
 * Credits:
 * Original dithering pattern: https://www.shadertoy.com/view/ltSSzW
 */

const ditheringShader = /*glsl*/`
uniform float ditheringEnabled;
uniform vec2 resolution;
uniform float gridSize;
uniform float luminanceMethod;
uniform float invertColor;
uniform float pixelSizeRatio;
uniform float grayscaleOnly;

/**
 * Ordered dithering matrix lookup
 * Returns true if the pixel should be colored based on its position in the dither matrix
 * @param brightness - Normalized brightness value (0.0 to 1.0)
 * @param pos - Pixel position in screen space
 * @return boolean - Whether the pixel should be colored or not
 */
bool getValue(float brightness, vec2 pos) {
  // Early return for extreme values
  if (brightness > 16.0 / 17.0) return false;
  if (brightness < 1.0 / 17.0) return true;
  
  // Calculate position in 4x4 dither matrix
  vec2 pixel = floor(mod(pos.xy / gridSize, 4.0));
  int x = int(pixel.x);
  int y = int(pixel.y);
  
  // 4x4 Bayer matrix threshold map
  // Efficiently determine the threshold based on x,y position
  if (x == 0) {
    if (y == 0) return brightness < 16.0 / 17.0;
    if (y == 1) return brightness < 5.0 / 17.0;
    if (y == 2) return brightness < 13.0 / 17.0;
    return brightness < 1.0 / 17.0; // y == 3
  } 
  else if (x == 1) {
    if (y == 0) return brightness < 8.0 / 17.0;
    if (y == 1) return brightness < 12.0 / 17.0;
    if (y == 2) return brightness < 4.0 / 17.0;
    return brightness < 9.0 / 17.0; // y == 3
  }
  else if (x == 2) {
    if (y == 0) return brightness < 14.0 / 17.0;
    if (y == 1) return brightness < 2.0 / 17.0;
    if (y == 2) return brightness < 15.0 / 17.0;
    return brightness < 3.0 / 17.0; // y == 3
  }
  else { // x == 3
    if (y == 0) return brightness < 6.0 / 17.0;
    if (y == 1) return brightness < 10.0 / 17.0;
    if (y == 2) return brightness < 7.0 / 17.0;
    return brightness < 11.0 / 17.0; // y == 3
  }
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 fragCoord = uv * resolution;
  vec3 baseColor;

  // Apply pixelation effect based on grid size and ratio
  float pixelSize = gridSize * pixelSizeRatio;
  vec2 pixelatedUV = floor(fragCoord / pixelSize) * pixelSize / resolution;
  baseColor = texture2D(inputBuffer, pixelatedUV).rgb;
  
  // Calculate luminance for each pixel (original implementation)
  float luminance = dot(baseColor, vec3(1.,1.,1.));
  
  // Apply grayscale if enabled
  if (grayscaleOnly > 0.0) {
    baseColor = vec3(luminance);
  }
      
  // Apply dither pattern based on pixel position and luminance
  bool dithered = getValue(luminance, fragCoord);
  
  // Create dithered version of the pixel
  vec3 ditherColor = dithered ? vec3(0.0) : baseColor;
  
  // Apply dither only to the specific pixelated UV coordinate
  vec2 currentPixel = floor(fragCoord / pixelSize);
  vec2 originalPixel = floor(uv * resolution / pixelSize);
  
  baseColor = (currentPixel == originalPixel) ? ditherColor : baseColor;

  // Invert color if requested
  if (invertColor > 0.0) {
    baseColor = 1.0 - baseColor;
  }

  // Output final color preserving alpha
  outputColor = vec4(baseColor, inputColor.a);
}`;

export default ditheringShader; 