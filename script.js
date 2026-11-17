/* ==========================================================================
   TAMAN TAMBAH CERIA (ADDITION GARDEN ADVENTURE) - JAVASCRIPT LOGIC
   ========================================================================== */

// ==========================================================================
// 1. SUPABASE CONFIGURATION (PLACEHOLDERS - REPLACE WITH YOUR PROJECT KEYS)
// ==========================================================================
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL"; // e.g. "https://xyzcompany.supabase.co"
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY"; // Public anon key ONLY (Never service_role!)

let supabaseClient = null;
let isSupabaseConnected = false;

if (
  typeof window.supabase !== "undefined" &&
  SUPABASE_URL.startsWith("https://") &&
  SUPABASE_ANON_KEY.length > 20
) {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    isSupabaseConnected = true;
  } catch (err) {
    console.warn("Supabase initialization fallback to local mode:", err);
  }
}

// ==========================================================================
// 2. BILINGUAL DICTIONARY (BAHASA MELAYU DEFAULT & ENGLISH)
// ==========================================================================
let currentLang = "ms";

const i18n = {
  ms: {
    siteTitle: "Taman Tambah Ceria",
    siteSub: "Matematik Tahun 1 • SP 2.2.2",
    navHome: "Peta Taman",
    navVideo: "1. Taman Video",
    navConcept: "2. Taman Konsep",
    navNumline: "3. Taman Garis Nombor",
    navChallenge: "4. Taman Cabaran",
    navFeedback: "Suara Murid",
    navTeacher: "Guru",
    musicOff: "Muzik: Tutup",
    musicOn: "Muzik: Pasang",
    progressLabel: "Jejak Kemajuan Taman:",
    curriculumPill: "KSSR Matematik Tahun 1 • SK 2.2 • SP 2.2.2 (Tambah dalam lingkungan 100)",
    heroTitle: "Jom Teroka Taman Tambah!",
    heroSubtitle: "Belajar Matematik sambil meneroka taman yang menyeronokkan.",
    heroDesc: "Selamat datang penjelajah cilik! Ikuti laluan batu di taman botani ini untuk menonton video, mengira bunga, melompat di atas garis nombor, dan menyahut cabaran penjaga taman.",
    btnStartAdventure: "Mula Pengembaraan",
    btnInfoPedagogy: "Info Pembelajaran & RPH",
    mapTitle: "Peta Laluan Taman Botani",
    mapSub: "Klik mana-mana hentian taman di bawah atau ikuti langkah 1 hingga 4.",
    dest1Title: "Taman Video",
    dest1Desc: "Tonton video pengenalan konsep tambah yang ceria.",
    dest2Title: "Taman Konsep",
    dest2Desc: "Fahami gabungan dua kumpulan bunga & papan tambah interaktif.",
    dest3Title: "Taman Garis Nombor",
    dest3Desc: "Gerakkan penanda pada garis nombor & teroka blok puluh dan sa.",
    dest4Title: "Taman Cabaran",
    dest4Desc: "Jawab 5 soalan Cabaran Penjaga Taman dan cetak sijil anda!",
    statusPending: "Belum Selesai",
    statusDone: "Selesai ✓",
    cardFeedbackTitle: "Suara Penjelajah Taman",
    cardFeedbackDesc: "Kongsikan pendapat anda selepas meneroka taman.",
    cardRphTitle: "Rancangan Pengajaran Harian (RPH)",
    cardRphDesc: "Ruang dokumentasi pengajaran guru Matematik Tahun 1.",
    cardAboutTitle: "Tentang Projek & Pembangun",
    cardAboutDesc: "Maklumat kurikulum, etika digital dan profil pembangun.",
    sec1Badge: "Hentian 1 • Set Induksi",
    videoTitle: "Jom Belajar Tambah!",
    videoInstruction: "Tonton video di bawah dengan teliti untuk mengenali asas operasi tambah. Setelah selesai menonton, tekan butang Teruskan Pembelajaran di bawah.",
    videoNotice: "Pastikan anda telah menonton video sehingga faham sebelum meneruskan perjalanan ke Taman Konsep.",
    btnBackMap: "Kembali ke Peta",
    btnContinueLearning: "Teruskan Pembelajaran",
    sec2Badge: "Hentian 2 • Konsep Asas Tambah",
    conceptTitle: "Apakah Maksud Tambah?",
    conceptExplain: "Tambah bermaksud menggabungkan dua kumpulan objek untuk mencari jumlah kesemuanya.",
    group1Label: "Kumpulan Pertama: 3 bunga",
    group2Label: "Kumpulan Kedua: 2 bunga",
    groupTotalLabel: "Jumlah Gabungan: 5 bunga",
    plusMeaning: "Tambah",
    equalsMeaning: "Sama dengan",
    mathSentenceLabel: "Ayat Matematik:",
    symPlusTitle: "Simbol Tambah (+)",
    symPlusDesc: "Digunakan apabila kita menggabungkan atau menambah dua bilangan.",
    symEqualsTitle: "Simbol Sama Dengan (=)",
    symEqualsDesc: "Menunjukkan jumlah keseluruhan selepas kedua-dua kumpulan digabungkan.",
    boardTitle: "Papan Tambah Interaktif (0 hingga 20)",
    boardGuide: "Ikuti urutan klik: 1. Pilih Nombor Pertama ➔ 2. Klik (+) ➔ 3. Pilih Nombor Kedua ➔ 4. Klik (=).",
    boardStep1Prompt: "Langkah 1: Sila klik nombor pertama pada papan nombor di bawah.",
    boardStep2Prompt: "Langkah 2: Bagus! Sekarang klik simbol merah (+) untuk menambah.",
    boardStep3Prompt: "Langkah 3: Hebat! Sekarang pilih nombor kedua pada papan nombor.",
    boardStep4Prompt: "Langkah 4: Klik simbol kuning (=) untuk melihat jumlah keseluruhan!",
    btnReset: "Set Semula",
    btnPrevSection: "Sebelum",
    btnToNumline: "Ke Taman Garis Nombor",
    sec3Badge: "Hentian 3 • Garis Nombor & Nilai Tempat",
    nlTitle: "Taman Garis Nombor Interaktif (0 – 20)",
    nlIntro: "Sentuh dan seret penanda kumbang (🐞) ke kanan di atas garis nombor untuk melakukan operasi tambah.",
    nlQuestionCounter: "Soalan",
    nlStartLabel: "Mula:",
    nlJumpsLabel: "Lompatan:",
    nlCurrentLabel: "Kedudukan:",
    nlTouchHint: "👆 Sentuh & seret penanda 🐞 ke kanan di sepanjang garis nombor",
    btnPrevStep: "Langkah Sebelum",
    btnNextStep: "Langkah Seterusnya",
    btnAnimateJumps: "Tunjuk Lompatan",
    btnCheckAnswer: "Semak Jawapan",
    btnNextQuestion: "Soalan Seterusnya",
    pvTag: "Penerokaan Lanjutan • SP 2.2.2 (Dalam Lingkungan 100)",
    pvTitle: "Tambah Nombor Lebih Besar Menggunakan Blok Puluh & Sa",
    pvDesc: "Garis nombor 0–20 membantu kita memahami asas lompatan ke kanan. Untuk nombor yang lebih besar sehingga 100 (contohnya 23 + 14), kita menggabungkan Puluh dan Sa menggunakan blok asas sepuluh!",
    pvSelectLabel: "Pilih Contoh Nombor Besar:",
    btnToChallenge: "Ke Taman Cabaran",
    sec4Badge: "Hentian 4 • Penilaian Interaktif (SP 2.2.2)",
    quizMainTitle: "Garden Challenge – Cabaran Penjaga Taman",
    quizSubtitle: "Jawab kesemua 5 soalan tambah dalam lingkungan 100 untuk membantu Penjaga Taman dan dapatkan sijil pencapaian anda!",
    quizEnterNameTitle: "Masukkan Nama Penjelajah Taman",
    quizEnterNameDesc: "Nama anda akan dipaparkan pada rekod skor dan Sijil Pencapaian Taman Tambah Ceria.",
    btnStartQuiz: "Mula Cabaran",
    errEnterName: "Sila masukkan nama anda sebelum memulakan cabaran.",
    quizProgressLabel: "Soalan",
    quizScoreLabel: "Skor Semasa:",
    btnNextQuizQ: "Soalan Seterusnya",
    resultScorePrefix: "Skor Anda:",
    certHeading: "SIJIL PENCAPAIAN",
    certSub: "Dengan ini disahkan bahawa",
    certBody: "telah berjaya menamatkan cabaran pembelajaran interaktif di",
    certScoreLabel: "Skor:",
    certDateLabel: "Tarikh:",
    btnPrintCert: "Cetak / Simpan Sijil (PDF)",
    btnTryAgain: "Cuba Lagi",
    btnGiveFeedback: "Beri Maklum Balas",
    fbBadge: "Maklum Balas Murid",
    fbTitle: "Suara Penjelajah Taman",
    fbIntro: "Ceritakan pengalaman kamu meneroka Taman Tambah Ceria! (Tiada e-mel atau maklumat peribadi dipaparkan secara umum).",
    fbNameLabel: "Nama Panggilan (Pilihan):",
    fbQ1Label: "1. Adakah laman web ini mudah digunakan?",
    optVeryEasy: "Sangat Mudah",
    optEasy: "Mudah",
    optNeedHelp: "Perlukan Bantuan",
    fbQ2Label: "2. Aktiviti manakah yang paling kamu sukai?",
    actOpt1: "1. Taman Video (Jom Belajar Tambah)",
    actOpt2: "2. Taman Konsep & Papan Tambah",
    actOpt3: "3. Taman Garis Nombor Interaktif",
    actOpt4: "4. Cabaran Penjaga Taman (Kuiz)",
    fbQ3Label: "3. Adakah garis nombor membantu kamu memahami konsep tambah?",
    optYesLot: "Ya, sangat membantu!",
    optYes: "Ya, membantu",
    optLittle: "Sedikit",
    fbQ4Label: "4. Apakah yang ingin kamu tambah baik atau komen ringkas?",
    btnSubmitFeedback: "Hantar Maklum Balas",
    fbWallTitle: "Dinding Suara Penjelajah Taman",
    tdBadge: "Ruang Guru • Pemantauan & Rekod",
    tdTitle: "Papan Pemuka Guru (Teacher Dashboard)",
    tdLoginTitle: "Log Masuk Guru",
    tdLoginHint: "Gunakan akaun guru Supabase yang didaftarkan (atau kata laluan demo tempatan: guru1234 apabila dalam Mod Demonstrasi).",
    btnTeacherLogin: "Log Masuk"
  },
  en: {
    siteTitle: "Addition Garden Adventure",
    siteSub: "Year 1 Mathematics • LS 2.2.2",
    navHome: "Garden Map",
    navVideo: "1. Video Garden",
    navConcept: "2. Learning Garden",
    navNumline: "3. Number Line Garden",
    navChallenge: "4. Challenge Garden",
    navFeedback: "Pupil Voice",
    navTeacher: "Teacher",
    musicOff: "Music: Off",
    musicOn: "Music: On",
    progressLabel: "Garden Trail Progress:",
    curriculumPill: "Malaysian KSSR Year 1 Mathematics • CS 2.2 • LS 2.2.2 (Addition within 100)",
    heroTitle: "Explore the Addition Garden!",
    heroSubtitle: "Learn Mathematics while exploring a fun botanical garden.",
    heroDesc: "Welcome young explorer! Follow the stepping stones across this botanical garden to watch videos, count flowers, hop along the number line, and complete the gardener's challenge.",
    btnStartAdventure: "Start Adventure",
    btnInfoPedagogy: "Learning Info & Lesson Plan",
    mapTitle: "Botanical Garden Pathway Map",
    mapSub: "Click any garden stop below or follow steps 1 to 4.",
    dest1Title: "Video Garden",
    dest1Desc: "Watch an engaging introduction video on addition.",
    dest2Title: "Learning Garden",
    dest2Desc: "Understand combining two flower groups & interactive addition board.",
    dest3Title: "Number Line Garden",
    dest3Desc: "Drag the marker along the number line & explore tens and ones blocks.",
    dest4Title: "Challenge Garden",
    dest4Desc: "Answer 5 Garden Challenge questions and print your certificate!",
    statusPending: "Not Completed",
    statusDone: "Completed ✓",
    cardFeedbackTitle: "Garden Explorer Voice",
    cardFeedbackDesc: "Share your thoughts after exploring the garden.",
    cardRphTitle: "Daily Lesson Plan (RPH)",
    cardRphDesc: "Documentation space for Year 1 Mathematics teaching.",
    cardAboutTitle: "About Project & Developer",
    cardAboutDesc: "Curriculum info, digital ethics, and developer profile.",
    sec1Badge: "Stop 1 • Set Induction",
    videoTitle: "Let's Learn Addition!",
    videoInstruction: "Watch the video below carefully to learn the basics of addition. Once finished, click the Continue Learning button below.",
    videoNotice: "Make sure you have watched and understood the video before continuing to the Learning Garden.",
    btnBackMap: "Back to Map",
    btnContinueLearning: "Continue Learning",
    sec2Badge: "Stop 2 • Basic Addition Concept",
    conceptTitle: "What Does Addition Mean?",
    conceptExplain: "Addition means combining two groups of objects to find the total altogether.",
    group1Label: "First Group: 3 flowers",
    group2Label: "Second Group: 2 flowers",
    groupTotalLabel: "Combined Total: 5 flowers",
    plusMeaning: "Plus / Add",
    equalsMeaning: "Equals",
    mathSentenceLabel: "Mathematical Sentence:",
    symPlusTitle: "Plus Symbol (+)",
    symPlusDesc: "Used when we combine or add two numbers together.",
    symEqualsTitle: "Equals Symbol (=)",
    symEqualsDesc: "Shows the total amount after both groups are combined.",
    boardTitle: "Interactive Addition Board (0 to 20)",
    boardGuide: "Follow the click order: 1. Click First Number ➔ 2. Click (+) ➔ 3. Click Second Number ➔ 4. Click (=).",
    boardStep1Prompt: "Step 1: Click the first number on the number board below.",
    boardStep2Prompt: "Step 2: Great! Now click the red plus (+) symbol to add.",
    boardStep3Prompt: "Step 3: Awesome! Now click the second number on the board.",
    boardStep4Prompt: "Step 4: Click the yellow equals (=) symbol to see the total!",
    btnReset: "Reset",
    btnPrevSection: "Previous",
    btnToNumline: "To Number Line Garden",
    sec3Badge: "Stop 3 • Number Line & Place Value",
    nlTitle: "Interactive Number Line Garden (0 – 20)",
    nlIntro: "Touch and drag the ladybug marker (🐞) to the right along the number line to add.",
    nlQuestionCounter: "Question",
    nlStartLabel: "Start:",
    nlJumpsLabel: "Jumps:",
    nlCurrentLabel: "Position:",
    nlTouchHint: "👆 Touch & drag the 🐞 marker to the right along the number line",
    btnPrevStep: "Previous Step",
    btnNextStep: "Next Step",
    btnAnimateJumps: "Animate Jumps",
    btnCheckAnswer: "Check Answer",
    btnNextQuestion: "Next Question",
    pvTag: "Extended Exploration • LS 2.2.2 (Within 100)",
    pvTitle: "Adding Larger Numbers Using Tens & Ones Blocks",
    pvDesc: "The 0–20 number line builds foundational understanding of moving forward. For larger numbers within 100 (such as 23 + 14), we combine Tens and Ones using base-ten blocks!",
    pvSelectLabel: "Choose a Larger Number Example:",
    btnToChallenge: "To Challenge Garden",
    sec4Badge: "Stop 4 • Gamified E-Assessment (LS 2.2.2)",
    quizMainTitle: "Garden Challenge – Cabaran Penjaga Taman",
    quizSubtitle: "Answer all 5 addition questions within 100 to help the Gardener and earn your achievement certificate!",
    quizEnterNameTitle: "Enter Garden Explorer Name",
    quizEnterNameDesc: "Your name will appear on the score record and your Addition Garden Certificate.",
    btnStartQuiz: "Start Challenge",
    errEnterName: "Please enter your name before starting the challenge.",
    quizProgressLabel: "Question",
    quizScoreLabel: "Current Score:",
    btnNextQuizQ: "Next Question",
    resultScorePrefix: "Your Score:",
    certHeading: "CERTIFICATE OF ACHIEVEMENT",
    certSub: "This is to certify that",
    certBody: "has successfully completed the interactive learning challenge at",
    certScoreLabel: "Score:",
    certDateLabel: "Date:",
    btnPrintCert: "Print / Save Certificate (PDF)",
    btnTryAgain: "Try Again",
    btnGiveFeedback: "Give Feedback",
    fbBadge: "Pupil Feedback",
    fbTitle: "Garden Explorer Voice",
    fbIntro: "Tell us about your experience exploring Addition Garden Adventure! (No email or personal details are displayed publicly).",
    fbNameLabel: "Nickname (Optional):",
    fbQ1Label: "1. Was the website easy to use?",
    optVeryEasy: "Very Easy",
    optEasy: "Easy",
    optNeedHelp: "Needed Help",
    fbQ2Label: "2. Which activity did you enjoy the most?",
    actOpt1: "1. Video Garden (Let's Learn Addition)",
    actOpt2: "2. Learning Garden & Addition Board",
    actOpt3: "3. Interactive Number Line Garden",
    actOpt4: "4. Garden Challenge (Quiz)",
    fbQ3Label: "3. Did the number line help you understand addition?",
    optYesLot: "Yes, a lot!",
    optYes: "Yes, it helped",
    optLittle: "A little",
    fbQ4Label: "4. What would you like to improve or short comment?",
    btnSubmitFeedback: "Submit Feedback",
    fbWallTitle: "Garden Explorer Feedback Wall",
    tdBadge: "Teacher Space • Monitoring & Records",
    tdTitle: "Teacher Dashboard",
    tdLoginTitle: "Teacher Login",
    tdLoginHint: "Use your registered Supabase teacher account (or local demo password: guru1234 when in Local Demonstration Mode).",
    btnTeacherLogin: "Log In"
  }
};

