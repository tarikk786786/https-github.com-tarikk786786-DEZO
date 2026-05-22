from PIL import Image
import requests
from io import BytesIO

url = "https://i.ibb.co/F40Zt4tf/Chat-GPT-Image-May-22-2026-10-18-52-PM.png"
response = requests.get(url)
img = Image.open(BytesIO(response.content)).convert("RGBA")

# Let's get pixel data using load for better compatibility and modification
pixels = img.load()
width, height = img.size

# We will invert dark colors to light colors, and make white backgrounds transparent
for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        
        # If it's a white-ish background, make it transparent
        if r > 220 and g > 220 and b > 220:
            pixels[x, y] = (255, 255, 255, 0)
        else:
            # If it's a dark pixel (e.g. black text), let's invert it to light so it shows on dark mode!
            # A simple inversion for dark pixels
            if r < 100 and g < 100 and b < 100:
                # Invert to bright
                pixels[x, y] = (255 - r, 255 - g, 255 - b, a)

bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

img.save("public/dezo-logo-transparent.png", "PNG")
print("Saved to public/dezo-logo-transparent.png")
