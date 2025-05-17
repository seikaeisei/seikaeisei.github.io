// quiz_app.js
import { allQuizData } from './data/quiz_data_loader.js';

// --- DOM要素の取得 ---
const selectionArea = document.getElementById('selection-area');
const yearButtonsContainer = document.getElementById('year-buttons-container');
const categoryButtonsContainer = document.getElementById('category-buttons-container');
const startQuizButton = document.getElementById('start-quiz-button');
const resumeQuizButton = document.getElementById('resume-quiz-button');
const viewHistoryButton = document.getElementById('view-history-button');
const quizContentArea = document.getElementById('quiz-content-area');

const homeButtonQuiz = document.getElementById('home-button-quiz');
const questionInfoElement = document.getElementById('question-info');
const questionTextElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackTextElement = document.getElementById('feedback-text');
const explanationTextElement = document.getElementById('explanation-text');
const scoreTextElement = document.getElementById('score-text');
const prevQuestionButton = document.getElementById('prev-question-button');
const nextQuestionButton = document.getElementById('next-question-button');
const navigationArea = document.getElementById('navigation-area');
const questionDetailsWrapper = document.getElementById('question-details-wrapper');

const resultsArea = document.getElementById('results-area');
const finalScoreTextElement = document.getElementById('final-score-text');
const finalScorePercentageElement = document.getElementById('final-score-percentage');
const confettiContainer = resultsArea.querySelector('.confetti-container');
const restartQuizButton = document.getElementById('restart-quiz-button');
const homeButtonResults = document.getElementById('home-button-results');
const creditText = document.getElementById('credit-text');
const muteButton = document.getElementById('mute-button');
const themeToggleButton = document.getElementById('theme-toggle-button');

const scoreHistoryModal = document.getElementById('score-history-modal');
const closeModalButton = document.getElementById('close-modal-button');
const scoreHistoryTableBody = document.getElementById('score-history-table-body');
const totalAttemptedStat = document.getElementById('total-attempted-stat');
const totalCorrectStat = document.getElementById('total-correct-stat');
const averageAccuracyStat = document.getElementById('average-accuracy-stat');
const clearHistoryButton = document.getElementById('clear-history-button');
const featuredQuestionsArea = document.getElementById('featured-questions-area');
const featuredQuestionsContainer = document.getElementById('featured-questions-container');

const interimResultsModal = document.getElementById('interim-results-modal');
const interimTitleText = document.getElementById('interim-title-text');
const interimScoreText = document.getElementById('interim-score-text');
const continueToNextSetButton = document.getElementById('continue-to-next-set-button');
const interruptQuizButton = document.getElementById('interrupt-quiz-button');


// --- localStorage キー ---
const QUIZ_PROGRESS_KEY = 'quizAppProgress';
const SCORE_HISTORY_KEY = 'quizAppScoreHistory';

// --- テーマ関連 ---
let currentTheme = localStorage.getItem('theme') || 'light';
const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>`;
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>`;
function applyTheme(theme) { if (theme === 'dark') { document.documentElement.classList.add('dark'); if (themeToggleButton) themeToggleButton.innerHTML = sunIcon; } else { document.documentElement.classList.remove('dark'); if (themeToggleButton) themeToggleButton.innerHTML = moonIcon; } localStorage.setItem('theme', theme); currentTheme = theme; }
function toggleTheme() { const newTheme = currentTheme === 'light' ? 'dark' : 'light'; applyTheme(newTheme); }
function initializeTheme() { const savedTheme = localStorage.getItem('theme'); const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; if (savedTheme) { applyTheme(savedTheme); } else if (prefersDark) { applyTheme('dark'); } else { applyTheme('light'); } }