function toggleLanguage() {
  playSound("click");
  currentLang = currentLang === "ms" ? "en" : "ms";
  applyTranslations();
  updateMusicButtonUI();
  updateBoardPromptText();
  renderNumberLineExercise();
  renderPlaceValueExample();
  if (!document.getElementById("quizQuestionPanel").classList.contains("hidden")) {
    renderQuizQuestion();
  }
}

function applyTranslations() {
  const dict = i18n[currentLang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
  updateProgressUI();
}

// ==========================================================================
// 3. WEB AUDIO API: RELAXING GARDEN MUSIC & PLEASANT SOUND EFFECTS
// ==========================================================================
let audioCtx = null;
let isMusicPlaying = false;
let musicInterval = null;

function ensureAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playTone(freq, duration = 0.16, type = "sine", volume = 0.14, delay = 0) {
  ensureAudioContext();
  if (!audioCtx) return;

  const now = audioCtx.currentTime + delay;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

function playSound(kind) {
  switch (kind) {
    case "click":
      playTone(523.25, 0.09, "sine", 0.1); // C5 soft pop
      break;
    case "plus":
      // Special sparkling two-note chime when clicking (+)
      playTone(587.33, 0.14, "triangle", 0.16, 0); // D5
      playTone(880.0, 0.22, "sine", 0.18, 0.09);    // A5
      break;
    case "correct":
      playTone(523.25, 0.14, "triangle", 0.16, 0);    // C5
      playTone(659.25, 0.14, "triangle", 0.16, 0.11); // E5
      playTone(783.99, 0.28, "triangle", 0.18, 0.22); // G5
      break;
    case "wrong":
      playTone(311.13, 0.18, "sine", 0.14, 0);    // Eb4 gentle low tone
      playTone(261.63, 0.26, "sine", 0.14, 0.15); // C4
      break;
    case "achievement":
      playTone(523.25, 0.14, "triangle", 0.17, 0);
      playTone(659.25, 0.14, "triangle", 0.17, 0.12);
      playTone(783.99, 0.14, "triangle", 0.17, 0.24);
      playTone(1046.5, 0.42, "triangle", 0.2, 0.36);
      break;
  }
}

function toggleMusic() {
  ensureAudioContext();
  isMusicPlaying = !isMusicPlaying;

  if (isMusicPlaying) {
    // Gentle pentatonic garden melody loop (C major pentatonic)
    const melody = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 293.66, 392.0];
    let step = 0;
    playTone(melody[0], 0.9, "sine", 0.045);
    musicInterval = setInterval(() => {
      if (!isMusicPlaying) return;
      step = (step + 1) % melody.length;
      playTone(melody[step], 0.95, "sine", 0.045);
    }, 1100);
  } else {
    clearInterval(musicInterval);
    musicInterval = null;
  }
  updateMusicButtonUI();
}

function updateMusicButtonUI() {
  const icon = document.getElementById("musicIcon");
  const label = document.getElementById("musicLabel");
  const dict = i18n[currentLang];
  if (isMusicPlaying) {
    icon.textContent = "🔊";
    label.textContent = dict.musicOn;
  } else {
    icon.textContent = "🔇";
    label.textContent = dict.musicOff;
  }
}

// ==========================================================================
// 4. NAVIGATION & GARDEN PATHWAY PROGRESS
// ==========================================================================
const gardenProgress = {
  video: false,
  concept: false,
  numline: false,
  challenge: false
};

function navigateTo(sectionId) {
  playSound("click");
  document.querySelectorAll(".page-section").forEach((sec) => {
    sec.classList.remove("active");
  });
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add("active");
  }

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-target") === sectionId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startAdventure() {
  playSound("click");
  navigateTo("sec-video");
}

