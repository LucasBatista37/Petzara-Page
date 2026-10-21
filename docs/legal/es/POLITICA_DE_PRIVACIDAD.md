# Política de privacidad — Petzara

**Última actualización del original en portugués:** 16/10/2026

---

## Aviso legal

Esta Política describe cómo el operador de la plataforma **Petzara** ("**nosotros**", "**nuestro**" u "**operador**") trata los datos personales en el contexto del software como servicio (SaaS) ofrecido a establecimientos de servicios para mascotas. **No sustituye la asesoría jurídica.** La identificación societaria completa del operador (razón social, CNPJ y domicilio) **se publicará en esta página cuando esté disponible**; mientras tanto, puedes solicitar información por el canal de contacto indicado en la sección 14.

Esta Política está alineada con la **Ley n.º 13.709/2018 de Brasil (Ley General de Protección de Datos — LGPD)**.

---

## 1. Responsable y encargado de datos (DPO)

**1.1** El **responsable (controlador)** de los datos personales tratados en nombre del operador de la Plataforma Petzara es el propio **operador de Petzara**, en la medida en que define las finalidades y los medios del tratamiento.

**1.2** El **encargado de protección de datos (DPO)**, cuando sea designado, podrá ser contactado por el correo indicado en la sección 14. Mientras no haya una designación pública, las solicitudes relacionadas con la LGPD podrán enviarse al **canal de contacto** indicado en la sección 14.

**1.3** Los establecimientos que utilizan Petzara para tratar datos de **sus** clientes y dueños de mascotas pueden actuar como **responsables** o **encargados del tratamiento** respecto de esos titulares, según el caso. Estos Usuarios son responsables de brindar avisos y bases legales adecuados a **sus** titulares.

---

## 2. Alcance: quién es titular en esta Política

**2.1** Esta Política se aplica principalmente al tratamiento de datos de:

- **Usuarios de la Plataforma** (administradores y colaboradores de los establecimientos);
- de forma **accesoria**, datos de **clientes finales, dueños de mascotas y animales** que el establecimiento **registra** en Petzara (por ejemplo, en citas o fichas).

**2.2** La **consulta pública de horarios** en la página vinculada a la URL del establecimiento **no requiere que el dueño de la mascota inicie sesión**; Petzara **no recopila en esa pantalla** datos personales identificados del visitante más allá de lo que procesan el navegador y los proveedores habituales (ver la sección 8). El contacto posterior puede realizarse por **WhatsApp** u otro canal externo, fuera del control de esta Política en cuanto al contenido de la conversación.

---

## 3. Datos personales que podemos tratar

Según las funciones utilizadas, podemos tratar las categorías a continuación.

### 3.1 Datos de cuenta y autenticación (Usuarios)

- Identificación: **nombre**, **nombre del establecimiento**, **correo electrónico**, **teléfono**;
- autenticación: **hash de la contraseña**, tokens de **verificación de correo**, tokens de **recuperación de contraseña**, **identificador de Google** cuando se utiliza el inicio de sesión social;
- sesión: **token de acceso** (JWT) y **refresh token** (por ejemplo, en una **cookie httpOnly**);
- vínculos: **función** (administrador o colaborador), referencia al **titular de la cuenta** (propietario), **departamento**, invitaciones;
- preferencias: **tema**, **orden de la agenda**, **URL pública**, **activación de la URL**, **límites de servicios simultáneos**, **configuración del horario de trabajo** y similares.

### 3.2 Datos de suscripción y pago (SaaS)

- Identificadores y estado de la suscripción en el proveedor de pago utilizado: **Google Play** (token de la compra, número de pedido, producto, plan y, cuando la compra usa un periodo gratuito de Google Play, el identificador de la oferta y la fecha de fin de ese periodo) o **Stripe** (cliente, suscripción); **periodo vigente**, **periodo de prueba**, fechas de cobro, estado (activa, en prueba, con pago pendiente, cancelada, etc.).

**No** tratamos, en nuestros servidores de aplicación, el **número completo** de la tarjeta de crédito; el procesamiento del pago lo realiza **Google Play** o **Stripe**, según el proveedor utilizado en la contratación.

### 3.3 Datos operativos ingresados por el establecimiento

- **Clientes:** nombre, correo electrónico, teléfono, **dirección** (calle, número, complemento, barrio, ciudad, estado, código postal), observaciones;
- **Mascotas:** nombre, especie, raza, tamaño, fecha de nacimiento, observaciones, vínculo opcional con un cliente;
- **Citas:** datos del animal y del responsable (nombre, teléfono), servicios, importes, fecha y hora, estado, responsable interno;
- **Finanzas:** movimientos (descripción, importes, categorías, fechas, métodos de pago, vínculos con citas, según el uso);
- **Notificaciones** generadas por la Plataforma.

### 3.4 Datos de comunicación y soporte

- Mensajes enviados por los canales de **soporte** autenticado (nombre, correo, asunto, contenido);
- registros de **correos transaccionales** (confirmación de cuenta, invitaciones, restablecimiento de contraseña), enviados por un proveedor de correo electrónico.

### 3.5 Datos técnicos y de seguridad