// --- 効果音関連 ---
let isMuted = false;
let synth, correctSound, incorrectSound, scoreSound;
const speakerOnIcon = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.143 3.107a1.002 1.002 0 00-1.086.143L9.63 8H5a1 1 0 00-1 1v6a1 1 0 001 1h4.63l5.427 4.75a1.002 1.002 0 001.086.143 1 1 0 00.557-.92V4.027a1 1 0 00-.557-.92zM18 8.465a1 1 0 00-1.414.035 4.502 4.502 0 000 7.002A1 1 0 1018 16.537a6.503 6.503 0 000-10.107 1 1 0 00-.001-1.001L18 8.465z"></path><path d="M19.071 4.929a1 1 0 10-1.414 1.414 8.503 8.503 0 010 11.314 1 1 0 101.414 1.414 10.504 10.504 0 000-14.142z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;
const speakerOffIcon = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.143 3.107a1.002 1.002 0 00-1.086.143L9.63 8H5a1 1 0 00-1 1v6a1 1 0 001 1h4.63l5.427 4.75a1.002 1.002 0 001.086.143 1 1 0 00.557-.92V4.027a1 1 0 00-.557-.92zM20.485 9.515a1 1 0 10-1.414-1.414L16 11.172l-3.071-3.071a1 1 0 00-1.414 1.414L14.586 12.5l-2.929 2.929a1 1 0 101.414 1.414L16 13.828l3.071 3.071a1 1 0 001.414-1.414L17.414 12.5l3.071-3.071z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;
function initializeAudio() { if (typeof Tone === 'undefined') { console.warn("Tone.js is not loaded. Sound effects will be disabled."); return; } if (Tone.context.state !== 'running') { Tone.start().then(() => { console.log("AudioContext started by Tone.js on demand."); setupSynths(); }).catch(e => console.error("Error starting Tone.js AudioContext on demand:", e)); } else { setupSynths(); } }
function setupSynths() { if (!synth) { synth = new Tone.Synth({ oscillator: { type: "triangle" }, envelope: { attack: 0.005, decay: 0.1, sustain: 0.2, release: 0.3 } }).toDestination(); synth.volume.value = -15; correctSound = () => { if (isMuted || !synth) return; const now = Tone.now(); synth.triggerAttackRelease("C5", "16n", now); synth.triggerAttackRelease("G5", "8n", now + 0.15); }; incorrectSound = () => { if (isMuted || !synth) return; synth.triggerAttackRelease("A2", "8n", Tone.now()); synth.triggerAttackRelease("G#2", "8n", Tone.now() + 0.1);}; scoreSound = () => { if (isMuted || !synth) return; const now = Tone.now(); synth.triggerAttackRelease("C4", "8n", now); synth.triggerAttackRelease("E4", "8n", now + 0.12); synth.triggerAttackRelease("G4", "8n", now + 0.24); synth.triggerAttackRelease("C5", "4n", now + 0.36); }; } }
function toggleMute() { isMuted = !isMuted; updateMuteButtonIcon(); localStorage.setItem('quizMuted', isMuted.toString()); }
function updateMuteButtonIcon() { if (muteButton) muteButton.innerHTML = isMuted ? speakerOffIcon : speakerOnIcon; }

// --- クイズの状態管理 ---
let currentQuestionIndex = 0;
let score = 0;
let currentQuizQuestions = [];
let userAnswers = [];
let selectedYearValue = 'すべて';
let selectedCategoryValue = 'すべて';
let currentSetYear = null;
let currentSetCategory = null;
let currentSetScore = 0;
let currentSetAttempted = 0;

// --- アニメーションヘルパー ---
function switchView(hideElement, showElement) { if (hideElement) { hideElement.classList.remove('active'); hideElement.style.display = 'none'; } if (showElement) { showElement.style.display = 'block'; requestAnimationFrame(() => { showElement.classList.add('active'); }); } }

// --- イベントリスナー ---
if (startQuizButton) startQuizButton.addEventListener('click', () => { initializeAudio(); handleStartQuiz(false); });
if (resumeQuizButton) resumeQuizButton.addEventListener('click', () => { initializeAudio(); handleStartQuiz(true); });
if (nextQuestionButton) nextQuestionButton.addEventListener('click', loadNextQuestion);
if (prevQuestionButton) prevQuestionButton.addEventListener('click', loadPreviousQuestion);
if (restartQuizButton) restartQuizButton.addEventListener('click', handleRestartSameQuiz);
if (homeButtonQuiz) homeButtonQuiz.addEventListener('click', goToHome);
if (homeButtonResults) homeButtonResults.addEventListener('click', goToHome);
if (muteButton) muteButton.addEventListener('click', toggleMute);
if (themeToggleButton) themeToggleButton.addEventListener('click', toggleTheme);
if (viewHistoryButton) viewHistoryButton.addEventListener('click', displayScoreHistory);
if (closeModalButton) closeModalButton.addEventListener('click', () => { if (scoreHistoryModal) scoreHistoryModal.classList.remove('active'); });
if (clearHistoryButton) clearHistoryButton.addEventListener('click', clearScoreHistory);
if (continueToNextSetButton) continueToNextSetButton.addEventListener('click', continueToNextSet);
if (interruptQuizButton) interruptQuizButton.addEventListener('click', interruptQuiz);

