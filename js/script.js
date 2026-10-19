"use strict";

const quizQuestions = [
  {
    pregunta: "¿Qué característica define mejor una arquitectura desacoplada?",
    opciones: [
      "Todos los módulos comparten una única base de código y se publican juntos.",
      "Los componentes tienen responsabilidades delimitadas y se comunican mediante contratos.",
      "El sistema evita por completo la comunicación entre sus componentes.",
      "Toda la lógica se ejecuta en un único servidor central."
    ],
    correcta: 1,
    explicacion: "El desacoplamiento establece límites claros y contratos de comunicación para que un componente pueda cambiar con menos impacto en los demás."
  },
  {
    pregunta: "¿Cuál es una ventaja importante de los microservicios frente a un monolito?",
    opciones: [
      "Eliminan la necesidad de monitorear la aplicación.",
      "Garantizan que nunca ocurran fallos.",
      "Permiten desplegar y escalar servicios de forma independiente.",
      "Evitan que los servicios se comuniquen por red."
    ],
    correcta: 2,
    explicacion: "Cada servicio puede publicarse y escalarse de acuerdo con sus propias necesidades, sin desplegar necesariamente todo el sistema."
  },
  {
    pregunta: "¿Cuál es una responsabilidad habitual de un API Gateway?",
    opciones: [
      "Enrutar solicitudes entrantes hacia los servicios apropiados.",
      "Reemplazar la lógica de negocio de todos los servicios.",
      "Almacenar todas las bases de datos de la plataforma.",
      "Compilar los contenedores durante cada solicitud."
    ],
    correcta: 0,
    explicacion: "El API Gateway sirve como punto de entrada y puede enrutar peticiones, autenticar clientes o limitar tráfico."
  },
  {
    pregunta: "¿Qué significa que un servicio tenga independencia de despliegue?",
    opciones: [
      "Se ejecuta sin comunicarse con otros servicios.",
      "Solo se puede publicar junto con la interfaz de usuario.",
      "No necesita pruebas antes de llegar a producción.",
      "Puede publicarse sin desplegar nuevamente todos los demás servicios."
    ],
    correcta: 3,
    explicacion: "Un servicio independiente puede evolucionar y desplegarse por separado, siempre que mantenga sus contratos de comunicación."
  },
  {
    pregunta: "¿Cuál es un desafío común al operar microservicios?",
    opciones: [
      "No se puede automatizar su despliegue.",
      "Aumenta la complejidad de monitorear fallos y comunicaciones distribuidas.",
      "Todos los servicios deben usar el mismo lenguaje de programación.",
      "No es posible escalar servicios individualmente."
    ],
    correcta: 1,
    explicacion: "La distribución añade latencia, fallos de red y más componentes que observar, por lo que la observabilidad es esencial."
  },
  {
    pregunta: "¿Cuál de estas tecnologías se utiliza para crear contenedores?",
    opciones: [
      "Docker",
      "Bootstrap",
      "PostgreSQL",
      "Figma"
    ],
    correcta: 0,
    explicacion: "Docker es una plataforma popular para construir y ejecutar contenedores que empaquetan aplicaciones y dependencias."
  },
  {
    pregunta: "¿Qué patrón ayuda a localizar servicios disponibles de forma dinámica?",
    opciones: [
      "Server-side rendering",
      "Circuit breaker",
      "Service Discovery",
      "Object-relational mapping"
    ],
    correcta: 2,
    explicacion: "Service Discovery permite a los servicios encontrar instancias disponibles aunque sus direcciones cambien."
  },
  {
    pregunta: "¿Cuándo podría NO convenir empezar con microservicios?",
    opciones: [
      "Cuando hay equipos autónomos y necesidades distintas de escalado.",
      "Cuando el dominio ya tiene límites claros entre capacidades.",
      "Cuando se requiere desplegar cada capacidad de negocio por separado.",
      "Cuando el producto es pequeño y un equipo puede operar con sencillez un monolito."
    ],
    correcta: 3,
    explicacion: "Para productos pequeños o equipos reducidos, el costo operativo distribuido puede superar las ventajas. Un monolito modular puede ser una mejor elección."
  },
  {
    pregunta: "¿Cuál es un ejemplo de tecnología usada para mensajería asíncrona?",
    opciones: [
      "RabbitMQ",
      "CSS Grid",
      "Nginx como editor de texto",
      "HTML"
    ],
    correcta: 0,
    explicacion: "RabbitMQ permite intercambiar mensajes mediante colas; Kafka también se usa para flujos de eventos."
  },
  {
    pregunta: "¿Qué es la orquestación de contenedores?",
    opciones: [
      "Un método para diseñar íconos de una aplicación.",
      "La coordinación automatizada del despliegue, escalado y ciclo de vida de contenedores.",
      "La conversión de una página web a formato PDF.",
      "Una forma de escribir consultas SQL."
    ],
    correcta: 1,
    explicacion: "Un orquestador como Kubernetes coordina contenedores, gestiona su estado y automatiza tareas operativas."
  }
];

