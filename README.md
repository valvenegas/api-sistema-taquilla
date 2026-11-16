Manual Técnico API: Venta de boletos y asignación de asientos.

Este documento presenta toda la documentación de mi API RESTful, la cual esta orientada a una plataforma de venta de boletos y asignación de asientos para cine o teatro. Su principal objetivo es administrar de forma integral las operaciones CRUD sobre las entidades de este negocio, las cuales son salas, películas/obras, funciones y boletos.

1.	Base de Datos.
Diagrama Entidad relación (ER)
<img width="975" height="473" alt="image" src="https://github.com/user-attachments/assets/f6f30e4c-9d1f-46cb-9604-b380916a55cb" />

 
Se diseño un modelo relacional el cual esta compuesto por cuatro entidades principales para garantizar la seguridad en la venta de boletos con asignación de asientos.
Salas almacena los espacios físicos disponibles identificando su nombre o número, su aforo y su tipo. Peliculas_obras contiene el catálogo de las películas u obras de teatro, registrando su título, duración y clasificación. 
Funciones administra las proyecciones o presentaciones programadas, especificando la fecha y hora de proyección y vinculando mediante llaves foráneas tanto las obras o películas como la sala donde se presentará.
Boletos gestiona cada entrada que se vendió, registrando el lugar exacto asignado, el monto cobrado y la función correspondiente.

Creación de tablas.

 <img width="936" height="1156" alt="image" src="https://github.com/user-attachments/assets/85bb5db6-0faa-4de7-ade6-9773b3131f90" />

Mediante el querytool se ejecutaron las sentencias SQL necesarias para definir nuestras tablas, se establecieron llaves primarias autoincreméntales, los tipos de datos acordes a cada tributo y restricciones de llaves foráneas para evitar registros huérfanos en la asignación de boletos.
Insert y select de datos de cada una de las tablas.
 
Insert y select de datos de cada una de las tablas. 
<img width="908" height="1314" alt="image" src="https://github.com/user-attachments/assets/3c8fb7c6-af80-4900-9b42-14b42a9b914f" />
<img width="747" height="533" alt="image" src="https://github.com/user-attachments/assets/1870577f-7937-4367-8340-b66dbdf9ce4f" />
<img width="752" height="646" alt="image" src="https://github.com/user-attachments/assets/8ce0af85-a701-47f9-8d3f-af7337dd3ab7" />
<img width="799" height="517" alt="image" src="https://github.com/user-attachments/assets/673bcdba-3ddc-4c14-bc9f-63f085ed6424" />
<img width="773" height="689" alt="image" src="https://github.com/user-attachments/assets/bea2025e-7760-4062-8e44-70a717064282" />

Después de la creación de las tablas, se insertaron 10 registros en cada una de ellas, 	simulando las salas activas, funciones, y boletos adquiridos con asientos asignados.

2.	Configuración del Servidor y Arquitectura Modular

Inicialización del Proyecto e Instalación de Dependencias.

<img width="975" height="718" alt="image" src="https://github.com/user-attachments/assets/6b364f5f-5b8a-4340-b85c-de190fe7bf9f" />

Desde la terminal de visual, se inicializó el proyecto con el comando npm init -y 	para que se generara el package.json, después se instalaron las dependencias 	necesarias para el servidor y la documentación. 

Estructura Modular del Proyecto

<img width="405" height="452" alt="image" src="https://github.com/user-attachments/assets/7186bed4-36e2-4f47-98d0-cd0039741750" />

 Se organizo el código fuente de la siguiente manera, se creo un archivo db.js, el 	cual está dedicado exclusivamente a la configuración del pool de conexiones al 	PostgreSQL. En la carpeta routes contiene los cuatro archivos de las tablas. 

Configuración del Pool de Conexión
 <img width="656" height="475" alt="image" src="https://github.com/user-attachments/assets/449b08fb-381e-4937-a838-3c46da6e2ce8" />

En el archivo db.js se instanció un objeto Pool del paquete pg, 	configurando los parámetros de host, puerto, usuario, contraseña y nombre de la base de datos. El uso de un Pool permite reutilizar conexiones activas hacia PostgreSQL, optimizando el rendimiento ante múltiples consultas simultáneas de disponibilidad de asientos o compra de boletos.


3.	Desarrollo de Endpoints (CRUD)
Implementación de Operaciones CRUD.
<img width="841" height="1292" alt="image" src="https://github.com/user-attachments/assets/0746b8cc-6888-4fc5-899a-3ddb5038bd3c" />
<img width="975" height="898" alt="image" src="https://github.com/user-attachments/assets/c7cd8e1e-78a5-422b-9739-22a2023b1f70" />
<img width="975" height="654" alt="image" src="https://github.com/user-attachments/assets/21465bd5-5924-4274-856c-4581367e8f9d" />

En este punto, se realizó la codificación de las cuatro operaciones 	fundamentales del ciclo CRUD (Create, Read, Update, Delete).


4.	Documentación con Swagger
Configuración de swaggerOptions.

 <img width="975" height="997" alt="image" src="https://github.com/user-attachments/assets/81ef111e-3e28-4f96-bf41-f1d974b1c6ae" />

En este archivo se configuro swaggerOptions para definir la especificación de la 	plataforma. Personalizamos el título "API de gestión de boletos de cine y teatro
", la versión y la descripción del servicio, vinculando la propiedad apis hacia la 	carpeta ./routes/*.js para compilar automáticamente la documentación de los 	cuatro módulos.

Anotaciones YAML.
<img width="887" height="1124" alt="image" src="https://github.com/user-attachments/assets/2737d0ba-d1f8-4321-8742-21265560242a" />

Sobre cada endpoint en los archivos de rutas se redactaron bloques de comentarios JSDoc con sintaxis YAML (/** @swagger */). En las rutas GET se especificaron los parameters requeridos en la ruta o consulta, mientras que en las rutas POST se detalló la estructura del objeto JSON esperado dentro de requestBody.


5.	Consumo y Pruebas. 
Pruebas visuales en Swagger UI.
<img width="975" height="533" alt="image" src="https://github.com/user-attachments/assets/36b41495-4f72-4786-896e-311413cfa42b" />

Al iniciar el servidor y navegar hacia la ruta /api-docs, Swagger UI renderizó 		correctamente la interfaz interactiva del contrato API. En la captura se aprecian 	las cuatro secciones correspondientes a las entidades de la plataforma (Salas, 		Funciones, Películas-Obras y Boletos), confirmando que todas las anotaciones 	YAML 	fueron interpretadas sin errores de sintaxis. 


Pruebas de Testeo (Hoppscotch).
<img width="916" height="546" alt="image" src="https://github.com/user-attachments/assets/426a50fc-6664-4152-a554-10856765cccb" />
<img width="975" height="984" alt="image" src="https://github.com/user-attachments/assets/46d17c4f-1446-4572-a38a-4c9dd097e1f8" />

Para validar el funcionamiento real de la API frente a un cliente HTTP externo, se 	ejecutaron pruebas mediante Hoppscotch. En primer lugar, se realizó una 	petición POST enviando un cuerpo JSON válido hacia el endpoint 	correspondiente, confirmando la inserción exitosa en PostgreSQL. 	Posteriormente, se ejecutó una petición GET sobre la misma ruta, obteniendo el 	arreglo de registros en formato JSON acompañado del código de estado 200 	OK, lo que demuestra la persistencia y correcta serialización de los datos.