// --- 保存・読み込み関連 ---
function saveQuizProgress() { const progress = { selectedYear: selectedYearValue, selectedCategory: selectedCategoryValue, currentQuestionIndex: currentQuestionIndex, userAnswers: userAnswers, score: score, currentQuizQuestions: currentQuizQuestions }; localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(progress)); }
function loadQuizProgress() { const savedProgress = localStorage.getItem(QUIZ_PROGRESS_KEY); if (savedProgress) { return JSON.parse(savedProgress); } return null; }
function clearQuizProgress() { localStorage.removeItem(QUIZ_PROGRESS_KEY); if (resumeQuizButton) resumeQuizButton.style.display = 'none'; }
function saveScore(quizResult) { let history = JSON.parse(localStorage.getItem(SCORE_HISTORY_KEY)) || []; history.unshift(quizResult); if (history.length > 20) history.pop(); localStorage.setItem(SCORE_HISTORY_KEY, JSON.stringify(history)); }
function displayScoreHistory() { if (!scoreHistoryTableBody || !scoreHistoryModal || !totalAttemptedStat || !totalCorrectStat || !averageAccuracyStat) return; const history = JSON.parse(localStorage.getItem(SCORE_HISTORY_KEY)) || []; scoreHistoryTableBody.innerHTML = ''; let totalAttempted = 0; let totalCorrect = 0; if (history.length === 0) { const row = scoreHistoryTableBody.insertRow(); const cell = row.insertCell(); cell.colSpan = 5; cell.textContent = 'まだ成績がありません。'; cell.style.textAlign = 'center'; } else { history.forEach(result => { const row = scoreHistoryTableBody.insertRow(); row.insertCell().textContent = new Date(result.date).toLocaleString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}); row.insertCell().textContent = result.year === 'すべて' ? '全年度' : formatYearForDisplay(result.year); row.insertCell().textContent = result.category === 'すべて' ? '全分野' : result.category; row.insertCell().textContent = `${result.correctAnswers} / ${result.totalQuestions}`; row.insertCell().textContent = `${result.percentage.toFixed(1)}%`; totalAttempted += result.totalQuestions; totalCorrect += result.correctAnswers; }); } totalAttemptedStat.textContent = totalAttempted; totalCorrectStat.textContent = totalCorrect; averageAccuracyStat.textContent = totalAttempted > 0 ? ((totalCorrect / totalAttempted) * 100).toFixed(1) : '0.0'; scoreHistoryModal.classList.add('active'); }
function clearScoreHistory() { if (confirm('本当にすべての成績履歴を消去しますか？この操作は元に戻せません。')) { localStorage.removeItem(SCORE_HISTORY_KEY); displayScoreHistory(); } }

// --- 中間結果関連 ---
function showInterimResults() { if (!interimResultsModal || !interimTitleText || !interimScoreText) return; interimTitleText.textContent = `${formatYearForDisplay(currentSetYear)} ${currentSetCategory}`; const percentage = currentSetAttempted > 0 ? (currentSetScore / currentSetAttempted) * 100 : 0; interimScoreText.textContent = `このセットのスコア: ${currentSetScore} / ${currentSetAttempted} (${percentage.toFixed(1)}%)`; interimResultsModal.classList.add('active'); }
function continueToNextSet() { if (interimResultsModal) interimResultsModal.classList.remove('active'); currentSetScore = 0; currentSetAttempted = 0; loadQuestion(); }
function interruptQuiz() { if (interimResultsModal) interimResultsModal.classList.remove('active'); saveQuizProgress(); goToHome(); }

// --- 関数の定義 ---
function formatYearForDisplay(year) {
    if (year === 'すべて' || year === null || typeof year === 'undefined') return 'すべての年度';
    const numericYear = parseInt(year.toString(), 10);
    if (isNaN(numericYear)) return year.toString();

    if (numericYear >= 2019) {
        return `令和${numericYear - 2018}年 (${numericYear})`;
    } else if (numericYear >= 1989) {
        return `平成${numericYear - 1988}年 (${numericYear})`;
    }
    return `${numericYear}年度`;
}