- Registros de **errores y rendimiento** mediante herramientas como **Sentry** (pueden incluir datos técnicos del dispositivo, del navegador, la **dirección IP** en incidentes y stack traces);
- **logs** del servidor y del tráfico a nivel de infraestructura, cuando corresponda;
- información necesaria para la **prevención de fraudes** y la **seguridad** de la cuenta.

---

## 4. Finalidades del tratamiento

Tratamos datos personales para:

1. **Registrar, autenticar y gestionar cuentas** de administradores y colaboradores;
2. **Ofrecer y operar** las funciones de Petzara (agenda, registros, finanzas, notificaciones, página pública de horarios);
3. **Cobrar y administrar suscripciones** (incluido el periodo de prueba, cuando se ofrezca), a través de Google Play o Stripe;
4. **Comunicarnos** con el Usuario (correo transaccional, soporte);
5. **Cumplir obligaciones legales** y responder a solicitudes legítimas de las autoridades;
6. **Proteger derechos**, prevenir fraudes y garantizar la **seguridad** de la Plataforma;
7. **Mejorar la estabilidad y la calidad** del servicio (diagnóstico de errores con Sentry y datos técnicos relacionados);
8. **Cumplir esta Política** y los [Términos de uso](./TERMINOS_DE_USO.md).

---

## 5. Bases legales (LGPD)

Según el caso, utilizamos las siguientes bases legales, en los términos del art. 7 de la LGPD:

| Finalidad (resumen) | Base legal típica |
|---------------------|---------------------|
| Ejecución del contrato de uso de la Plataforma | **Ejecución de contrato** (inc. III) |
| Creación y gestión de la cuenta; cobro | **Ejecución de contrato** y **ejercicio regular de derechos** (inc. VI), cuando corresponda |
| Cumplimiento de una obligación legal o regulatoria | **Obligación legal** (inc. II) |
| Soporte, seguridad, prevención de fraudes | **Interés legítimo** (inc. IX), con evaluación de las expectativas del titular y ponderación |
| Comunicaciones transaccionales esenciales | **Ejecución de contrato** o **interés legítimo** en informar al titular sobre el servicio |
| Datos ingresados por el establecimiento sobre sus clientes | En general, **ejecución del contrato** entre el operador y el establecimiento; el establecimiento responde ante sus titulares |

Cuando sea necesario el **consentimiento** (por ejemplo, para comunicaciones opcionales no esenciales), se solicitará de forma destacada.

---

## 6. Compartición de datos con terceros

Podemos compartir datos con proveedores que actúan en nuestro nombre o como parte de la infraestructura del servicio:

| Categoría | Ejemplos de finalidad |
|-----------|------------------------|
| **Pagos** | **Google Play** — suscripciones contratadas en la aplicación Android (confirmación y estado de la compra); **Stripe** — suscripciones de la versión web, portal del cliente, eventos de cobro |
| **Autenticación** | **Google** — inicio de sesión OAuth cuando está habilitado |
| **Correo electrónico** | **Resend** (o un proveedor equivalente) — envío de mensajes transaccionales |
| **Monitoreo de errores** | **Sentry** — diagnóstico de fallas y rendimiento |
| **Medición del sitio (solo con consentimiento)** | **Google Analytics 4** y **Meta Pixel** — audiencia y campañas del sitio petzara.app (ver la sección 8.4) |
| **Alojamiento y base de datos** | Proveedores de nube donde se alojan la aplicación y **MongoDB** |
| **Orden judicial o requerimiento legal** | Autoridades, cuando sea obligatorio |

Exigimos contratos o cláusulas que traten los datos conforme a la LGPD, en la medida aplicable (incluidas las operaciones de **subencargados**).

---

## 7. Transferencia internacional de datos

Algunos proveedores (como **Google** (incluidos Google Play y Google Analytics), **Meta**, **Stripe**, **Sentry** o **Resend**) pueden procesar datos en **servidores ubicados fuera de Brasil**, incluso en los Estados Unidos o en la Unión Europea.

En esos casos, adoptamos las medidas previstas en la LGPD (arts. 33 a 36), como **cláusulas contractuales estándar**, **certificaciones** u otras garantías compatibles, e informamos a los titulares sobre esta posibilidad en esta Política.

---

## 8. Cookies, almacenamiento local y tecnologías similares

**8.1** Utilizamos **cookies** estrictamente necesarias para la sesión, incluida una cookie **httpOnly** para el **refresh token** (la configuración de seguridad y de dominio depende del entorno, por ejemplo `.petzara.app` en producción).

**8.2** El **token de acceso** puede almacenarse en el **almacenamiento local del navegador** (`localStorage` o similar) para mantener la sesión del Usuario.

**8.3** El uso de **"Iniciar sesión con Google"** está sujeto a las políticas de cookies y privacidad de **Google**.

