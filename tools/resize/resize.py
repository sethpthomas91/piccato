import os
import PIL.Image

source_dir = r'/Users/sthomas/Desktop/piccato_data_set/raw_photos/cat_raw'
destination_dir = r'/Users/sthomas/Desktop/piccato_data_set/resized/cat_resized'
for file in os.listdir(source_dir):
    img = PIL.Image.open(source_dir + "/" + file)
    img.resize((256,256)).save(destination_dir + "/" + file, 'jpeg')
    