function goToHome() { switchView(quizContentArea, selectionArea); switchView(resultsArea, selectionArea); if (creditText) creditText.style.display = 'block'; currentQuestionIndex = 0; score = 0; currentQuizQuestions = []; userAnswers = []; 
    const yearBtns = yearButtonsContainer.querySelectorAll('.year-button');
    yearBtns.forEach(btn => btn.classList.remove('selected'));
    const allYearBtn = Array.from(yearBtns).find(btn => btn.dataset.year === 'すべて');
    if (allYearBtn) allYearBtn.classList.add('selected');
    selectedYearValue = 'すべて';

    const catButtons = categoryButtonsContainer.querySelectorAll('.category-button');
    catButtons.forEach(btn => btn.classList.remove('selected'));
    const allCategoryBtn = Array.from(catButtons).find(btn => btn.dataset.category === 'すべて');
    if (allCategoryBtn) allCategoryBtn.classList.add('selected');
    selectedCategoryValue = 'すべて';
    checkResumeButton(); displayFeaturedQuestions(); 
}
function handleRestartSameQuiz() { if (currentQuizQuestions.length === 0) { goToHome(); return; } currentQuestionIndex = 0; score = 0; userAnswers = new Array(currentQuizQuestions.length).fill(null); switchView(resultsArea, quizContentArea); if (navigationArea) navigationArea.style.display = 'flex'; if (nextQuestionButton) { nextQuestionButton.textContent = '次の問題へ'; nextQuestionButton.style.display = 'none'; } if (prevQuestionButton) prevQuestionButton.disabled = true; loadQuestion(true); }

function populateSelectors() {
    if (!yearButtonsContainer || !categoryButtonsContainer || !startQuizButton) return;
    yearButtonsContainer.innerHTML = ''; 
    categoryButtonsContainer.innerHTML = '';

    if (typeof allQuizData === 'undefined' || allQuizData.length === 0) {
        console.warn("クイズデータが空または未定義です。");
        yearButtonsContainer.textContent = '年度データなし';
        categoryButtonsContainer.textContent = '分野データなし';
        startQuizButton.disabled = true; return;
    }
    startQuizButton.disabled = false;

    const years = ['すべて', ...new Set(allQuizData.map(q => q.year))].sort((a, b) => (a === 'すべて' ? -1 : b === 'すべて' ? 1 : Number(b) - Number(a)));
    const categories = ['すべて', ...new Set(allQuizData.map(q => q.category))].sort((a, b) => (a === 'すべて' ? -1 : b === 'すべて' ? 1 : String(a).localeCompare(String(b), 'ja')));
    
    years.forEach(year => {
        const button = document.createElement('button');
        button.textContent = formatYearForDisplay(year.toString());
        button.dataset.year = year.toString();
        button.className = 'year-button';
        if (year.toString() === selectedYearValue) {
            button.classList.add('selected');
        }
        button.addEventListener('click', () => {
            yearButtonsContainer.querySelectorAll('.year-button').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedYearValue = button.dataset.year;
        });
        yearButtonsContainer.appendChild(button);
    });

    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category === 'すべて' ? 'すべて' : category;
        button.dataset.category = category;
        button.className = 'category-button';
        if (category === selectedCategoryValue) {
            button.classList.add('selected');
        }
        button.addEventListener('click', () => {
            categoryButtonsContainer.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedCategoryValue = category;
        });
        categoryButtonsContainer.appendChild(button);
    });
}

