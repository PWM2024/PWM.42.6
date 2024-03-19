# FitByte

FitByte es un proyecto web para la asignatura Programación Web y Móvil (PWM) en el que se plantea el desarrollo de una página web, cuya temática será decidida por los alumnos. En este caso, FitByte es una web orientada al gimnasio que tiene como objetivo ofrecer a los usuarios un sistema de tienda, a través del cual comprar productos orientados al entrenamiento. También dispone de una sección de rutinas y dietas que el usuario puede consultar, para así, obtener información valiosa que podrá mejorar su experiencia en el gimnasio. Finalmente, mencionar el punto fuerte de la página, las calculadoras de kilocalorías e Índice de Masa Corporal (IMC). Estas serían la funcionalidad estrella del proyecto, a través de los alimentos disponibles en nuestra base de datos, el usuario podrá calcular las calorías consumidas por cantidad de alimento, lo que le permitirá llevar un seguimiento de su ingesta calórica, facilitando así el alcance de sus metas en el gimnasio de una manera más cómoda y asequible. En cuanto a la calculadora de IMC, basándose en el peso y altura del usuario, dará como resultado el valor correspondiente de IMC, además de una serie de recomendaciones a partir de este resultado, que podrán ser beneficiosas a la hora de elegir en qué debería centrar el entrenamiento el usuario.

# Estructura del directorio:

- **Boceto**: En esta carpeta residen los bocetos generales de la página, es decir, su estructura
- **Logos**: Aquí se encuentran los logos para FitByte
- **Templates**: Es aquí donde se encuentra todo el código del proyecto
    - **Assets**: Aquí se encuentran los scripts y archivos css
        - **Scripts**: Archivos .js necesarios para la carga de los componentes (main.js) y scripts para componentes personalizados
        - **Styles**: Archivos css
    - **Components**: Los elementos individuales o componentes que forman cada una de las vistas de la web
    - **Forms**: Formularios para el inicio de sesión y registro de usuarios
    - **Header**: Las diferentes versiones del encabezado de la página
        - **HeaderConLoginAndRegister**: Encabezados de página para usuarios no registrados/sin la sesión iniciada
        - **HeaderSinLoginAndRegister**: Encabezados de página para usuarios con la sesión iniciada
    - **Pages**: Aquí se encuentran las vistas de la página web, montadas mediante los componentes en ./Components
    - **Source**: El logo elegido para representar a FitByte y las imágenes por defecto tanto del carrusel como de los elementos de la página están aquí
        - **slider-img**: Imágenes para el carrusel

# Estado del proyecto: ***En desarrollo (Sprint 2)***
- ***Sprint 1 finalizado***

Actualmente nos encontramos en el segundo de cuatro sprints del desarrollo, que se centra en la carga dinámica de datos y en el diseño responsive.
