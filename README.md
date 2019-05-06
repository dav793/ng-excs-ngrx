# NgExcsNgrx

## Para qué sirve el patrón Redux (NgRx)?

Para ilustración imaginemos una aplicación de blog típica, hecha con Angular.

Consideremos los diferentes datos que maneja la aplicación, los cuales pueden ir cambiando durante su uso:
* Posts
* Comentarios
* Usuarios
* Usuario en sesión activa
* Preferencias del usuario activo
* Cambios no guardados (locales) en un post
* Etc...

El conjunto de todos estos datos es lo que se conoce como el **estado** de la aplicación.

Luego, consideremos cuándo pueden cambiar estos datos, o lo que es lo mismo, qué puede llevar a cambiar el estado:
* Cuando la app hace un HTTP request (e.g. editar mi post).
* Cuando la app recibe un mensaje de WebSockets del back-end (e.g. autor edita el post mientras lo estoy leyendo).
* Cuando el usuario interactúa con el UI (e.g. avanzar de página en lista de posts).

En una aplicación **reactiva** cada componente es capaz de reaccionar independientemente ante cambios en el estado. Redux se trata sobre separar los cambios en el estado, de los eventos que originan estos cambios.

Para esto se tiene un **store** (almacén) que contiene el estado de toda la aplicación en una única *"fuente de la verdad"*.

Los componentes consultan al **store** cuando necesitan acceso a una parte del estado (mediante *selectors*).

Los componentes también pueden disparar eventos (mediante *actions*) que pueden ocasionar modificaciones en partes del estado (mediante *reducers*), o que ocasionan que se disparen otros eventos que pueden tener efectos en el estado (mediante *effects*). 

Cuando sea que el estado cambie, por cualquier razón, el **store** se encarga de transmitir el último estado a los componentes interesados, de forma que todos tengan el estado vigente.

### Paradigma funcional

NgRx usa [funciones puras](https://medium.freecodecamp.org/what-is-a-pure-function-in-javascript-acb887375dfe); funciones que siempre retornan lo mismo para los mismos parámetros, y que además no tienen efectos secundarios (i.e. modificar inputs, hacer llamados HTTP, modificar otras variables externas a la función, etc...).

Este estilo de [programación funcional](https://medium.freecodecamp.org/an-introduction-to-the-basic-principles-of-functional-programming-a2c2a15c84) que adopta NgRx nos permite obtener mayor control sobre el estado, y hace el debugging del estado más sencillo. Al restringir las formas en que se puede alterar el estado de la aplicación, reducimos las oportunidades de introducir pulgas. Esto puede ser crítico en aplicaciones complejas.

## Cuáles son las partes de un sistema de manejo de estado con NgRx?

### Store
Es la entidad que contiene TODO el estado de la aplicación. Se puede pensar como un estilo de *"base de datos"* para la aplicación web. Actúa como la única *"fuente de la verdad"* para el cliente.  

### State
Es una estructura de datos inmutable. El *store* está compuesto de *states*.

### Actions
Representan eventos disparados por la aplicación. Algo importante de recalcar es que las acciones son únicamente mensajes, su único propósito es notificar a la aplicación sobre la ocurrencia de un evento. Las acciones **no modifican el estado directamente**.

Existe una convención de acostumbrar a escribir los nombres de las acciones en mayúsculas. Hasta ahora, esta convención es popular pero no necesariamente ubicua.

e.g. `DELETE POST`

Si se necesita diferenciar entre acciones con el mismo nombre pero emitidos por distintos componentes, se puede usar como prefijo el nombre del componente que origina el evento, rodeado de paréntesis angulares.

e.g. `[AppComponent] DELETE POST`

¿Cuales son algunos tipos de eventos que pueden ser descritos con acciones?
* Interacciones del usuario con el UI
* Network requests
* Eventos a nivel de lógica

Propiedades de buenas acciones (según el equipo de NgRx):
* Upfront: Escriba las acciones previo a desarrollar los features.
* Divide: Categorice las acciones basado en la fuente de los eventos.
* Many: Las acciones son baratas; no trate de racionarlas. Agregue tantas como necesita para expresar los flujos en la aplicación.
* Event-Driven: Capture eventos, **no** órdenes. Es importante separar la descripción de un evento del manejo del evento.
* Descriptive: Las acciones deben describir un evento único; no capture varios eventos en una sola acción.

### Reducers
Son **funciones puras** que modifican el estado. Son las **únicas** capaces de modificar directamente el estado.

### Effects

### Selectors

## Dev Tools
Es recomendado usar las [herramientas para desarrolladores](https://ngrx.io/guide/store-devtools) que facilitan la depuración del sistema de manejo de estado.

## Recursos

* [Pure Functions](https://medium.freecodecamp.org/what-is-a-pure-function-in-javascript-acb887375dfe)
* [Functional Programming](https://medium.freecodecamp.org/an-introduction-to-the-basic-principles-of-functional-programming-a2c2a15c84)
* [Devtools](https://ngrx.io/guide/store-devtools)
* [Patterns & Best Practices](https://www.youtube.com/watch?v=EerD9dTaqMM&t=602s)