function handleStartQuiz(isResuming = false) {
    if (isResuming) {
        const progress = loadQuizProgress();
        if (progress) {
            selectedYearValue = progress.selectedYear;
            selectedCategoryValue = progress.selectedCategory;
            currentQuestionIndex = progress.currentQuestionIndex;
            userAnswers = progress.userAnswers;
            score = progress.score;
            currentQuizQuestions = progress.currentQuizQuestions;
            updateYearButtonSelection(selectedYearValue);
            updateCategoryButtonSelection(selectedCategoryValue);
        } else {
            alert('保存されたデータが見つかりませんでした。新しくクイズを開始します。');
            isResuming = false;
        }
    }

    if (!isResuming) {
        if (typeof allQuizData === 'undefined' || allQuizData.length === 0) { alert('クイズデータを読み込めませんでした。'); return; }
        currentQuizQuestions = allQuizData.filter(q => {
            const yearMatch = (selectedYearValue === 'すべて' || q.year.toString() === selectedYearValue);
            const categoryMatch = (selectedCategoryValue === 'すべて' || q.category === selectedCategoryValue);
            return yearMatch && categoryMatch;
        });
        currentQuizQuestions.sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            const categoryOrder = ["衛生法規", "公衆衛生学", "栄養学", "食品学", "食品衛生学", "製菓理論", "製菓実技(和菓子)", "製菓実技(洋菓子)", "製菓実技(製パン)"];
            const indexA = categoryOrder.indexOf(a.category);
            const indexB = categoryOrder.indexOf(b.category);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            return a.category.localeCompare(b.category);
        });
        if (currentQuizQuestions.length === 0) { alert('選択された条件に該当する問題がありません。別の条件をお試しください。'); return; }
        currentQuestionIndex = 0; score = 0;
        userAnswers = new Array(currentQuizQuestions.length).fill(null);
    }
    
    currentSetScore = 0;
    currentSetAttempted = 0;
    if (currentQuizQuestions.length > 0 && currentQuizQuestions[currentQuestionIndex]) {
        currentSetYear = currentQuizQuestions[currentQuestionIndex].year;
        currentSetCategory = currentQuizQuestions[currentQuestionIndex].category;
    } else if (currentQuizQuestions.length > 0) {
         currentSetYear = currentQuizQuestions[0].year;
         currentSetCategory = currentQuizQuestions[0].category;
    }

    switchView(selectionArea, quizContentArea);
    if (resultsArea) resultsArea.style.display = 'none';
    if (navigationArea) navigationArea.style.display = 'flex';
    if (nextQuestionButton) { nextQuestionButton.textContent = '次の問題へ'; nextQuestionButton.style.display = 'none'; }
    if (prevQuestionButton) prevQuestionButton.disabled = true;
    if (creditText) creditText.style.display = 'none';
    loadQuestion(true);
}

function loadQuestion(isFirstLoadOrPrevious = false) {
    if (!optionsContainer || !feedbackTextElement || !explanationTextElement || !questionInfoElement || !questionTextElement || !nextQuestionButton || !prevQuestionButton || !questionDetailsWrapper) {
        console.error("One or more DOM elements for quiz question display are missing.");
        return;
    }

    if (currentQuestionIndex >= currentQuizQuestions.length) {
        showResults();
        return;
    }

    if (currentQuestionIndex > 0 && (selectedYearValue === 'すべて' || selectedCategoryValue === 'すべて')) {
        const prevQuestion = currentQuizQuestions[currentQuestionIndex - 1];
        const currentQ = currentQuizQuestions[currentQuestionIndex];
        if (currentQ && prevQuestion && (currentQ.year !== prevQuestion.year || currentQ.category !== prevQuestion.category)) {
            currentSetYear = prevQuestion.year; 
            currentSetCategory = prevQuestion.category;
            showInterimResults();
            return; 
        }
    }
    const currentQForSet = currentQuizQuestions[currentQuestionIndex];
    if(currentQForSet && (currentQForSet.year !== currentSetYear || currentQForSet.category !== currentSetCategory)){
        currentSetYear = currentQForSet.year;
        currentSetCategory = currentQForSet.category;
        currentSetScore = 0;
        currentSetAttempted = 0;
    }

    const animateQuestionChange = () => {
        optionsContainer.innerHTML = '';
        feedbackTextElement.textContent = '';
        explanationTextElement.textContent = '';
        feedbackTextElement.className = 'text-lg font-semibold';
        explanationTextElement.className = 'text-sm mt-1.5 leading-snug';

        const currentQuestion = currentQuizQuestions[currentQuestionIndex];
        if (!currentQuestion) { console.error("Error: currentQuestion is undefined at index", currentQuestionIndex); goToHome(); alert("問題の読み込みに失敗しました。ホームに戻ります。"); return; }
        
        questionInfoElement.textContent = `${formatYearForDisplay(currentQuestion.year.toString())} - ${currentQuestion.category}`;
        const questionText = currentQuestion.question || "";
        questionTextElement.innerHTML = `問題 ${currentQuestionIndex + 1}: ${questionText.replace(/\n/g, '<br>')}`;

        const userAnswerInfo = userAnswers[currentQuestionIndex];
        const options = Array.isArray(currentQuestion.options) ? currentQuestion.options : [];
        options.forEach(optionText => {
            const button = document.createElement('button');
            button.textContent = optionText;
            button.className = 'option-button w-full text-left p-3 sm:p-4 border rounded-lg transition';
            if (userAnswerInfo) {
                button.disabled = true;
                if (optionText === currentQuestion.correctAnswer) button.classList.add('selected-correct');
                else if (optionText === userAnswerInfo.selected) button.classList.add('selected-incorrect');
            } else {
                button.disabled = false;
                button.onclick = () => selectAnswer(optionText, currentQuestion.correctAnswer, currentQuestion.explanation);
            }
            optionsContainer.appendChild(button);
        });

        if (userAnswerInfo) {
            feedbackTextElement.textContent = userAnswerInfo.isCorrect ? '正解！' : '不正解...';
            feedbackTextElement.classList.add(userAnswerInfo.isCorrect ? 'feedback-text-correct' : 'feedback-text-incorrect', 'feedback-animation');
            explanationTextElement.textContent = `解説: ${currentQuestion.explanation || ""}`;
            explanationTextElement.classList.add('feedback-animation');
        }

        prevQuestionButton.disabled = currentQuestionIndex === 0;
        if (userAnswerInfo) {
            nextQuestionButton.style.display = 'inline-flex';
            if (currentQuestionIndex === currentQuizQuestions.length - 1) {
                nextQuestionButton.textContent = '結果を見る';
            } else {
                nextQuestionButton.textContent = '次の問題へ';
            }
        } else {
            nextQuestionButton.style.display = 'none';
        }
        updateScoreDisplay();

        if (!isFirstLoadOrPrevious) {
            questionDetailsWrapper.classList.remove('question-exit', 'question-enter-active');
            questionDetailsWrapper.classList.add('question-enter');
            requestAnimationFrame(() => {
                questionDetailsWrapper.classList.add('question-enter-active');
            });
        } else {
             questionDetailsWrapper.classList.remove('question-exit', 'question-enter');
             requestAnimationFrame(() => { 
                questionDetailsWrapper.classList.add('question-enter-active');
             });
        }
    };

    if (!isFirstLoadOrPrevious && questionDetailsWrapper.classList.contains('question-enter-active')) {
        questionDetailsWrapper.classList.add('question-exit');
        questionDetailsWrapper.classList.remove('question-enter-active', 'question-enter');
        setTimeout(animateQuestionChange, 250); 
    } else {
        animateQuestionChange();
    }
}

