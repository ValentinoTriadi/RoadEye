import cv2
import numpy as np
import os
from PIL import Image
import random
import numpy as np
from ultralytics import YOLO

class AccidentDetectionModel(object):
    class_nums = ['Accident', "No Accident"]

    def __init__(self, model_file):
        self.loaded_model = YOLO(model_file)

    def predict_accident(self, img):
        self.preds = self.loaded_model.predict(img)
        return AccidentDetectionModel.class_nums[np.argmax(self.preds)], self.preds


def startapplication(location:str, filename:str):
    return filename
    model = AccidentDetectionModel("best.pt")
    video = cv2.VideoCapture(filename) # for camera use video = cv2.VideoCapture(0)
    save_folder = "./static/image"
    video_folder = "./static/video"
    video_output_path = os.path.join(video_folder, f'crash_alert_{location}.mp4')

    if not os.path.exists(save_folder):
        os.makedirs(save_folder)
    if not os.path.exists(video_folder):
        os.makedirs(video_folder)

    ret, frame = video.read()
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    roi = cv2.resize(gray_frame, (250, 250))  # Resize the input image to (64, 64)

    pred, prob = model.predict_accident(roi[np.newaxis, :, :])
    prob = round(prob[0][0] * 100, 2)
    if pred == "Accident" and prob > 85:
        return filename
    else:
        return False