function markGardenStepComplete(stepKey) {
  if (!gardenProgress[stepKey]) {
    gardenProgress[stepKey] = true;
    playSound("achievement");
  }
  updateProgressUI();
}

function updateProgressUI() {
  const keys = ["video", "concept", "numline", "challenge"];
  const completedCount = keys.filter((k) => gardenProgress[k]).length;
  const pct = Math.round((completedCount / keys.length) * 100);

  document.getElementById("globalProgressBar").style.width = `${pct}%`;
  document.getElementById("globalProgressPercent").textContent = `${pct}%`;

  const dict = i18n[currentLang];
  keys.forEach((key, idx) => {
    const num = idx + 1;
    const node = document.getElementById(`node-${num}`);
    const statusBadge = document.getElementById(`status-${num}`);
    const tag = document.getElementById(`tag-${num}`);
    if (gardenProgress[key]) {
      node.classList.add("completed");
      statusBadge.textContent = "✓";
      tag.textContent = dict.statusDone;
    } else {
      node.classList.remove("completed");
      statusBadge.textContent = String(num);
      tag.textContent = dict.statusPending;
    }
  });
}

function completeVideoAndContinue() {
  markGardenStepComplete("video");
  navigateTo("sec-concept");
}

function completeConceptAndContinue() {
  markGardenStepComplete("concept");
  navigateTo("sec-numline");
}

