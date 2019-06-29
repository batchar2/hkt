import json

import requests



def start_camera(camera_id, camera_uri):
    data = {
        'camera_id': camera_id,
        'camera_uri': camera_uri,
    }
    print(">>> start_camera")
    r = requests.post('http://127.0.0.1:3001/api/stream/start/', json=data)
    print(r)

def stop_camera(camera_id, camera_uri):
    data = {
        'camera_id': camera_id,
        'camera_uri': camera_uri,
    }
    print(">>> stop_camera")
    r = requests.post('http://127.0.0.1:3001/api/stream/stop/', json=data)
    print(r)