**8.4** En el **sitio institucional** (petzara.app) podemos utilizar herramientas de terceros de **medición de audiencia** y de **publicidad** — **Google Analytics 4** (Google) y **Meta Pixel** (Meta Platforms) — para entender cómo se usa el sitio (páginas vistas, clics en "crear cuenta", "WhatsApp" y "Google Play") y medir campañas. Estas herramientas **solo se cargan después de tu consentimiento** en el aviso de cookies ("Aceptar"). Si haces clic en "Rechazar", no se cargan. Tu elección queda guardada en el almacenamiento local del navegador y puede cambiarse en cualquier momento en **"Preferencias de cookies"**, en el pie de página del sitio. Base legal: **consentimiento** (art. 7, I, de la LGPD). Los datos recopilados por estas herramientas también se tratan conforme a las políticas de Google y de Meta, y pueden procesarse fuera de Brasil (ver la sección 7).

**8.5** El **sistema** (app.petzara.app) y la **aplicación Android** no utilizan cookies publicitarias para la elaboración de perfiles de marketing.

---

## 9. Seguridad de la información

Adoptamos medidas técnicas y organizativas razonables, como:

- comunicación **HTTPS** en producción;
- **hash** de las contraseñas;
- tokens de acceso de **corta duración** y renovación controlada;
- limitación de frecuencia en operaciones sensibles (por ejemplo, el pago);
- monitoreo de errores y acceso restringido a la infraestructura.

Ningún sistema es totalmente seguro. En caso de un **incidente de seguridad** que pueda generar riesgos para los titulares, lo comunicaremos a las autoridades y a los afectados cuando la ley así lo exija.

---

## 10. Conservación de datos

**10.1** Conservamos los datos durante el tiempo necesario para **cumplir las finalidades** descritas, respetando los plazos legales (fiscales, civiles, etc.).

**10.2** Las **cuentas que no se suscriben** al final de la prueba gratuita quedan en modo de solo lectura y sus datos (registro, clientes, mascotas, citas y finanzas) **siguen guardados mientras la cuenta exista**: no hay eliminación automática por falta de suscripción. El Usuario puede, en cualquier momento, **exportar** los datos (por ejemplo, las citas en CSV o XLSX, en la Configuración; otros datos mediante solicitud por el canal de la sección 14) o **solicitar la eliminación** de la cuenta (en **Configuración › Eliminar cuenta** o por el canal de la sección 14).

**10.3** Después del **cierre de la cuenta**, podremos **conservar** datos por un periodo adicional para cumplir obligaciones legales, resolver litigios o ejercer derechos de forma regular.

**10.4** Los logs y los datos técnicos de seguridad pueden conservarse por periodos **más cortos o más largos**, según la política interna y la ley.

---

## 11. Derechos de los titulares (LGPD)

En los términos del art. 18 de la LGPD, el titular puede solicitar:

- la **confirmación** de la existencia del tratamiento;
- el **acceso** a los datos;
- la **corrección** de datos incompletos, inexactos o desactualizados;
- la **anonimización, el bloqueo o la eliminación** de datos innecesarios o excesivos, o tratados en incumplimiento de la LGPD;
- la **portabilidad**, cuando corresponda;
- la **eliminación** de los datos tratados con consentimiento, salvo excepciones legales;
- **información** sobre las comparticiones;
- la **revocación** del consentimiento, cuando la base sea el consentimiento.

**11.1** Las solicitudes pueden hacerse por el **canal de contacto** de la sección 14. Podremos solicitar información para **confirmar la identidad**.

**11.2** Algunas solicitudes pueden ser **resueltas directamente por el Usuario** en la propia Plataforma (edición de registros, exportación de citas y eliminación de la cuenta). Los datos tratados por **Stripe** o por **Google** pueden requerir también una solicitud directa a esos proveedores.

**11.3** El titular puede **presentar una petición ante la Autoridad Nacional de Protección de Datos de Brasil (ANPD)**.

---

## 12. Decisiones automatizadas

Actualmente, Petzara **no** toma decisiones basadas únicamente en el tratamiento automatizado que afecten de forma significativa a los titulares sin revisión humana. Si se introdujeran funciones de este tipo, esta sección se actualizará.

---

## 13. Niñas, niños y adolescentes

La Plataforma está dirigida a **empresarios y profesionales**. No dirigimos servicios a menores. Los datos de menores solo pueden aparecer como **parte de los registros** ingresados por el establecimiento (por ejemplo, un dueño de mascota menor de edad); en esos casos, el **responsable en relación con el menor** es el establecimiento, que debe observar los arts. 14 y 20 de la LGPD.

---

## 14. Contacto

Para ejercer tus derechos o resolver dudas sobre privacidad o sobre estos tratamientos:

- **Correo electrónico:** suporte@petzara.app
- **Soporte en la Plataforma:** formulario autenticado en **Soporte**, cuando esté disponible

---

## 15. Cambios en esta Política

Podemos actualizar esta Política para reflejar cambios legales o en la Plataforma. La **fecha al inicio** se revisará. Los cambios relevantes podrán comunicarse por correo electrónico o mediante un aviso en la aplicación.

---

## 16. Relación con los Términos de uso

Esta Política complementa los [Términos de uso](./TERMINOS_DE_USO.md). En caso de conflicto sobre el tratamiento de datos, prevalece lo dispuesto aquí en materia de privacidad, salvo norma legal en contrario.