const quizContent = document.querySelector("#quizContent");
const bestScoreKey = "microservicesQuizBestScore";
let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let answerConfirmed = false;

function readBestScore() {
  try {
    const savedScore = Number.parseInt(localStorage.getItem(bestScoreKey) ?? "0", 10);
    return Number.isInteger(savedScore) && savedScore >= 0 && savedScore <= quizQuestions.length
      ? savedScore
      : 0;
  } catch (error) {
    console.error("No se pudo leer el mejor puntaje guardado.", error);
    return null;
  }
}

function saveBestScore(newScore) {
  const previousBest = readBestScore();
  if (previousBest === null || newScore <= previousBest) {
    return previousBest;
  }

  try {
    localStorage.setItem(bestScoreKey, String(newScore));
    return newScore;
  } catch (error) {
    console.error("No se pudo guardar el mejor puntaje.", error);
    return previousBest;
  }
}

function renderQuestion() {
  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  quizContent.innerHTML = `
    <div class="quiz-progress-meta">
      <span>Pregunta ${currentQuestion + 1} de ${quizQuestions.length}</span>
      <span>${score} ${score === 1 ? "respuesta correcta" : "respuestas correctas"}</span>
    </div>
    <div class="progress" role="progressbar" aria-label="Progreso del cuestionario"
      aria-valuenow="${currentQuestion + 1}" aria-valuemin="1" aria-valuemax="${quizQuestions.length}">
      <div class="progress-bar" style="width: ${progress}%"></div>
    </div>
    <fieldset class="border-0 p-0 m-0">
      <legend class="quiz-question" tabindex="-1">${question.pregunta}</legend>
      <div class="quiz-options">
        ${question.opciones.map((option, index) => `
          <div class="form-check quiz-option" id="option-${index}">
            <input class="form-check-input" type="radio" name="quizAnswer" id="answer-${index}"
              value="${index}" ${selectedOption === index ? "checked" : ""} ${answerConfirmed ? "disabled" : ""}>
            <label class="form-check-label" for="answer-${index}">${option}</label>
          </div>
        `).join("")}
      </div>
    </fieldset>
    <div id="answerFeedback" aria-live="polite"></div>
    <div class="quiz-actions">
      <button class="btn btn-primary" id="confirmAnswer" type="button" ${selectedOption === null || answerConfirmed ? "disabled" : ""}>
        Confirmar respuesta
      </button>
      <button class="btn btn-primary" id="nextQuestion" type="button" ${answerConfirmed ? "" : "disabled"}>
        ${currentQuestion === quizQuestions.length - 1 ? "Ver resultado" : "Siguiente"}
        <i class="bi bi-arrow-right ms-1" aria-hidden="true"></i>
      </button>
    </div>
  `;

  quizContent.querySelectorAll('input[name="quizAnswer"]').forEach((input) => {
    input.addEventListener("change", (event) => {
      selectedOption = Number(event.currentTarget.value);
      const confirmButton = quizContent.querySelector("#confirmAnswer");
      if (confirmButton) {
        confirmButton.disabled = false;
      }
    });
  });

  quizContent.querySelector("#confirmAnswer").addEventListener("click", confirmAnswer);
  quizContent.querySelector("#nextQuestion").addEventListener("click", goToNextQuestion);
}