function loadPreviousQuestion() { if (currentQuestionIndex > 0) { currentQuestionIndex--; loadQuestion(true); } }
function selectAnswer(selectedOption, correctAnswer, explanation) { if (userAnswers[currentQuestionIndex] !== null) return; const isCorrect = selectedOption === correctAnswer; userAnswers[currentQuestionIndex] = { selected: selectedOption, isCorrect: isCorrect }; if (isCorrect) { score++; currentSetScore++; if (correctSound) correctSound(); } else { if (incorrectSound) incorrectSound(); } currentSetAttempted++; saveQuizProgress(); loadQuestion(); }
function updateScoreDisplay() { if (scoreTextElement) { const answeredCount = userAnswers.filter(ans => ans !== null).length; scoreTextElement.textContent = `スコア: ${score} / ${answeredCount}`; } }
function loadNextQuestion() { if (currentQuestionIndex < currentQuizQuestions.length - 1) { currentQuestionIndex++; loadQuestion(); } else { showResults(); } }

function showResults() {
    switchView(quizContentArea, resultsArea);
    if (finalScoreTextElement && finalScorePercentageElement) {
        const totalQuestions = currentQuizQuestions.length;
        const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
        
        let displayedScore = 0;
        finalScoreTextElement.textContent = `0 / ${totalQuestions}`;
        finalScorePercentageElement.textContent = `(0.0%)`;

        const interval = setInterval(() => {
            if (displayedScore < score) {
                displayedScore++;
                const currentPercentage = totalQuestions > 0 ? (displayedScore / totalQuestions) * 100 : 0;
                finalScoreTextElement.textContent = `${displayedScore} / ${totalQuestions}`;
                finalScorePercentageElement.textContent = `(${currentPercentage.toFixed(1)}%)`;
            } else {
                clearInterval(interval);
                finalScoreTextElement.textContent = `${score} / ${totalQuestions}`;
                finalScorePercentageElement.textContent = `(${percentage.toFixed(1)}%)`;
                if (scoreSound) scoreSound();
                if (percentage >= 60 && confettiContainer) { 
                    triggerConfetti();
                }
            }
        }, 50);

        const quizResult = { date: new Date().toISOString(), year: selectedYearValue, category: selectedCategoryValue, totalQuestions: totalQuestions, correctAnswers: score, percentage: percentage };
        saveScore(quizResult);
        clearQuizProgress(); 
        checkResumeButton(); 
    }
}

