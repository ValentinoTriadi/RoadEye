import cv2
import os
from ultralytics import YOLO
import cv2

url = "https://103.164.218.114/camera/share/tios/2/25/index.m3u8"
source_video = "./api/static/video.mp4"

def startapplication(location:str):
    
    model = YOLO("./api/routes/best.pt")
    font = cv2.FONT_HERSHEY_SIMPLEX
    video = cv2.VideoCapture(url) # for camera use video = cv2.VideoCapture(0)
    frame_counter = 0
    frame_list = []
    video_folder = ".api/static/video"

    # create video path
    count = 0
    video_path = f'{location}_{count}'
    while os.path.isfile(os.path.join(video_folder, f'{video_path}.mp4')):
        count += 1
        video_path = f'{location}_{count}'
    video_output_path = os.path.join(video_folder, f'{video_path}.mp4')
    return video_output_path # Temporary code

    if not os.path.exists(video_folder):
        os.makedirs(video_folder)

    ret = True
    i = 0 # temporary code
    while ret:
    
        # temporary code
        i+=1
        if (i == 100):
            print("break")
            break

        ret, frame = video.read()
        results = model.predict(frame)

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
            else:
                if len(frame_list) > 30 : 
                    frame_height, frame_width, _ = frame_list[0].shape
                    video_writer = cv2.VideoWriter(video_output_path, cv2.VideoWriter_fourcc(*"mp4v"), 15.0,
                                                (frame_width, frame_height))
                    for saved_frame in frame_list:
                        video_writer.write(saved_frame)
                    video_writer.release()
                    return video_path
    return False
        