from PIL import Image
import os

image_path = r"C:\Users\meseretak\.gemini\antigravity-ide\brain\d24b69ab-2bb6-4cb4-8603-d2116bad76f4\media__1784207433856.png"
output_dir = r"C:\Users\meseretak\Desktop\dessie-city\dessie-city-git-temp\public"

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

img = Image.open(image_path)
width, height = img.size

# Assuming 3 equal columns for the 3 members
# Let's add a little bit of padding removal if necessary, or just divide by 3.
# Looking at the image, there are gaps between the pictures.
# It's better to calculate exactly or just divide by 3 and it'll have some background on the sides.
# Wait, let's try to just divide by 3.
part_width = width // 3

# Box: (left, upper, right, lower)
img1 = img.crop((0, 0, part_width, height))
img2 = img.crop((part_width, 0, part_width * 2, height))
img3 = img.crop((part_width * 2, 0, width, height))

img1.save(os.path.join(output_dir, "cabinet_ashenafi.png"))
img2.save(os.path.join(output_dir, "cabinet_shemels.png"))
img3.save(os.path.join(output_dir, "cabinet_seid.png"))

print(f"Images sliced! Original size: {width}x{height}")
