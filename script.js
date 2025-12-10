// Variables globales
let currentQuestion = 0;
let answers = [];
let identificationResult = null;
let questions = [];

// Datos de las preguntas (clave dicotómica)
const questionData = [
    {
        id: 1,
        question: "Observa los ojos y su pedúnculo (tallo ocular). ¿Cómo son?",
        image: "https://images.unsplash.com/photo-1559253664-ca249d4608c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        options: [
            {
                text: "Ojos bien desarrollados, con córneas oscuras (pigmentadas) y claramente diferenciadas. El pedúnculo ocular es móvil y de longitud variable, pero nunca extremadamente largo y rígido.",
                value: "eyes_developed",
                nextQuestion: 2
            },
            {
                text: "Ojos reducidos, pequeños, a menudo sin pigmento (blanquecinos o transparentes), o incluso ausentes. En algunos géneros, el pedúnculo ocular puede ser muy largo, rígido y aplanado, pareciendo una espina más.",
                value: "eyes_reduced",
                nextQuestion: 4
            }
        ]
    },
    {
        id: 2,
        question: "Observa el caparazón (región dorsal del cefalotórax), específicamente la región entre las espinas rostrales (si las hay). ¿Qué forma tiene?",
        image: "https://images.unsplash.com/photo-1578632749014-ca77efd052eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        options: [
            {
                text: "El caparazón tiene una cresta media transversal claramente definida, que a menudo está elevada y puede tener espinas o lóbulos. Esta cresta separa las fosas gástricas (anteriores) de las cardíacas (posteriores). El rostro es generalmente ancho en la base.",
                value: "crest_present",
                nextQuestion: 3,
                familyHint: "munididae"
            },
            {
                text: "El caparazón NO tiene una cresta media transversal prominente. El perfil dorsal es más liso o tiene crestas longitudinales. El rostro suele ser más estrecho y triangular.",
                value: "crest_absent",
                nextQuestion: 5
            }
        ]
    },
    {
        id: 3,
        question: "Observa las pinzas (quelípedos). ¿Cómo son?",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        options: [
            {
                text: "Pinzas relativamente robustas, cubiertas de escamas, tubérculos o espinas, a menudo con estrías transversales. Suelen estar cubiertas de una pubescencia (pelos cortos) densa, que a veces oculta la ornamentación.",
                value: "claws_robust",
                result: "munididae"
            },
            {
                text: "Pinzas largas, delgadas, cilíndricas y casi lisas, con muy poca pubescencia.",
                value: "claws_slender",
                result: "munididae" // Aún Munididae pero con características atípicas
            }
        ]
    },
    {
        id: 4,
        question: "Observa el rostro (proyección frontal entre los ojos). ¿Cómo es?",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        options: [
            {
                text: "Rostro bien definido, triangular o lanceolado, a veces con espinas laterales. Generalmente se eleva desde el caparazón.",
                value: "rostrum_defined",
                result: "munidopsidae"
            },
            {
                text: "Rostro prácticamente ausente o muy reducido, apenas diferenciado del caparazón.",
                value: "rostrum_absent",
                nextQuestion: 6
            }
        ]
    },
    {
        id: 5,
        question: "¿En qué rango de profundidad fue recolectado el espécimen?",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        options: [
            {
                text: "Menos de 1000 metros (plataforma continental o talud superior)",
                value: "depth_shallow",
                result: "munididae"
            },
            {
                text: "Más de 1000 metros (talud profundo o llanura abisal)",
                value: "depth_deep",
                result: "munidopsidae"
            }
        ]
    },
    {
        id: 6,
        question: "Observa la superficie del caparazón. ¿Cómo es su textura?",
        image: "https://images.unsplash.com/photo-1568145675395-66fe2a4a7a5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        options: [
            {
                text: "Caparazón con superficie lisa o finamente granulada, a menudo translúcido en ejemplares vivos.",
                value: "surface_smooth",
                result: "munidopsidae"
            },
            {
                text: "Caparazón con espinas bien desarrolladas, tubérculos o una ornamentación marcada.",
                value: "surface_spiny",
                result: "munididae"
            }
        ]
    }
];

