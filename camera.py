import cv2
from detection import AccidentDetectionModel
import numpy as np
import os
from PIL import Image
import send_mail
import random
from ultralytics import YOLO

model = YOLO("best.pt")
font = cv2.FONT_HERSHEY_SIMPLEX
url = "https://103.164.218.114/camera/share/tios/2/25/index.m3u8"
source_video = "video.mp4"

def startapplication():
    video = cv2.VideoCapture(source_video) # for camera use video = cv2.VideoCapture(0)
    save_count = 0
    alert_counter = 0
    frame_counter = 0
    frame_list = []
    save_folder = "./image"
    video_folder = "./video1"
    video_output_path = os.path.join(video_folder, f'crash_alert_{save_count}.mp4')

    if not os.path.exists(save_folder):
        os.makedirs(save_folder)
    if not os.path.exists(video_folder):
        os.makedirs(video_folder)

    while True:
        ret, frame = video.read()
        results = model.predict(frame)
        result = results[0]
        # Process results list
        boxes = results[0].boxes.xywh.cpu()                        #xywh bbox list
        clss = results[0].boxes.cls.cpu().tolist()                 #classes Id list
        names = results[0].names                                   #classes names list
        confs = results[0].boxes.conf.float().cpu().tolist()       #probabilities of classes

        for box, cls, conf in zip(boxes, clss, confs):
            x, y, w, h = box
            label = str(names[cls] + " "+ str(round(conf, 2)))
            x1, y1, x2, y2 = x-w/2, y-h/2, x+w/2, y+h/2            
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 0, 255), 2)
            cv2.putText(frame, label, (int(x1), int(y1)), font, 1, (255, 255, 0), 2)

            if (str(names[cls]) == "car-crash" or str(names[cls]) == "car-crashs") and round(conf, 2) > 0.7:
                frame_list.append(frame)  # Tambahkan frame ke daftar
                frame_counter += 1
                print(frame_counter)
            else:
                if len(frame_list) > 30 : 
                    frame_height, frame_width, _ = frame_list[0].shape
                    video_output_path = os.path.join(video_folder, f'crash_alert_{save_count}.mp4')
                    video_writer = cv2.VideoWriter(video_output_path, cv2.VideoWriter_fourcc(*"mp4v"), 15.0,
                                                (frame_width, frame_height))
                    for saved_frame in frame_list:
                        video_writer.write(saved_frame)
                    video_writer.release()
                    # send_mail.SendVideo(video_output_path)
                    save_count += 1
                    frame_list = []  # Reset frame list after video is created
            
        if cv2.waitKey(33) & 0xFF == ord('q'):
            return
        cv2.imshow('Video', frame) 


if __name__ == '__main__':
    startapplication()
