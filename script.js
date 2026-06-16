document.addEventListener('DOMContentLoaded', () => {
    // URL Costanti
    const TEST_URL = "https://eu.jotform.com/243445743022047";
    const WHATSAPP_URL = "https://wa.me/393489247001?text=Ciao%20Giovanni%2C%20vorrei%20ricevere%20informazioni%20sul%20percorso%20FisioIntegra.";
    const INSTAGRAM_URL = "https://www.instagram.com/giovanni.cavone.fisioterapista/";
    const LINKTREE_URL = "https://linktr.ee/FisioIntegra";

    // 1. Gestione Navbar allo scroll
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Chiudi il menu mobile cliccando su un link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 3. Gestione Hero Video (Nuova Logica)
    const video = document.getElementById("heroVideo");
    if (video) {
        video.muted = true;
        video.controls = false;
        video.play().catch(() => {});
        
        video.addEventListener("mouseenter", () => {
            video.controls = true;
            video.muted = false;
        });
        
        video.addEventListener("mouseleave", () => {
            video.controls = false;
            video.muted = true;
        });
        
        video.addEventListener("click", () => {
            video.controls = true;
            video.muted = !video.muted;
        });
    }

    // 4. Modale Prenotazione
    const modalOverlay = document.getElementById('bookingModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const bookingForm = document.getElementById('bookingForm');

    if (modalOverlay) {
        if (openModalBtn) {
            openModalBtn.addEventListener('click', () => {
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const nome = document.getElementById('b_name').value;
                const telefono = document.getElementById('b_phone').value;
                const giorno = document.getElementById('b_day').value;
                const ora = document.getElementById('b_time').value;
                const email = document.getElementById('b_email').value;
                const msg = document.getElementById('b_msg').value;

                let testoWhatsApp = `Ciao Giovanni, vorrei richiedere un primo colloquio FisioIntegra.\n\n*Dettagli:*\n- Nome: ${nome}\n- Telefono: ${telefono}\n- Giorno preferito: ${giorno}\n- Fascia oraria: ${ora}`;
                
                if(email) testoWhatsApp += `\n- Email: ${email}`;
                if(msg) testoWhatsApp += `\n- Messaggio: ${msg}`;

                testoWhatsApp += `\n\nAttendo una tua conferma sulla disponibilità. Grazie!`;

                const encodedText = encodeURIComponent(testoWhatsApp);
                const waUrl = `https://wa.me/393489247001?text=${encodedText}`;

                window.open(waUrl, '_blank', 'noopener,noreferrer');
                
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
                bookingForm.reset();
            });
        }
    }

    // 5. Chatbot Logic
    const chatBubble = document.getElementById('chatBubble');
    const chatWindow = document.getElementById('chatWindow');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');

    // Funzione per generare un piccolo suono di click con Web Audio API
    const playClickSound = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
            
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) {
            console.warn("AudioContext non supportato o bloccato.", e);
        }
    };

    if (chatBubble && chatWindow && chatCloseBtn && chatForm && chatInput && chatMessages) {
        
        chatBubble.addEventListener('click', () => {
            playClickSound();
            chatWindow.classList.add('active');
            chatBubble.classList.add('hidden');
        });

        chatCloseBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active');
            chatBubble.classList.remove('hidden');
        });

        const getBotResponse = (text) => {
            const lower = text.toLowerCase();

            if (lower.includes('schiena') || lower.includes('dolore') || lower.includes('postura')) {
                return "Mi dispiace che tu stia vivendo questo disagio. Posso aiutarti a orientarti, ma non posso fornire diagnosi. FisioIntegra lavora su ascolto, movimento, prevenzione e benessere. Ti consiglio di iniziare dal test gratuito o di contattare Giovanni su WhatsApp per capire il primo passo più adatto.";
            }
            if (lower.includes('test') || lower.includes('gratuito') || lower.includes('questionario')) {
                return `Il test gratuito serve a raccogliere alcune informazioni iniziali sui tuoi bisogni e sui tuoi obiettivi. Non sostituisce una visita, ma aiuta a orientarti verso il percorso FisioIntegra più adatto. Puoi iniziarlo qui: <a href='${TEST_URL}' target='_blank' rel='noopener noreferrer' style='color:var(--color-primary);text-decoration:underline;'>${TEST_URL}</a>`;
            }
            if (lower.includes('prenota') || lower.includes('colloquio') || lower.includes('appuntamento')) {
                return "Puoi inviare una richiesta di primo colloquio tramite il pulsante Prenota un primo colloquio. La richiesta non conferma automaticamente l’appuntamento: Giovanni ti risponderà su WhatsApp per verificare disponibilità e modalità.";
            }
            if (lower.includes('metodo') || lower.includes('fisiointegra')) {
                return "Il metodo FisioIntegra integra ascolto, movimento, prevenzione e benessere. L’obiettivo è leggere il corpo come un sistema connesso e costruire un percorso più consapevole e sostenibile.";
            }
            if (lower.includes('diagnosi') || lower.includes('terapia') || lower.includes('cura')) {
                return "Non posso fornire diagnosi, prescrizioni o indicazioni terapeutiche personalizzate. Per valutazioni cliniche è necessario rivolgersi a Giovanni, al proprio medico o a uno specialista.";
            }
            if (lower.includes('whatsapp') || lower.includes('contatto') || lower.includes('telefono')) {
                return `Puoi contattare Giovanni su WhatsApp da qui: <a href='${WHATSAPP_URL}' target='_blank' rel='noopener noreferrer' style='color:var(--color-primary);text-decoration:underline;'>Apri WhatsApp</a>`;
            }
            if (lower.includes('instagram') || lower.includes('reel') || lower.includes('social')) {
                return `Puoi seguire i contenuti educativi e i reel di Giovanni su Instagram: <a href='${INSTAGRAM_URL}' target='_blank' rel='noopener noreferrer' style='color:var(--color-primary);text-decoration:underline;'>${INSTAGRAM_URL}</a>`;
            }

            return "Posso aiutarti a orientarti tra metodo FisioIntegra, test gratuito, primo colloquio e aree di intervento. Per una risposta più precisa ti consiglio di contattare Giovanni su WhatsApp oppure iniziare dal test gratuito.";
        };

        const appendMessage = (text, sender) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${sender}-message`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.innerHTML = text;
            
            msgDiv.appendChild(contentDiv);
            
            const suggestionsEl = document.getElementById('chatSuggestions');
            if (suggestionsEl) {
                chatMessages.insertBefore(msgDiv, suggestionsEl);
            } else {
                chatMessages.appendChild(msgDiv);
            }
            
            // scroll al fondo
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 10);
        };

        const sendUserMessage = (text) => {
            appendMessage(text, 'user');
            if(chatInput) {
                chatInput.value = '';
            }
            
            setTimeout(() => {
                const response = getBotResponse(text);
                appendMessage(response, 'ai');
            }, 600);
        };

        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;
            sendUserMessage(text);
        });

        if (suggestionChips) {
            suggestionChips.forEach(chip => {
                chip.addEventListener('click', () => {
                    const text = chip.textContent;
                    sendUserMessage(text);
                });
            });
        }

        // Upload Modal Logic
        const chatAttachBtn = document.getElementById('chatAttachBtn');
        const chatUploadModal = document.getElementById('chatUploadModal');
        const closeUploadModalBtn = document.getElementById('closeUploadModalBtn');
        const triggerFileInputBtn = document.getElementById('triggerFileInputBtn');
        const chatFileInput = document.getElementById('chatFileInput');
        const uploadFileList = document.getElementById('uploadFileList');
        const uploadErrorMsg = document.getElementById('uploadErrorMsg');
        const confirmUploadBtn = document.getElementById('confirmUploadBtn');
        
        let selectedFiles = [];

        if (chatAttachBtn && chatUploadModal) {
            chatAttachBtn.addEventListener('click', () => {
                chatUploadModal.classList.add('active');
            });
            
            closeUploadModalBtn.addEventListener('click', () => {
                chatUploadModal.classList.remove('active');
                selectedFiles = [];
                updateFileListUI();
                uploadErrorMsg.style.display = 'none';
            });

            triggerFileInputBtn.addEventListener('click', () => {
                chatFileInput.click();
            });

            chatFileInput.addEventListener('change', (e) => {
                const files = Array.from(e.target.files);
                if (files.length + selectedFiles.length > 10) {
                    uploadErrorMsg.style.display = 'block';
                } else {
                    uploadErrorMsg.style.display = 'none';
                    selectedFiles = [...selectedFiles, ...files];
                    updateFileListUI();
                }
                chatFileInput.value = ''; // reset input
            });

            function updateFileListUI() {
                uploadFileList.innerHTML = '';
                selectedFiles.forEach((file, index) => {
                    const item = document.createElement('div');
                    item.className = 'upload-file-item';
                    item.innerHTML = `
                        <span>${file.name}</span>
                        <button type="button" class="btn-remove-file" data-index="${index}" style="background:none;border:none;color:red;cursor:pointer;">&times;</button>
                    `;
                    uploadFileList.appendChild(item);
                });

                document.querySelectorAll('.btn-remove-file').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = parseInt(e.target.getAttribute('data-index'));
                        selectedFiles.splice(idx, 1);
                        updateFileListUI();
                        uploadErrorMsg.style.display = 'none';
                    });
                });
            }

            confirmUploadBtn.addEventListener('click', () => {
                if (selectedFiles.length === 0) {
                    chatUploadModal.classList.remove('active');
                    return;
                }
                
                const numFiles = selectedFiles.length;
                chatUploadModal.classList.remove('active');
                selectedFiles = [];
                updateFileListUI();
                
                appendMessage(`Ho allegato ${numFiles} file per la valutazione.`, 'user');
                
                setTimeout(() => {
                    const msg = `Hai selezionato ${numFiles} file. In questa versione puoi inviare il materiale a Giovanni tramite WhatsApp. Apri WhatsApp e allega manualmente la foto o il video alla conversazione, così Giovanni potrà prenderlo in carico come supporto alla tua richiesta.<br><br>
                    <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" style="display:inline-block; margin-bottom:8px; margin-top:8px; padding:6px 12px; background-color:var(--color-primary); color:white; border-radius:4px; text-decoration:none;">Invia materiale su WhatsApp</a><br>
                    <small style="font-size:0.85em; opacity:0.8; display:block; line-height:1.4;">Nota: il sito non allega automaticamente i file a WhatsApp. Dopo l’apertura della chat, allega manualmente foto o video dal tuo dispositivo.</small>`;
                    appendMessage(msg, 'ai');
                }, 600);
            });
        }
    }
});
