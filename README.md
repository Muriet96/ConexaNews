# ConexaNews

## Descripción

ConexaNews es una aplicación móvil desarrollada con React Native y Expo para la visualización, gestión y guardado de noticias. El proyecto está pensado para ser escalable, fácil de mantener y con una experiencia de usuario moderna y accesible.

---

## Decisiones de diseño

### Patrón de diseño

- **Feature Sliced Architecture:**  
  El código está organizado por funcionalidades (features) en carpetas independientes, facilitando la escalabilidad y el mantenimiento.
- **Redux Toolkit:**  
  Se utiliza para el manejo del estado global de manera sencilla y eficiente.
- **React Query:**  
  Para la gestión de datos asíncronos y cacheo de peticiones HTTP.
- **React Navigation:**  
  Permite una navegación fluida y desacoplada entre pantallas.
- **Internacionalización (i18n):**  
  Implementada con `react-i18next` para soportar múltiples idiomas.
- **Componentes reutilizables:**  
  Separación clara entre lógica y presentación, con componentes como `NewsCard`.

### Bibliotecas externas principales

- [`react-native-paper`](https://callstack.github.io/react-native-paper/): UI Material Design.
- [`react-navigation`](https://reactnavigation.org/): Navegación entre pantallas.
- [`redux-toolkit`](https://redux-toolkit.js.org/): Manejo de estado global.
- [`@tanstack/react-query`](https://tanstack.com/query/latest): Fetching y cacheo de datos.
- [`react-i18next`](https://react.i18next.com/): Internacionalización.
- [`@testing-library/react-native`](https://testing-library.com/docs/react-native-testing-library/intro/): Testing de componentes.
- [`jest`](https://jestjs.io/): Framework de testing.
- [`expo`](https://expo.dev/): Desarrollo y build multiplataforma.

---

## Proceso para levantar el proyecto

### 1. Requisitos previos

- Node.js >= 18
- Yarn o npm
- Expo CLI (`npm install -g expo-cli`)

### 2. Instalación de dependencias

```sh
yarn install
# o
npm install
```

### 3. Ejecución en desarrollo

```sh
yarn start
# o
npm start
```
Esto abrirá el panel de Expo. Desde ahí puedes lanzar la app en un emulador Android/iOS o en un dispositivo físico con la app Expo Go.

### 4. Ejecutar los tests y ver cobertura

```sh
yarn test
# o
npm test
```

Para ver la cobertura de tests:

```sh
yarn test --coverage
# o
npm test -- --coverage
```

Los tests unitarios cubren slices de Redux, hooks, componentes y pantallas, asegurando la calidad y el correcto funcionamiento de la lógica y la UI. Se utilizan mocks para dependencias externas y se verifica el comportamiento esperado desde la perspectiva del usuario.

---

## Login de usuario

Para hacer login en la app puedes usar **cualquiera de los usuarios y contraseñas** del servicio de users disponible en:

[https://jsonplaceholder.org/users](https://jsonplaceholder.org/users)

Por ejemplo, puedes usar:

- **Usuario:** `johndoe`  
  **Contraseña:** `jsonplaceholder.org`
- **Usuario:** `janesmith`  
  **Contraseña:** `jsonplaceholder.org`
- **Usuario:** `bobjohnson`  
  **Contraseña:** `jsonplaceholder.org`
- **Usuario:** `emilydavis`  
  **Contraseña:** `jsonplaceholder.org`
- **Usuario:** `williambrown`  
  **Contraseña:** `jsonplaceholder.org`
- **Usuario:** `laurawilson`  
  **Contraseña:** `jsonplaceholder.org`
- **Usuario:** `michaelgarcia`  
  **Contraseña:** `jsonplaceholder.org`

Esto se implementó así porque, al tratarse de un login fake, era la forma más cómoda y transparente de validar usuarios en el entorno de pruebas.

---

## Estructura del proyecto

- `src/features/`: código de cada dominio funcional (news, settings, users, etc.)
- `src/store/`: configuración de Redux y middlewares
- `src/i18n/`: configuración y recursos de internacionalización
- `src/navigation/`: configuración de navegación
- `src/services/`: acceso a APIs externas

---

## Aspectos evaluados y cómo se abordan

### Arquitectura y file-system de la app

- Se sigue una arquitectura modular por features, lo que permite escalar y mantener el proyecto fácilmente.
- Cada feature tiene su propio slice, hooks, componentes y tests.

### Buenas prácticas, calidad y complejidad de código

- Uso de TypeScript para tipado estricto.
- Separación clara entre lógica y presentación.
- Componentes reutilizables y desacoplados.
- Código documentado y fácil de seguir.

### Patrones implementados

- **Feature Sliced Architecture** para modularidad.
- **Redux Toolkit** para manejo de estado global.
- **React Query** para fetching y cacheo de datos.
- **Internacionalización** con i18next.
- **Testing** con Testing Library y Jest.

### Tests unitarios

- Se incluyen tests unitarios y de integración para slices, hooks y pantallas.
- Se verifica el comportamiento de la UI y la lógica de negocio.
- Se utiliza coverage para asegurar la calidad del código.

### UX/UI

- UI moderna y accesible con React Native Paper.
- Navegación fluida y consistente.
- Soporte para temas y accesibilidad.
- Mensajes claros para el usuario en todos los estados (cargando, error, vacío, etc.).

### Performance

- Uso de React Query para evitar refetching innecesario.
- FlatList para listas eficientes.
- Memoización de datos y componentes donde corresponde.
- Redux Toolkit para evitar renders innecesarios.

---

## Notas adicionales

- **Internacionalización:**  
  Los textos están organizados por feature y por idioma, facilitando la localización y el mantenimiento.
- **Testing:**  
  Los tests usan mocks para dependencias externas y cubren tanto lógica como UI.
- **Estilo:**  
  El tema de la app se puede personalizar fácilmente desde el archivo `App.tsx`.

