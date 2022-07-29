import cv2
import os, os.path
# from matplotlib import pyplot as plt

print (cv2.__version__)
imageDir = "./resized/"
image_path_list = []
valid_image_extensions = [".jpg", ".jpeg", ".png", ".tif", ".tiff"] #specify your vald extensions here
valid_image_extensions = [item.lower() for item in valid_image_extensions]

for file in os.listdir(imageDir):
  extension = os.path.splitext(file)[1]
  if extension.lower() not in valid_image_extensions:
      continue
  image_path_list.append(os.path.join(imageDir, file))

for imagePath in image_path_list:
  print(imagePath)
  # read the img
  img = cv2.imread(imagePath,0)
  if img is None:
      continue

  # detect edges
  edges = cv2.Canny(img,256,256)

  # revert white and balck
  newEdges = cv2.bitwise_not(edges)

  # save output image in the edges foler
  path = imagePath.replace('resized', 'edges')
  cv2.imwrite(path,newEdges)