function completeNumlineAndContinue() {
  markGardenStepComplete("numline");
  navigateTo("sec-challenge");
}

// ==========================================================================
// 5. SECTION 2: INTERACTIVE ADDITION BOARD (0 TO 20)
// ==========================================================================
let boardState = {
  step: 1, // 1: pick num1, 2: click +, 3: pick num2, 4: click =, 5: done
  num1: null,
  num2: null
};

function initAdditionBoard() {
  const pad = document.getElementById("boardNumberPad");
  pad.innerHTML = "";
  for (let i = 0; i <= 20; i++) {
    const btn = document.createElement("button");
    btn.className = "pad-num-btn";
    btn.textContent = i;
    btn.onclick = () => handleBoardNumberClick(i);
    pad.appendChild(btn);
  }
  resetAdditionBoard(true);
}

function handleBoardNumberClick(num) {
  if (boardState.step === 1 || boardState.step === 5) {
    playSound("click");
    boardState.num1 = num;
    boardState.num2 = null;
    boardState.step = 2;
    document.getElementById("slotNum1").textContent = num;
    document.getElementById("slotNum2").textContent = "?";
    document.getElementById("slotResult").textContent = "?";
    highlightBoardSlot("slotNum1");
    renderBoardFlowers(num, 0, false);
    updateBoardPromptText();
  } else if (boardState.step === 3) {
    playSound("click");
    boardState.num2 = num;
    boardState.step = 4;
    document.getElementById("slotNum2").textContent = num;
    highlightBoardSlot("slotNum2");
    renderBoardFlowers(boardState.num1, num, false);
    updateBoardPromptText();
  } else if (boardState.step === 2) {
    playSound("wrong");
    updateBoardPromptText();
  }
}

function handleBoardPlus() {
  if (boardState.step === 2) {
    playSound("plus"); // Special sound effect for plus (+) symbol
    boardState.step = 3;
    highlightBoardSlot("slotNum2");
    updateBoardPromptText();
  } else {
    playSound("click");
  }
}

function handleBoardEquals() {
  if (boardState.step === 4 && boardState.num1 !== null && boardState.num2 !== null) {
    const sum = boardState.num1 + boardState.num2;
    playSound("correct");
    boardState.step = 5;
    document.getElementById("slotResult").textContent = sum;
    highlightBoardSlot("slotResult");
    renderBoardFlowers(boardState.num1, boardState.num2, true);
    const msg =
      currentLang === "ms"
        ? `Tahniah! ${boardState.num1} + ${boardState.num2} = ${sum}. Tekan Set Semula atau pilih nombor baru!`
        : `Well done! ${boardState.num1} + ${boardState.num2} = ${sum}. Click Reset or pick a new number!`;
    document.getElementById("boardFeedbackMsg").textContent = msg;
  } else {
    playSound("wrong");
  }
}

function highlightBoardSlot(slotId) {
  ["slotNum1", "slotNum2", "slotResult"].forEach((id) => {
    document.getElementById(id).classList.toggle("active-slot", id === slotId);
  });
}

function renderBoardFlowers(n1, n2, combined) {
  const area = document.getElementById("boardVisualFlowers");
  const f1 = "🌺".repeat(n1);
  const f2 = "🌻".repeat(n2);
  if (!n1 && n1 !== 0) {
    area.innerHTML = "";
    return;
  }
  if (n2 === 0 && boardState.step < 4) {
    area.innerHTML = `<span>${f1 || "0"}</span>`;
  } else if (!combined) {
    area.innerHTML = `<span>${f1}</span> <strong class="hl-red">+</strong> <span>${f2}</span>`;
  } else {
    area.innerHTML = `<span>${f1}${f2}</span> <strong class="hl-yellow">=</strong> <strong>${n1 + n2}</strong>`;
  }
}

function updateBoardPromptText() {
  const dict = i18n[currentLang];
  const el = document.getElementById("boardFeedbackMsg");
  if (boardState.step === 1) el.textContent = dict.boardStep1Prompt;
  else if (boardState.step === 2) el.textContent = dict.boardStep2Prompt;
  else if (boardState.step === 3) el.textContent = dict.boardStep3Prompt;
  else if (boardState.step === 4) el.textContent = dict.boardStep4Prompt;
}

function resetAdditionBoard(silent = false) {
  if (!silent) playSound("click");
  boardState = { step: 1, num1: null, num2: null };
  document.getElementById("slotNum1").textContent = "?";
  document.getElementById("slotNum2").textContent = "?";
  document.getElementById("slotResult").textContent = "?";
  document.getElementById("boardVisualFlowers").innerHTML = "";
  highlightBoardSlot("slotNum1");
  updateBoardPromptText();
}

// ==========================================================================
// 6. SECTION 3: INTERACTIVE TOUCH-DRAGGABLE NUMBER LINE (0–20) + PLACE VALUE
// ==========================================================================
const nlExercises = [
  { start: 4, add: 3 },
  { start: 2, add: 5 },
  { start: 6, add: 4 },
  { start: 5, add: 6 },
  { start: 8, add: 5 },
  { start: 7, add: 7 },
  { start: 9, add: 6 },
  { start: 10, add: 8 },
  { start: 11, add: 6 },
  { start: 12, add: 8 }
];

let nlCurrentIdx = 0;
let nlMarkerPos = 4;
let isDraggingMarker = false;

function initNumberLine() {
  const ticksContainer = document.getElementById("nlTicksContainer");
  ticksContainer.innerHTML = "";

  for (let i = 0; i <= 20; i++) {
    const tick = document.createElement("div");
    tick.className = "nl-tick";
    tick.dataset.val = i;
    tick.style.left = `${(i / 20) * 100}%`;
    tick.innerHTML = `<div class="nl-tick-mark"></div><div class="nl-tick-num">${i}</div>`;
    tick.onclick = () => {
      playSound("click");
      setMarkerPosition(i);
    };
    ticksContainer.appendChild(tick);
  }

  setupNumberLineDragEvents();
  renderNumberLineExercise();
  renderPlaceValueExample();
}

function setupNumberLineDragEvents() {
  const track = document.getElementById("numberLineTrack");
  const marker = document.getElementById("nlDraggableMarker");

  const updatePosFromClientX = (clientX) => {
    const rect = track.getBoundingClientRect();
    let ratio = (clientX - rect.left) / rect.width;
    ratio = Math.max(0, Math.min(1, ratio));
    const snapped = Math.round(ratio * 20);
    if (snapped !== nlMarkerPos) {
      playSound("click");
      setMarkerPosition(snapped);
    }
  };

  // Pointer Events work seamlessly across Android touchscreens, tablets, and mouse
  marker.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    isDraggingMarker = true;
    marker.classList.add("dragging");
    marker.setPointerCapture(e.pointerId);
  });

  marker.addEventListener("pointermove", (e) => {
    if (!isDraggingMarker) return;
    updatePosFromClientX(e.clientX);
  });

  const stopDrag = (e) => {
    if (!isDraggingMarker) return;
    isDraggingMarker = false;
    marker.classList.remove("dragging");
    if (marker.hasPointerCapture && marker.hasPointerCapture(e.pointerId)) {
      marker.releasePointerCapture(e.pointerId);
    }
  };

  marker.addEventListener("pointerup", stopDrag);
  marker.addEventListener("pointercancel", stopDrag);

  // Also allow tapping/dragging directly anywhere on the track
  track.addEventListener("pointerdown", (e) => {
    if (e.target === marker || marker.contains(e.target)) return;
    updatePosFromClientX(e.clientX);
  });
}