// Datos de resultados
const resultData = {
    munididae: {
        title: "Munididae",
        icon: "fas fa-fish",
        color: "#e74c3c",
        description: "El espécimen pertenece a la familia <strong>Munididae</strong>. Estas langostas squat se caracterizan por ojos bien desarrollados con córneas pigmentadas, presencia frecuente de una cresta transversal en el caparazón, y habitan principalmente en la plataforma continental y talud superior (0-2000 m de profundidad).",
        characteristics: [
            {
                title: "Ojos",
                value: "Bien desarrollados, con córneas pigmentadas"
            },
            {
                title: "Caparazón",
                value: "A menudo con cresta transversal definida y ornamentación espinosa"
            },
            {
                title: "Hábitat típico",
                value: "Plataforma continental y talud superior (0-2000 m)"
            },
            {
                title: "Género representativo",
                value: "<em>Munida</em>"
            },
            {
                title: "Distribución",
                value: "Global en todos los océanos"
            }
        ]
    },
    munidopsidae: {
        title: "Munidopsidae",
        icon: "fas fa-water",
        color: "#27ae60",
        description: "El espécimen pertenece a la familia <strong>Munidopsidae</strong>. Estas langostas squat de aguas profundas se caracterizan por ojos reducidos o ausentes, caparazón a menudo liso o finamente granulado, y habitan en el talud profundo y llanuras abisales (por debajo de 1000 m, hasta más de 5000 m).",
        characteristics: [
            {
                title: "Ojos",
                value: "Reducidos, pequeños o ausentes, sin pigmento"
            },
            {
                title: "Caparazón",
                value: "Generalmente liso, a menudo frágil y translúcido"
            },
            {
                title: "Hábitat típico",
                value: "Talud profundo y llanuras abisales (1000-5000+ m)"
            },
            {
                title: "Género representativo",
                value: "<em>Munidopsis</em>"
            },
            {
                title: "Distribución",
                value: "Global, exclusivamente en aguas profundas"
            }
        ]
    }
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadHistory();
});

// Inicializar la aplicación
function initializeApp() {
    questions = questionData;
    updateQuestion();
    setupDateField();
}

// Configurar escuchadores de eventos
function setupEventListeners() {
    // Botones de navegación
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('prevBtn').addEventListener('click', prevQuestion);
    document.getElementById('resetBtn').addEventListener('click', resetIdentification);
    
    // Botón para nueva identificación
    document.getElementById('newIdentificationBtn').addEventListener('click', function() {
        document.getElementById('resultSection').style.display = 'none';
        document.getElementById('questionSection').style.display = 'block';
        resetIdentification();
    });
    
    // Formulario de espécimen
    document.getElementById('specimenForm').addEventListener('submit', saveSpecimen);
    
    // Enlaces del footer
    document.getElementById('toggleInstructions').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('instructionsModal').style.display = 'flex';
    });
    
    document.getElementById('toggleAbout').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('aboutModal').style.display = 'flex';
    });
    
    document.getElementById('exportData').addEventListener('click', function(e) {
        e.preventDefault();
        exportData();
    });
    
    // Cerrar modales
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Configurar campo de fecha con fecha actual
function setupDateField() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('collectionDate').value = today;
}

// Actualizar la pregunta actual
function updateQuestion() {
    const question = questions[currentQuestion];
    
    // Actualizar elementos de la pregunta
    document.getElementById('questionTitle').textContent = `Pregunta ${question.id}`;
    document.getElementById('questionText').textContent = question.question;
    
    // Actualizar imagen
    const imageContainer = document.getElementById('questionImageContainer');
    imageContainer.innerHTML = `
        <img src="${question.image}" alt="Ilustración de la pregunta ${question.id}">
        <div class="image-caption">Característica morfológica de referencia</div>
    `;
    
    // Actualizar opciones
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'option-btn';
        if (answers[currentQuestion] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.innerHTML = `
            <div class="option-icon">${getOptionIcon(index)}</div>
            <div class="option-text">${option.text}</div>
        `;
        
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Actualizar barra de progreso
    updateProgressBar();
    
    // Actualizar estado de botones
    updateNavigationButtons();
}

// Obtener icono para opción
function getOptionIcon(index) {
    const icons = ['A', 'B', 'C', 'D'];
    return icons[index] || String.fromCharCode(65 + index);
}

// Seleccionar una opción
function selectOption(optionIndex) {
    // Deseleccionar todas las opciones
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Seleccionar la opción clickeada
    document.querySelectorAll('.option-btn')[optionIndex].classList.add('selected');
    
    // Guardar respuesta
    answers[currentQuestion] = optionIndex;
    
    // Habilitar botón siguiente
    document.getElementById('nextBtn').disabled = false;
}

// Avanzar a la siguiente pregunta
function nextQuestion() {
    const question = questions[currentQuestion];
    const selectedOptionIndex = answers[currentQuestion];
    
    if (selectedOptionIndex === undefined) {
        alert('Por favor, selecciona una opción antes de continuar.');
        return;
    }
    
    const selectedOption = question.options[selectedOptionIndex];
    
    // Verificar si esta opción lleva a un resultado directo
    if (selectedOption.result) {
        showResult(selectedOption.result);
        return;
    }
    
    // Ir a la siguiente pregunta
    if (selectedOption.nextQuestion) {
        // Buscar la pregunta por ID
        const nextQuestionIndex = questions.findIndex(q => q.id === selectedOption.nextQuestion);
        if (nextQuestionIndex !== -1) {
            currentQuestion = nextQuestionIndex;
            updateQuestion();
        }
    } else {
        // Avanzar a la siguiente pregunta en secuencia
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            updateQuestion();
        }
    }
}

