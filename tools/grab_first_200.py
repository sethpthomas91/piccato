import os
import PIL.Image

source_dir = r'/Users/sthomas/Downloads/archive/CAT_00'
destination_dir = r'/Users/sthomas/Desktop/piccato_data_set/raw_photos/cat_raw'
counter = 1

for file in os.listdir(source_dir):
    # print(file.endswith(".jpg"))
    if counter < 201:
        if file.endswith(".jpg"):
            image = PIL.Image.open(source_dir + "/" + file)
            image_num = str(counter)
            image.save(destination_dir + "/" + image_num, 'jpeg')
            counter += 1
    else:
        break
    