function renderNumberLineExercise() {
  const ex = nlExercises[nlCurrentIdx];
  nlMarkerPos = ex.start;

  document.getElementById("nlQIndex").textContent = nlCurrentIdx + 1;
  document.getElementById("nlCurrentQuestionText").textContent = `${ex.start} + ${ex.add} = ?`;
  document.getElementById("nlStartVal").textContent = ex.start;
  document.getElementById("nlTargetJumps").textContent = ex.add;

  // Highlight start tick
  document.querySelectorAll(".nl-tick").forEach((t) => {
    t.classList.toggle("is-start", Number(t.dataset.val) === ex.start);
  });

  const fb = document.getElementById("nlFeedbackBanner");
  fb.classList.add("hidden");

  setMarkerPosition(ex.start);
}

function setMarkerPosition(val) {
  nlMarkerPos = Math.max(0, Math.min(20, val));
  const ex = nlExercises[nlCurrentIdx];
  const marker = document.getElementById("nlDraggableMarker");
  const pct = (nlMarkerPos / 20) * 100;

  marker.style.left = `${pct}%`;
  document.getElementById("markerBubbleVal").textContent = nlMarkerPos;
  document.getElementById("nlCurrentVal").textContent = nlMarkerPos;

  const jumps = nlMarkerPos - ex.start;
  document.getElementById("nlJumpVal").textContent = jumps >= 0 ? `+${jumps}` : `${jumps}`;

  const instrEl = document.getElementById("nlStepInstruction");
  if (currentLang === "ms") {
    instrEl.textContent = `1. Mula di nombor ${ex.start}. 2. Seret penanda ${ex.add} langkah ke kanan. 3. Berhenti di nombor jawapan dan tekan Semak Jawapan.`;
  } else {
    instrEl.textContent = `1. Start at number ${ex.start}. 2. Move the marker ${ex.add} steps to the right. 3. Stop at the answer and click Check Answer.`;
  }

  drawJumpArcs(ex.start, nlMarkerPos);
}