// Retroceder a la pregunta anterior
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        updateQuestion();
    }
}

// Mostrar resultado de la identificación
function showResult(family) {
    identificationResult = family;
    const result = resultData[family];
    
    // Ocultar sección de preguntas, mostrar resultados
    document.getElementById('questionSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';
    
    // Actualizar título de resultado
    document.getElementById('resultTitle').innerHTML = `<i class="${result.icon}"></i> Resultado: ${result.title}`;
    
    // Actualizar tarjeta de resultado
    const resultCard = document.getElementById('resultCard');
    resultCard.className = `result-card ${family}`;
    resultCard.innerHTML = `
        <div class="result-title">
            <i class="${result.icon}" style="color: ${result.color};"></i>
            <span>Familia: ${result.title}</span>
        </div>
        <div class="result-description">${result.description}</div>
    `;
    
    // Actualizar características
    const detailsGrid = document.getElementById('detailsGrid');
    detailsGrid.innerHTML = '';
    
    result.characteristics.forEach(char => {
        const detailItem = document.createElement('div');
        detailItem.className = 'detail-item';
        detailItem.innerHTML = `
            <div class="detail-title">${char.title}</div>
            <div class="detail-value">${char.value}</div>
        `;
        detailsGrid.appendChild(detailItem);
    });
    
    // Actualizar el formulario con el resultado
    document.getElementById('specimenForm').dataset.family = family;
    
    // Cargar historial actualizado
    loadHistory();
}

// Actualizar barra de progreso
function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
}

// Actualizar estado de botones de navegación
function updateNavigationButtons() {
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').disabled = answers[currentQuestion] === undefined;
}

// Reiniciar identificación
function resetIdentification() {
    currentQuestion = 0;
    answers = [];
    identificationResult = null;
    updateQuestion();
    
    // Limpiar mensaje de guardado
    document.getElementById('saveResult').innerHTML = '';
    document.getElementById('saveResult').className = 'save-result';
}

