# Landing Page FisioIntegra

Questo progetto è una landing page/funnel statico per il Project Work LUM collegato al caso studio **FisioIntegra** di Giovanni Cavone e realizzato da **Socialin Communication / Federica Creative**.

## Struttura dei File Creati

* **`index.html`**: Il file principale che contiene la struttura della pagina (Hero, Problema, Metodo, Aree, Community). Include la logica per la Modal pre-compilata e il Chatbot.
* **`style.css`**: Il file con lo stile visivo "premium wellness", con layout responsive, palette predefinita (verde salvia, teal, corallo) e design moderno.
* **`script.js`**: Lo script per gestire le interazioni base (menu mobile, animazione navbar, video, logica di apertura della modale, script di risposta basata su keyword del chatbot).
* **`privacy.html`**: Pagina con le informazioni relative al trattamento dati e l'avviso riguardante il chatbot e le piattaforme esterne.
* **`faq.html`**: Sezione Domande Frequenti.
* **`README.md`**: Questo file, con le istruzioni base.
* **`PROMPT_MODIFICHE_FISIOINTEGRA.md`**: Un documento contenente dei prompt già pronti per richiedere modifiche future all'Intelligenza Artificiale.
* **`assets/`**: La cartella che contiene tutte le immagini e i video, inclusi `hero-fisiointegra.mp4` e `logo-fisiointegra.png`.

## Funzionalità Integrate

### Calendario Prenotazioni
Il calendario attualmente integrato **è solo grafico (front-end)**. Quando un utente seleziona giorno e ora e clicca su "Invia richiesta", i dati non vengono salvati in un database ma vengono formattati e inviati precompilati tramite **WhatsApp** al numero di Giovanni.
*Cosa serve per il futuro:* Per avere un calendario reale e sincronizzato, sarà necessario collegare servizi come Calendly, TidyCal, Google Calendar Appointment Schedule, oppure sviluppare un back-end personalizzato.

### Chatbot (Giovanni AI)
Il chatbot presente in basso a destra **è un prototipo front-end**. Risponde tramite logica predefinita a parole chiave inserite dall'utente (es. "dolore", "prenotazione", "metodo").
*Cosa serve per il futuro:* Per renderlo una vera Intelligenza Artificiale capace di generare risposte non pre-impostate, sarà necessario collegarlo tramite API a modelli come Gemini, OpenAI o Claude, implementando un back-end sicuro (per non esporre le API Key nel codice front-end), fornendo una knowledge base e assicurando supervisione professionale per evitare che l'IA dia consigli medici inappropriati.

### Funzione Allegati (Upload File)
La funzione allegati è dimostrativa. Per inviare automaticamente foto/video a Giovanni servono un modulo con upload, un backend sicuro o un servizio esterno come Jotform, Tally, Typeform o Netlify Forms.
* storage sicuro per i file;
* informativa privacy/GDPR completa;
* consenso esplicito dell’utente;
* regole chiare su dati sanitari e conservazione dei file.

> **Importante:** Non inserire mai API key o credenziali email direttamente nel codice front-end.

## Come visualizzare il sito in locale
1. Apri il file `index.html` con il tuo browser web preferito (es. Chrome, Safari).
2. Se desideri fare delle modifiche e testarle live, puoi usare l'estensione **Live Server** in Visual Studio Code.