function confirmAnswer() {
  if (selectedOption === null || answerConfirmed) {
    return;
  }

  const question = quizQuestions[currentQuestion];
  const isCorrect = selectedOption === question.correcta;
  answerConfirmed = true;
  if (isCorrect) {
    score += 1;
  }

  question.opciones.forEach((_, index) => {
    const option = quizContent.querySelector(`#option-${index}`);
    const input = quizContent.querySelector(`#answer-${index}`);
    input.disabled = true;
    if (index === question.correcta) {
      option.classList.add("is-correct");
    } else if (index === selectedOption) {
      option.classList.add("is-incorrect");
    }
  });

  const feedback = quizContent.querySelector("#answerFeedback");
  feedback.className = `quiz-feedback ${isCorrect ? "feedback-correct" : "feedback-incorrect"}`;
  feedback.innerHTML = `<strong>${isCorrect ? "¡Correcto!" : "No es esa."}</strong> ${question.explicacion}`;
  quizContent.querySelector("#confirmAnswer").disabled = true;
  quizContent.querySelector("#nextQuestion").disabled = false;
  quizContent.querySelector(".quiz-progress-meta span:last-child").textContent =
    `${score} ${score === 1 ? "respuesta correcta" : "respuestas correctas"}`;
}

function goToNextQuestion() {
  if (!answerConfirmed) {
    return;
  }

  if (currentQuestion === quizQuestions.length - 1) {
    renderResult();
    return;
  }

  currentQuestion += 1;
  selectedOption = null;
  answerConfirmed = false;
  renderQuestion();
  quizContent.querySelector("legend").focus?.();
}

function renderResult() {
  const percentage = Math.round((score / quizQuestions.length) * 100);
  const message = percentage < 60
    ? "Sigue estudiando 💪"
    : percentage < 80
      ? "¡Buen trabajo! Puedes mejorar 🌱"
      : "¡Excelente! Dominas el tema 🏆";
  const bestScore = saveBestScore(score);
  const bestScoreText = bestScore === null
    ? "No fue posible acceder al almacenamiento de este navegador."
    : `Tu mejor puntaje guardado: ${bestScore}/${quizQuestions.length}.`;

  quizContent.innerHTML = `
    <div class="quiz-result">
      <span class="result-icon" aria-hidden="true"><i class="bi bi-award"></i></span>
      <h3>Cuestionario completado</h3>
      <p class="result-score">${score}/${quizQuestions.length}</p>
      <p class="text-secondary">${percentage}% de respuestas correctas</p>
      <p class="result-message">${message}</p>
      <button class="btn btn-primary" id="restartQuiz" type="button">
        <i class="bi bi-arrow-clockwise me-2" aria-hidden="true"></i>Reiniciar cuestionario
      </button>
      <p class="best-score" role="status">${bestScoreText}</p>
    </div>
  `;

  quizContent.querySelector("#restartQuiz").addEventListener("click", restartQuiz);
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedOption = null;
  answerConfirmed = false;
  renderQuestion();
  quizContent.querySelector("legend").focus?.();
}

function initializeVideoUpload() {
  const video = document.querySelector("#videoPlayer");
  const upload = document.querySelector("#videoUpload");
  const status = document.querySelector("#videoStatus");
  let activeObjectUrl = null;

  upload.addEventListener("change", () => {
    const file = upload.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("video/")) {
      status.textContent = "El archivo seleccionado no parece ser un video. Elige un archivo de video e inténtalo de nuevo.";
      status.classList.add("status-error");
      upload.value = "";
      return;
    }

    if (activeObjectUrl) {
      URL.revokeObjectURL(activeObjectUrl);
    }

    activeObjectUrl = URL.createObjectURL(file);
    video.src = activeObjectUrl;
    video.load();
    status.classList.remove("status-error");
    status.textContent = `Video cargado: ${file.name}. Pulsa reproducir para verlo.`;
  });

  video.addEventListener("error", () => {
    status.textContent = "No se pudo reproducir este video. Sube un archivo de video compatible desde tu equipo.";
    status.classList.add("status-error");
  });

  video.addEventListener("loadedmetadata", () => {
    if (activeObjectUrl) {
      status.classList.remove("status-error");
      status.textContent = "Video listo para reproducir.";
    }
  });

  window.addEventListener("beforeunload", () => {
    if (activeObjectUrl) {
      URL.revokeObjectURL(activeObjectUrl);
    }
  });
}

function initializeRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
}

function initializeNavigation() {
  const menu = document.querySelector("#siteMenu");
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("show") && window.bootstrap?.Collapse) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
}

function initializePage() {
  document.querySelector("#currentYear").textContent = String(new Date().getFullYear());
  renderQuestion();
  initializeVideoUpload();
  initializeRevealAnimations();
  initializeNavigation();
}

initializePage();
