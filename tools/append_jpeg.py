import os
import PIL.Image

source_dir = '/Users/sthomas/Desktop/piccato_data_set/merged_cat_right_human_left'
for file in os.listdir(source_dir):
    image = PIL.Image.open(source_dir + "/" + file)
    image.save(source_dir + "/" + file + ".jpeg", 'jpeg')
