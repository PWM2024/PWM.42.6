# FitByte

FitByte es un proyecto web para la asignatura Programación Web y Móvil (PWM) en el que se plantea el desarrollo de una página web, cuya temática será decidida por los alumnos. En este caso, FitByte es una web orientada al gimnasio que tiene como objetivo ofrecer a los usuarios un sistema de tienda, a través del cual comprar productos orientados al entrenamiento. También dispone de una sección de rutinas y dietas que el usuario puede consultar, para así, obtener información valiosa que podrá mejorar su experiencia en el gimnasio. Finalmente, mencionar el punto fuerte de la página, las calculadoras de kilocalorías e Índice de Masa Corporal (IMC). Estas serían la funcionalidad estrella del proyecto, a través de los alimentos disponibles en nuestra base de datos, el usuario podrá calcular las calorías consumidas por cantidad de alimento, lo que le permitirá llevar un seguimiento de su ingesta calórica, facilitando así el alcance de sus metas en el gimnasio de una manera más cómoda y asequible. En cuanto a la calculadora de IMC, basándose en el peso y altura del usuario, dará como resultado el valor correspondiente de IMC, además de una serie de recomendaciones a partir de este resultado, que podrán ser beneficiosas a la hora de elegir en qué debería centrar el entrenamiento el usuario.

# Estructura del directorio:
- **Src**: Directorio raíz del proyecto Angular, contiene todos los archivos fuente de la aplicación.
  - **App**: En esta carpeta residen la lógica y los componentes de la aplicación Angular.
    - **Pages**: Aquí se almacenan las diferentes vistas de la aplicación, cada una compuesta por componentes.
    - **Components**: Los elementos individuales o componentes que forman cada una de las vistas de la web
  - **Assets**: Contiene recursos estáticos como el archivo JSON (json-service)
    - **db.json**: Archivo JSON usado para cargar datos en el json.service.ts
  - **Environments**: Contiene configuraciones específicas para diferentes entornos, como acceso a Firebase.
  - **Services**: Almacena los servicios de la aplicación que manejan la lógica de negocio y la interacción con bases de datos.
      - **json.service.ts**: Servicio para manejar datos provenientes de db.json.
      - **fire.service.ts**: Servicio para interactuar con los datos de la colección de Firebase.

# Estado del proyecto: ***En desarrollo (Sprint 3)***
- ***Sprint 1 finalizado***
- ***Sprint 2 finalizado***

Actualmente nos encontramos en el tercero de cuatro sprints del desarrollo, que se centra en el paso del trabajo realizado en los sprints anteriores al framework de Angular
y al uso de Firebase como medio para realizar la carga dinámica de datos
