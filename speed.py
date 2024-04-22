import random
import requests
import time

# Función para simular la lectura de la velocidad del coche 
def leer_velocidad():
    # Simulamos una velocidad aleatoria entre 0 y 200 km/h para propósitos de demostración
    velocidad = random.randint(0, 200)
    return velocidad

# Función para enviar los datos de la velocidad a la API
def enviar_datos_api(velocidad):
    url = 'https://carlos-renting-api-1.onrender.com/data' 
    payload = {"sensor": "speed", "value": velocidad}

    try:
        response = requests.post(url, json=payload)
        if response.status_code == 201:
            print("Datos enviados correctamente a la API")
        else:
            print("Error al enviar los datos a la API. Código de estado:", response.status_code)
    except Exception as e:
        print("Error de conexión:", str(e))

# Bucle principal para simular la lectura y envío de datos cada cierto tiempo
while True:
    velocidad_actual = leer_velocidad()
    enviar_datos_api(velocidad_actual)
    # Esperamos 5 segundos antes de la siguiente lectura y envío de datos
    time.sleep(5)
