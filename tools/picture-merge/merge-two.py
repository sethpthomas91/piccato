import os
import PIL.Image

human_dir = r'/Users/sthomas/Desktop/piccato_data_set/resized/human_resized'
cat_dir = r'/Users/sthomas/Desktop/piccato_data_set/resized/cat_resized'
merged_img_dir = r'/Users/sthomas/Desktop/piccato_data_set/merged_cat_right_human_left'
for file in os.listdir(human_dir):
    resized_img = PIL.Image.open(human_dir + "/" + file)
    edged_img = PIL.Image.open(cat_dir + "/" + file)
    img_size = resized_img.size
    merged_image = PIL.Image.new(mode='RGB',size=(2*img_size[0], img_size[1]), color=(250,250,250))
    merged_image.paste(resized_img, (0,0))
    merged_image.paste(edged_img, (img_size[0],0))
    merged_image.save((merged_img_dir+ "/" + file), "JPEG")
    