// Guardar espécimen en Supabase
async function saveSpecimen(e) {
    e.preventDefault();
    
    console.log('💾 Intentando guardar espécimen...');
    
    const saveBtn = document.getElementById('saveSpecimenBtn');
    const saveResult = document.getElementById('saveResult');
    
    // Verificar que supabase esté disponible
    if (typeof supabase === 'undefined' && typeof window.supabase === 'undefined') {
        console.error('Supabase no disponible');
        saveResult.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Error: No hay conexión con la base de datos</div>';
        saveResult.className = 'save-result error';
        return;
    }
    
    // Usar window.supabase si está disponible
    const supabaseClient = window.supabase || supabase;
    
    // Obtener datos del formulario
    const specimenData = {
        family: document.getElementById('specimenForm').dataset.family,
        specimen_name: document.getElementById('specimenName').value || 'Sin nombre',
        collection_date: document.getElementById('collectionDate').value,
        depth: document.getElementById('depth').value ? parseInt(document.getElementById('depth').value) : null,
        location: document.getElementById('location').value || 'No especificada',
        notes: document.getElementById('notes').value || 'Sin notas',
        identification_date: new Date().toISOString(),
        answers: JSON.stringify(answers)
    };
    
    // Validar datos requeridos
    if (!specimenData.family) {
        saveResult.innerHTML = '<div class="error-message">Error: No hay un resultado de identificación para guardar.</div>';
        saveResult.className = 'save-result error';
        return;
    }
    
    try {
        // Deshabilitar botón durante el guardado
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
        
        console.log('📤 Enviando datos a Supabase:', specimenData);
        
        // Insertar en Supabase - FORMA CORREGIDA
        const { data, error } = await supabaseClient
            .from('specimens')
            .insert([specimenData])
            .select('*'); // Asegurar que devuelve datos
        
        console.log('📨 Respuesta de Supabase:', { data, error });
        
        if (error) {
            console.error('❌ Error de Supabase:', error);
            throw error;
        }
        
        // VERIFICAR QUE DATA NO SEA NULL
        if (!data || data.length === 0) {
            console.warn('⚠️ Supabase devolvió data null o vacío');
            
            // Aún mostrar éxito, pero con mensaje diferente
            saveResult.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i> 
                    <strong>¡Guardado exitoso!</strong>
                    <p>El espécimen se guardó correctamente.</p>
                    <small>ID: Generado por base de datos</small>
                </div>
            `;
        } else {
            // Éxito con datos
            console.log('✅ Guardado exitoso. Datos:', data[0]);
            
            saveResult.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i> 
                    <strong>¡Guardado exitoso!</strong>
                    <p>ID: ${data[0].id || 'N/A'}</p>
                    <small>${new Date().toLocaleTimeString()}</small>
                </div>
            `;
        }
        
        saveResult.className = 'save-result success';
        
        // Limpiar formulario (excepto fecha)
        document.getElementById('specimenName').value = '';
        document.getElementById('depth').value = '';
        document.getElementById('location').value = '';
        document.getElementById('notes').value = '';
        
        // Cargar historial actualizado después de 1 segundo
        setTimeout(() => {
            loadHistory();
        }, 1000);
        
    } catch (error) {
        console.error('❌ Error al guardar espécimen:', error);
        
        let errorMessage = 'Error desconocido';
        if (error.message) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }
        
        saveResult.innerHTML = `
            <div class="error-message">
                <i class="fas fa-times-circle"></i> 
                <strong>Error al guardar</strong>
                <p>${errorMessage}</p>
                <small>Verifica tu conexión a internet y la configuración de Supabase</small>
            </div>
        `;
        saveResult.className = 'save-result error';
        
        // Mostrar detalles en consola para debugging
        console.log('🔍 Debug info:', {
            supabaseConfig: {
                url: SUPABASE_URL || 'No configurada',
                keyLength: (SUPABASE_ANON_KEY || '').length
            },
            specimenData,
            error
        });
        
    } finally {
        // Restaurar botón
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Guardar en Base de Datos';
    }
}
// Cargar historial de identificaciones
async function loadHistory() {
    const historyContainer = document.getElementById('historyContainer');
    
    try {
        // Obtener los últimos 5 especímenes
        const { data, error } = await supabase
            .from('specimens')
            .select('*')
            .order('identification_date', { ascending: false })
            .limit(5);
        
        if (error) throw error;
        
        if (data.length === 0) {
            historyContainer.innerHTML = '<p>No hay identificaciones guardadas aún.</p>';
            return;
        }
        
        // Generar HTML para cada ítem del historial
        historyContainer.innerHTML = data.map(specimen => {
            const date = new Date(specimen.identification_date);
            const formattedDate = date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            const familyClass = specimen.family === 'munididae' ? 'munididae' : 'munidopsidae';
            const familyName = specimen.family === 'munididae' ? 'Munididae' : 'Munidopsidae';
            
            return `
                <div class="history-item ${familyClass}">
                    <div class="history-header">
                        <div class="history-family">${familyName}</div>
                        <div class="history-date">${formattedDate}</div>
                    </div>
                    <div class="history-details">
                        <strong>Nombre:</strong> ${specimen.specimen_name}<br>
                        <strong>Profundidad:</strong> ${specimen.depth ? specimen.depth + ' m' : 'No registrada'}<br>
                        <strong>Ubicación:</strong> ${specimen.location}
                    </div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error al cargar historial:', error);
        historyContainer.innerHTML = '<p>Error al cargar el historial.</p>';
    }
}

// Exportar datos (simulada)
function exportData() {
    alert('Función de exportación de datos. En una implementación completa, esto generaría un archivo CSV o PDF con todos los datos de identificaciones.');
    // En una implementación real, aquí se obtendrían todos los datos y se generarían para descarga
}

// Nota: La configuración de Supabase está en un archivo separado (supabase-config.js)
// para mayor seguridad