function triggerConfetti() { if (!confettiContainer) return; confettiContainer.innerHTML = ''; for (let i = 0; i < 50; i++) { const confetti = document.createElement('div'); confetti.classList.add('confetti'); confetti.style.left = Math.random() * 100 + 'vw'; confetti.style.animationDelay = Math.random() * 2 + 's'; confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`; confetti.style.transform = `scale(${Math.random() * 0.5 + 0.5})`; confetti.style.width = Math.random() * 8 + 6 + 'px'; confetti.style.height = confetti.style.width; confettiContainer.appendChild(confetti); } }
function checkResumeButton() { if (resumeQuizButton) { const savedProgress = localStorage.getItem(QUIZ_PROGRESS_KEY); if (savedProgress) { resumeQuizButton.style.display = 'inline-flex'; } else { resumeQuizButton.style.display = 'none'; } } }
function displayFeaturedQuestions() { if (!allQuizData || allQuizData.length === 0 || !featuredQuestionsArea || !featuredQuestionsContainer) { if (featuredQuestionsArea) featuredQuestionsArea.style.display = 'none'; return; } featuredQuestionsContainer.innerHTML = ''; let featured = []; const latestYear = Math.max(...allQuizData.map(q => q.year).filter(y => !isNaN(y))); const categoriesToShow = ["食品衛生学", "衛生法規"]; categoriesToShow.forEach(category => { const questionsInCategory = allQuizData.filter(q => q.category === category && q.year === latestYear); if (questionsInCategory.length > 0) { featured.push(questionsInCategory[0]); } }); if (featured.length < 2 && allQuizData.length > 0) { const latestQuestions = allQuizData.filter(q => q.year === latestYear).slice(0, 2 - featured.length); featured = [...new Set([...featured, ...latestQuestions])];} if (featured.length > 0) { featured.slice(0, 2).forEach(question => { const qElement = document.createElement('div'); qElement.className = 'featured-question-item'; qElement.innerHTML = `<p class="text-xs">${formatYearForDisplay(question.year.toString())} - ${question.category}</p><p class="font-medium text-sm mt-1">${(question.question || "").length > 80 ? (question.question || "").substring(0, 80) + "..." : (question.question || "")}</p>`; qElement.addEventListener('click', () => { selectedYearValue = question.year.toString(); selectedCategoryValue = question.category; updateYearButtonSelection(selectedYearValue); updateCategoryButtonSelection(selectedCategoryValue); handleStartQuiz(false); }); featuredQuestionsContainer.appendChild(qElement); }); featuredQuestionsArea.style.display = 'block'; } else { featuredQuestionsArea.style.display = 'none'; } }
function updateYearButtonSelection(year) { const yearBtns = yearButtonsContainer.querySelectorAll('.year-button'); yearBtns.forEach(btn => { btn.classList.remove('selected'); if (btn.dataset.year === year) { btn.classList.add('selected'); } }); }
function updateCategoryButtonSelection(category) { const catButtons = categoryButtonsContainer.querySelectorAll('.category-button'); catButtons.forEach(btn => { btn.classList.remove('selected'); if (btn.dataset.category === category) { btn.classList.add('selected'); } }); }

// --- 初期化 ---
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme(); 
    const savedMuteState = localStorage.getItem('quizMuted');
    if (savedMuteState !== null) isMuted = JSON.parse(savedMuteState);
    updateMuteButtonIcon();
    initializeAudio(); 

    populateSelectors();
    checkResumeButton();
    displayFeaturedQuestions();

    if (selectionArea) {
        selectionArea.style.display = 'flex'; 
        selectionArea.classList.add('active');
    } else {
        console.error("selectionArea not found");
    }
    if (quizContentArea) quizContentArea.style.display = 'none'; else console.error("quizContentArea not found");
    if (resultsArea) resultsArea.style.display = 'none'; else console.error("resultsArea not found");
    if (creditText) creditText.style.display = 'block'; else console.error("creditText not found");
});