function drawJumpArcs(start, current) {
  const svg = document.getElementById("nlArcsSvg");
  svg.innerHTML = "";
  if (current <= start) return;

  for (let step = start; step < current; step++) {
    const x1 = (step / 20) * 1000;
    const x2 = ((step + 1) / 20) * 1000;
    const midX = (x1 + x2) / 2;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${x1} 80 Q ${midX} 20 ${x2} 80`);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#d32f2f");
    path.setAttribute("stroke-width", "4");
    path.setAttribute("stroke-dasharray", "6,3");
    svg.appendChild(path);
  }
}

function nlStepForward() {
  if (nlMarkerPos < 20) {
    playSound("click");
    setMarkerPosition(nlMarkerPos + 1);
  }
}

function nlStepBackward() {
  if (nlMarkerPos > 0) {
    playSound("click");
    setMarkerPosition(nlMarkerPos - 1);
  }
}

function nlResetCurrent() {
  playSound("click");
  renderNumberLineExercise();
}

function nlAnimateSolution() {
  const ex = nlExercises[nlCurrentIdx];
  setMarkerPosition(ex.start);
  let stepCount = 0;
  const timer = setInterval(() => {
    stepCount++;
    playSound("click");
    setMarkerPosition(ex.start + stepCount);
    if (stepCount >= ex.add) {
      clearInterval(timer);
    }
  }, 340);
}

function nlCheckAnswer() {
  const ex = nlExercises[nlCurrentIdx];
  const expected = ex.start + ex.add;
  const fb = document.getElementById("nlFeedbackBanner");
  fb.classList.remove("hidden", "success", "error");

  if (nlMarkerPos === expected) {
    playSound("correct");
    fb.classList.add("success");
    fb.textContent =
      currentLang === "ms"
        ? `🎉 Betul! ${ex.start} + ${ex.add} = ${expected}. Kamu melompat ${ex.add} langkah ke kanan!`
        : `🎉 Correct! ${ex.start} + ${ex.add} = ${expected}. You moved ${ex.add} steps to the right!`;
    if (nlCurrentIdx >= 2) {
      markGardenStepComplete("numline");
    }
  } else {
    playSound("wrong");
    fb.classList.add("error");
    fb.textContent =
      currentLang === "ms"
        ? `🤔 Cuba Lagi! Kamu berhenti di nombor ${nlMarkerPos}. Mula di ${ex.start} dan gerak ${ex.add} langkah ke kanan.`
        : `🤔 Try Again! You stopped at ${nlMarkerPos}. Start at ${ex.start} and move ${ex.add} steps to the right.`;
  }
}

function nlNextQuestion() {
  playSound("click");
  nlCurrentIdx = (nlCurrentIdx + 1) % nlExercises.length;
  renderNumberLineExercise();
}

// Place Value Blocks Visualizer (Within 100 - SP 2.2.2)
function renderPlaceValueExample() {
  const select = document.getElementById("pvPresetSelect");
  if (!select) return;
  const [a, b] = select.value.split(",").map(Number);
  const sum = a + b;

  const makeBlocksHTML = (num) => {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    let html = "";
    for (let t = 0; t < tens; t++) html += `<div class="ten-rod" title="10 (Puluh)"></div>`;
    for (let o = 0; o < ones; o++) html += `<div class="one-cube" title="1 (Sa)"></div>`;
    return html || "<span>0</span>";
  };

  const lbl1 = currentLang === "ms" ? `Nombor Pertama: ${a}` : `First Number: ${a}`;
  const lbl2 = currentLang === "ms" ? `Nombor Kedua: ${b}` : `Second Number: ${b}`;
  const lblTotal = currentLang === "ms" ? `Jumlah: ${sum}` : `Total: ${sum}`;
  const breakdown =
    currentLang === "ms"
      ? `${Math.floor(sum / 10)} Puluh + ${sum % 10} Sa`
      : `${Math.floor(sum / 10)} Tens + ${sum % 10} Ones`;

  document.getElementById("pvVisualStage").innerHTML = `
    <div class="pv-group-box">
      <h4>${lbl1} (${Math.floor(a / 10)}P ${a % 10}S)</h4>
      <div class="pv-blocks-row">${makeBlocksHTML(a)}</div>
    </div>
    <div class="pv-group-box">
      <h4>${lbl2} (${Math.floor(b / 10)}P ${b % 10}S)</h4>
      <div class="pv-blocks-row">${makeBlocksHTML(b)}</div>
    </div>
    <div class="pv-group-box" style="border-color:#2e7d32; background:#e8f5e9;">
      <h4>${lblTotal} (${breakdown})</h4>
      <div class="pv-blocks-row">${makeBlocksHTML(sum)}</div>
    </div>
  `;
}

// ==========================================================================
// 7. SECTION 4: GAMIFIED E-ASSESSMENT (EXACTLY 5 QUESTIONS)
// ==========================================================================
const quizQuestions = [
  {
    id: 1,
    visual: "🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 (12)  +  🌹🌹🌹🌹🌹 (5)",
    q_ms: "Terdapat 12 kuntum bunga merah. 5 kuntum bunga lagi kembang. Berapakah jumlah bunga kesemuanya?",
    q_en: "There are 12 red flowers. 5 more flowers bloom. How many flowers are there altogether?",
    equation: "12 + 5",
    options: [15, 17, 18, 27],
    answer: 17
  },
  {
    id: 2,
    visual: "🦋🌺 (23)  +  🦋🌻 (14)",
    q_ms: "Sebuah taman rama-rama mempunyai 23 kuntum bunga. Sebanyak 14 kuntum bunga lagi kembang. Berapakah jumlah bunga kesemuanya?",
    q_en: "A butterfly garden has 23 flowers. Another 14 flowers bloom. How many flowers are there altogether?",
    equation: "23 + 14",
    options: [35, 36, 37, 47],
    answer: 37
  },
  {
    id: 3,
    visual: "🌱 Pagi / Morning (30)  +  🌱 Petang / Afternoon (20)",
    q_ms: "Seorang pekebun mengumpul 30 biji benih pada waktu pagi dan 20 biji benih pada waktu petang. Berapakah jumlah biji benih yang dikumpul?",
    q_en: "A gardener collects 30 seeds in the morning and 20 seeds in the afternoon. How many seeds does the gardener collect?",
    equation: "30 + 20",
    options: [40, 50, 60, 32],
    answer: 50
  },
  {
    id: 4,
    visual: "🐟 Kolam A / Pond A (41)  +  🐟 Kolam B / Pond B (8)",
    q_ms: "Terdapat 41 ekor ikan di dalam satu kolam dan 8 ekor ikan di dalam kolam yang lain. Berapakah jumlah ikan kesemuanya?",
    q_en: "There are 41 fish in one pond and 8 fish in another pond. How many fish are there altogether?",
    equation: "41 + 8",
    options: [48, 49, 51, 59],
    answer: 49
  },
  {
    id: 5,
    visual: "🍎 Pokok 1 / Tree 1 (26)  +  🍎 Pokok 2 / Tree 2 (13)",
    q_ms: "Sebatang pokok mempunyai 26 biji buah dan sebatang pokok lagi mempunyai 13 biji buah. Berapakah jumlah buah kesemuanya?",
    q_en: "One tree has 26 fruits and another tree has 13 fruits. How many fruits are there altogether?",
    equation: "26 + 13",
    options: [38, 39, 49, 29],
    answer: 39
  }
];

let quizSession = {
  pupilName: "",
  currentIndex: 0,
  score: 0,
  answeredCurrent: false,
  answersLog: []
};

function startQuiz() {
  const nameInput = document.getElementById("pupilNameInput").value.trim();
  const errEl = document.getElementById("quizNameError");

  if (!nameInput) {
    playSound("wrong");
    errEl.classList.remove("hidden");
    return;
  }

  playSound("click");
  errEl.classList.add("hidden");

  quizSession = {
    pupilName: nameInput,
    currentIndex: 0,
    score: 0,
    answeredCurrent: false,
    answersLog: []
  };

  document.getElementById("displayPupilName").textContent = nameInput;
  document.getElementById("quizStartPanel").classList.add("hidden");
  document.getElementById("quizResultPanel").classList.add("hidden");
  document.getElementById("quizQuestionPanel").classList.remove("hidden");

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const qObj = quizQuestions[quizSession.currentIndex];
  quizSession.answeredCurrent = false;

  document.getElementById("quizCurrentNum").textContent = quizSession.currentIndex + 1;
  document.getElementById("quizLiveScore").textContent = quizSession.score;
  document.getElementById("quizContextVisual").textContent = qObj.visual;
  document.getElementById("quizQuestionText").textContent =
    currentLang === "ms" ? qObj.q_ms : qObj.q_en;

  const fb = document.getElementById("quizImmediateFeedback");
  fb.classList.add("hidden");
  document.getElementById("quizNextBtn").classList.add("hidden");

  const grid = document.getElementById("quizOptionsGrid");
  grid.innerHTML = "";

  qObj.options.forEach((optVal) => {
    const btn = document.createElement("button");
    btn.className = "quiz-opt-btn";
    btn.textContent = optVal;
    btn.onclick = () => submitQuizOption(optVal, btn);
    grid.appendChild(btn);
  });
}

function submitQuizOption(selectedVal, clickedBtn) {
  if (quizSession.answeredCurrent) return;
  quizSession.answeredCurrent = true;

  const qObj = quizQuestions[quizSession.currentIndex];
  const isCorrect = selectedVal === qObj.answer;

  if (isCorrect) {
    quizSession.score++;
    playSound("correct");
  } else {
    playSound("wrong");
  }

  document.getElementById("quizLiveScore").textContent = quizSession.score;

  // Highlight buttons
  document.querySelectorAll(".quiz-opt-btn").forEach((b) => {
    b.disabled = true;
    const val = Number(b.textContent);
    if (val === qObj.answer) b.classList.add("opt-correct");
    else if (b === clickedBtn && !isCorrect) b.classList.add("opt-wrong");
  });

  // Record individual answer
  quizSession.answersLog.push({
    questionNumber: qObj.id,
    equation: qObj.equation,
    selectedAnswer: selectedVal,
    correctAnswer: qObj.answer,
    isCorrect: isCorrect
  });

  const fb = document.getElementById("quizImmediateFeedback");
  fb.classList.remove("hidden", "success", "error");
  if (isCorrect) {
    fb.classList.add("success");
    fb.textContent =
      currentLang === "ms"
        ? `✅ Syabas! ${qObj.equation} = ${qObj.answer}. Jawapan tepat!`
        : `✅ Well done! ${qObj.equation} = ${qObj.answer}. Correct answer!`;
  } else {
    fb.classList.add("error");
    fb.textContent =
      currentLang === "ms"
        ? `❌ Kurang tepat. Jawapan yang betul ialah ${qObj.equation} = ${qObj.answer}.`
        : `❌ Not quite. The correct answer is ${qObj.equation} = ${qObj.answer}.`;
  }

  document.getElementById("quizNextBtn").classList.remove("hidden");
}

function nextQuizQuestion() {
  playSound("click");
  if (quizSession.currentIndex < quizQuestions.length - 1) {
    quizSession.currentIndex++;
    renderQuizQuestion();
  } else {
    finishQuiz();
  }
}

function getAchievementTitle(score) {
  if (score === 5) return "Excellent Garden Explorer!";
  if (score === 4) return "Great Job!";
  if (score === 3) return "Good Effort!";
  return "Keep Practising!";
}

async function finishQuiz() {
  playSound("achievement");
  markGardenStepComplete("challenge");

  document.getElementById("quizQuestionPanel").classList.add("hidden");
  document.getElementById("quizResultPanel").classList.remove("hidden");

  const score = quizSession.score;
  const title = getAchievementTitle(score);

  document.getElementById("finalScoreDisplay").textContent = `${score} / 5`;
  document.getElementById("resultAchievementTitle").textContent = title;

  const trophyEl = document.getElementById("resultTrophyIcon");
  trophyEl.textContent = score >= 4 ? "🏆" : score === 3 ? "🌟" : "🌱";

  const encEl = document.getElementById("resultEncouragement");
  if (score >= 4) {
    encEl.textContent =
      currentLang === "ms"
        ? "Tahniah! Kamu berjaya membantu Penjaga Taman dan layak menerima Sijil Pencapaian!"
        : "Congratulations! You helped the Gardener and earned a Certificate of Achievement!";
  } else {
    encEl.textContent =
      currentLang === "ms"
        ? "Usaha yang baik! Teruskan berlatih di Taman Garis Nombor dan cuba lagi untuk dapatkan sijil."
        : "Good effort! Keep practising in the Number Line Garden and try again to earn your certificate.";
  }

  // Review list
  const reviewList = document.getElementById("quizReviewList");
  reviewList.innerHTML = quizSession.answersLog
    .map((item) => {
      const cls = item.isCorrect ? "rev-ok" : "rev-bad";
      const icon = item.isCorrect ? "✅" : "❌";
      return `<div class="review-item ${cls}">
        ${icon} Soalan ${item.questionNumber} (${item.equation}): Jawapan kamu = <strong>${item.selectedAnswer}</strong> | Jawapan Betul = <strong>${item.correctAnswer}</strong>
      </div>`;
    })
    .join("");

  // Certificate visibility (score >= 4/5)
  const certWrap = document.getElementById("certificateWrapper");
  if (score >= 4) {
    const todayStr = new Date().toLocaleDateString("ms-MY");
    document.getElementById("certPupilName").textContent = quizSession.pupilName;
    document.getElementById("certAchievementBadge").textContent = title;
    document.getElementById("certScoreVal").textContent = `${score}/5`;
    document.getElementById("certDateVal").textContent = todayStr;
    certWrap.classList.remove("hidden");
  } else {
    certWrap.classList.add("hidden");
  }

  // Save record to Supabase or LocalStorage
  const recordPayload = {
    pupil_name: quizSession.pupilName,
    score: score,
    total_questions: 5,
    achievement_title: title,
    answers_json: quizSession.answersLog,
    created_at: new Date().toISOString()
  };

  await saveAssessmentRecord(recordPayload);
}

function retryQuiz() {
  playSound("click");
  document.getElementById("quizResultPanel").classList.add("hidden");
  document.getElementById("quizStartPanel").classList.remove("hidden");
}

function printCertificate() {
  playSound("click");
  window.print();
}

// ==========================================================================
// 8. DATA PERSISTENCE LAYER (SUPABASE + LOCALSTORAGE FALLBACK)
// ==========================================================================
const LOCAL_RECORDS_KEY = "ttc_assessment_records_v1";
const LOCAL_FEEDBACK_KEY = "ttc_pupil_feedback_v1";

function updateDbStatusBanner() {
  const banner = document.getElementById("dbConnectionBanner");
  const title = document.getElementById("dbModeTitle");
  const desc = document.getElementById("dbModeDesc");

  if (isSupabaseConnected) {
    banner.classList.remove("local-mode");
    banner.classList.add("cloud-mode");
    title.textContent = "Mod Awan Supabase Aktif (Cross-Device Sync Enabled)";
    desc.textContent =
      "Pangkalan data Supabase berjaya disambungkan. Semua rekod penilaian dan maklum balas murid daripada pelbagai peranti boleh diakses oleh guru.";
  }
}

async function saveAssessmentRecord(record) {
  const noteEl = document.getElementById("saveStatusNote");
  if (isSupabaseConnected) {
    const { error } = await supabaseClient.from("assessment_records").insert([record]);
    if (!error) {
      noteEl.textContent = "☁️ Rekod penilaian berjaya disimpan ke pangkalan data Supabase.";
      return;
    }
    console.error("Supabase insert error, falling back to local:", error);
  }

  // Fallback: Local browser storage
  const existing = JSON.parse(localStorage.getItem(LOCAL_RECORDS_KEY) || "[]");
  record.id = Date.now();
  existing.unshift(record);
  localStorage.setItem(LOCAL_RECORDS_KEY, JSON.stringify(existing));
  noteEl.textContent =
    "💾 Rekod disimpan pada pelayar/peranti semasa (Mod Demonstrasi Tempatan).";
}

async function fetchAssessmentRecords() {
  if (isSupabaseConnected) {
    const { data, error } = await supabaseClient
      .from("assessment_records")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return data;
  }
  return JSON.parse(localStorage.getItem(LOCAL_RECORDS_KEY) || "[]");
}

// ==========================================================================
// 9. PUPIL FEEDBACK ("SUARA PENJELAJAH TAMAN")
// ==========================================================================
async function submitPupilFeedback(e) {
  e.preventDefault();
  playSound("correct");

  const rawName = document.getElementById("fbName").value.trim();
  const easyVal = document.querySelector('input[name="fbEasy"]:checked').value;
  const favAct = document.getElementById("fbFavActivity").value;
  const nlHelp = document.querySelector('input[name="fbNumlineHelp"]:checked').value;
  const comment = document.getElementById("fbImprove").value.trim();

  const feedbackObj = {
    display_name: rawName || "Penjelajah Taman",
    ease_of_use: easyVal,
    favorite_activity: favAct,
    numberline_helpful: nlHelp,
    comment: comment,
    is_approved: true,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConnected) {
    const { error } = await supabaseClient.from("pupil_feedback").insert([feedbackObj]);
    if (error) {
      saveFeedbackLocally(feedbackObj);
    }
  } else {
    saveFeedbackLocally(feedbackObj);
  }

  const alertEl = document.getElementById("fbSubmitAlert");
  alertEl.classList.remove("hidden");
  alertEl.classList.add("success");
  alertEl.textContent =
    currentLang === "ms"
      ? "🌻 Terima kasih! Maklum balas kamu telah dihantar ke Dinding Suara Penjelajah Taman."
      : "🌻 Thank you! Your feedback has been posted to the Garden Explorer Wall.";

  document.getElementById("pupilFeedbackForm").reset();
  loadPublicFeedback();
}

function saveFeedbackLocally(obj) {
  const list = JSON.parse(localStorage.getItem(LOCAL_FEEDBACK_KEY) || "[]");
  obj.id = Date.now();
  list.unshift(obj);
  localStorage.setItem(LOCAL_FEEDBACK_KEY, JSON.stringify(list));
}

async function fetchAllFeedback(includeHidden = false) {
  let items = [];
  if (isSupabaseConnected) {
    let query = supabaseClient
      .from("pupil_feedback")
      .select("*")
      .order("created_at", { ascending: false });
    if (!includeHidden) {
      query = query.eq("is_approved", true);
    }
    const { data, error } = await query;
    if (!error && data) items = data;
  } else {
    items = JSON.parse(localStorage.getItem(LOCAL_FEEDBACK_KEY) || "[]");
    if (!includeHidden) {
      items = items.filter((i) => i.is_approved !== false);
    }
  }

  // Provide starter encouraging sample if completely empty
  if (items.length === 0 && !includeHidden) {
    items = [
      {
        display_name: "Penjelajah Cilik",
        ease_of_use: "Sangat Mudah 😄",
        favorite_activity: "Taman Garis Nombor",
        numberline_helpful: "Ya, sangat membantu! 🌟",
        comment: "Seronok gerakkan kumbang atas garis nombor!",
        created_at: new Date().toISOString()
      }
    ];
  }
  return items;
}

async function loadPublicFeedback() {
  const list = await fetchAllFeedback(false);
  const container = document.getElementById("publicFeedbackList");
  container.innerHTML = list
    .map((fb) => {
      const safeName = escapeHTML(fb.display_name || "Penjelajah Taman");
      const safeComment = escapeHTML(fb.comment || "—");
      const dateStr = new Date(fb.created_at).toLocaleDateString("ms-MY");
      return `
        <div class="fb-public-card">
          <div class="fb-card-top">
            <span>🌼 ${safeName}</span>
            <small>${dateStr}</small>
          </div>
          <div class="fb-badges">
            <span class="fb-mini-tag">${escapeHTML(fb.ease_of_use)}</span>
            <span class="fb-mini-tag">❤️ ${escapeHTML(fb.favorite_activity)}</span>
            <span class="fb-mini-tag">${escapeHTML(fb.numberline_helpful)}</span>
          </div>
          <p>${safeComment}</p>
        </div>
      `;
    })
    .join("");
}

// ==========================================================================
// 10. TEACHER DASHBOARD (AUTH, SEARCH, FILTER, DETAILS, CSV, MODERATION)
// ==========================================================================
let cachedTeacherRecords = [];

async function teacherLogin() {
  const email = document.getElementById("teacherEmail").value.trim();
  const password = document.getElementById("teacherPassword").value;
  const msgEl = document.getElementById("teacherAuthMsg");
  msgEl.classList.add("hidden");

  if (isSupabaseConnected) {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) {
      playSound("wrong");
      msgEl.textContent = "Log masuk gagal: " + error.message;
      msgEl.classList.remove("hidden");
      return;
    }
  } else {
    // Local demonstration authentication
    if (password !== "guru1234") {
      playSound("wrong");
      msgEl.textContent = "Kata laluan demo tempatan tidak sah. Gunakan: guru1234";
      msgEl.classList.remove("hidden");
      return;
    }
  }

  playSound("correct");
  document.getElementById("teacherLoginBox").classList.add("hidden");
  document.getElementById("teacherWorkspace").classList.remove("hidden");
  await refreshTeacherDashboard();
}

async function teacherLogout() {
  playSound("click");
  if (isSupabaseConnected) {
    await supabaseClient.auth.signOut();
  }
  document.getElementById("teacherWorkspace").classList.add("hidden");
  document.getElementById("teacherLoginBox").classList.remove("hidden");
}

async function refreshTeacherDashboard() {
  cachedTeacherRecords = await fetchAssessmentRecords();
  renderTeacherRecords();
  await renderTeacherModeration();
}

function renderTeacherRecords() {
  const searchTerm = document.getElementById("searchPupilInput").value.toLowerCase().trim();
  const scoreFilter = document.getElementById("filterScoreSelect").value;

  const filtered = cachedTeacherRecords.filter((rec) => {
    const matchesName = (rec.pupil_name || "").toLowerCase().includes(searchTerm);
    let matchesScore = true;
    if (scoreFilter === "high") matchesScore = rec.score >= 4;
    else if (scoreFilter === "mid") matchesScore = rec.score === 3;
    else if (scoreFilter === "low") matchesScore = rec.score <= 2;
    return matchesName && matchesScore;
  });

  // Update summary stats
  document.getElementById("statTotalPupils").textContent = filtered.length;
  const avg =
    filtered.length > 0
      ? (filtered.reduce((acc, r) => acc + Number(r.score), 0) / filtered.length).toFixed(1)
      : "0.0";
  document.getElementById("statAvgScore").textContent = avg;
  document.getElementById("statCertCount").textContent = filtered.filter((r) => r.score >= 4).length;

  const tbody = document.getElementById("teacherRecordsBody");
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">Tiada rekod penilaian ditemui.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered
    .map((rec, idx) => {
      const dateStr = new Date(rec.created_at).toLocaleString("ms-MY");
      return `
        <tr>
          <td><strong>${escapeHTML(rec.pupil_name)}</strong></td>
          <td><strong>${rec.score} / 5</strong></td>
          <td>${escapeHTML(rec.achievement_title || getAchievementTitle(rec.score))}</td>
          <td>${dateStr}</td>
          <td>
            <button class="btn-outline btn-sm" onclick="viewPupilDetail(${idx})">👁️ Perincian</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

function viewPupilDetail(filteredIdx) {
  const searchTerm = document.getElementById("searchPupilInput").value.toLowerCase().trim();
  const scoreFilter = document.getElementById("filterScoreSelect").value;
  const filtered = cachedTeacherRecords.filter((rec) => {
    const matchesName = (rec.pupil_name || "").toLowerCase().includes(searchTerm);
    if (scoreFilter === "high") return matchesName && rec.score >= 4;
    if (scoreFilter === "mid") return matchesName && rec.score === 3;
    if (scoreFilter === "low") return matchesName && rec.score <= 2;
    return matchesName;
  });

  const rec = filtered[filteredIdx];
  if (!rec) return;

  document.getElementById("detailPupilHeading").textContent = `Perincian Jawapan: ${rec.pupil_name} (${rec.score}/5)`;
  const answers = Array.isArray(rec.answers_json) ? rec.answers_json : [];

  document.getElementById("detailAnswersContent").innerHTML = answers.length
    ? answers
        .map(
          (a) =>
            `<div class="review-item ${a.isCorrect ? "rev-ok" : "rev-bad"}" style="margin-bottom:6px;">
              ${a.isCorrect ? "✅" : "❌"} Soalan ${a.questionNumber} (${a.equation}): Murid pilih <strong>${a.selectedAnswer}</strong> (Jawapan betul: ${a.correctAnswer})
            </div>`
        )
        .join("")
    : "<p>Tiada log jawapan terperinci.</p>";

  document.getElementById("pupilDetailBox").classList.remove("hidden");
}

function closePupilDetail() {
  document.getElementById("pupilDetailBox").classList.add("hidden");
}

function exportRecordsCSV() {
  if (cachedTeacherRecords.length === 0) {
    alert("Tiada rekod untuk dieksport.");
    return;
  }

  const headers = ["Nama Murid", "Skor", "Jumlah Soalan", "Tahap Pencapaian", "Tarikh"];
  const rows = cachedTeacherRecords.map((r) => [
    `"${(r.pupil_name || "").replace(/"/g, '""')}"`,
    r.score,
    5,
    `"${(r.achievement_title || "").replace(/"/g, '""')}"`,
    `"${new Date(r.created_at).toLocaleString("ms-MY")}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Rekod_Taman_Tambah_Ceria_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function renderTeacherModeration() {
  const list = await fetchAllFeedback(true);
  const container = document.getElementById("teacherFeedbackModerationList");
  if (list.length === 0) {
    container.innerHTML = "<p>Tiada maklum balas murid direkodkan.</p>";
    return;
  }

  container.innerHTML = list
    .map(
      (item, index) => `
      <div class="mod-item">
        <div>
          <strong>${escapeHTML(item.display_name)}</strong> • <small>${escapeHTML(item.favorite_activity)}</small>
          <p>${escapeHTML(item.comment || "(Tiada komen tambahan)")}</p>
        </div>
        <button class="btn-outline btn-sm" onclick="deleteFeedbackItem('${item.id || index}', ${index})">🗑️ Padam</button>
      </div>
    `
    )
    .join("");
}

async function deleteFeedbackItem(id, localIdx) {
  if (!confirm("Padam maklum balas ini?")) return;

  if (isSupabaseConnected && id) {
    await supabaseClient.from("pupil_feedback").delete().eq("id", id);
  } else {
    const list = JSON.parse(localStorage.getItem(LOCAL_FEEDBACK_KEY) || "[]");
    list.splice(localIdx, 1);
    localStorage.setItem(LOCAL_FEEDBACK_KEY, JSON.stringify(list));
  }

  await renderTeacherModeration();
  await loadPublicFeedback();
}

// Utility: Prevent XSS when rendering pupil names/comments
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ==========================================================================
// 11. INITIALIZE APPLICATION ON DOM READY
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();
  updateDbStatusBanner();
  initAdditionBoard();
  initNumberLine();
  loadPublicFeedback();
});