// quiz_app.js
import { allQuizData } from './data/quiz_data_loader.js';

// --- DOM要素の取得 ---
const selectionArea = document.getElementById('selection-area');
const yearButtonsContainer = document.getElementById('year-buttons-container');
const categoryButtonsContainer = document.getElementById('category-buttons-container');
const startQuizButton = document.getElementById('start-quiz-button');
const resumeQuizButton = document.getElementById('resume-quiz-button');
const viewHistoryButton = document.getElementById('view-history-button');
const viewFavoritesButton = document.getElementById('view-favorites-button');
const quizContentArea = document.getElementById('quiz-content-area');

const homeButtonQuiz = document.getElementById('home-button-quiz');
const questionInfoElement = document.getElementById('question-info');
const favoriteButton = document.getElementById('favorite-button');
const questionTextElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackTextElement = document.getElementById('feedback-text');
const explanationTextElement = document.getElementById('explanation-text');
const scoreTextElement = document.getElementById('score-text');
const prevQuestionButton = document.getElementById('prev-question-button');
const nextQuestionButton = document.getElementById('next-question-button');
const navigationArea = document.getElementById('navigation-area');
const questionDetailsWrapper = document.getElementById('question-details-wrapper');
const timerBarContainer = document.querySelector('.timer-bar-container');
const timerBar = document.getElementById('timer-bar');
const pauseResumeButton = document.getElementById('pause-resume-button'); // ▼追加: 一時停止ボタン

const resultsArea = document.getElementById('results-area');
const finalScoreTextElement = document.getElementById('final-score-text');
const finalScorePercentageElement = document.getElementById('final-score-percentage');
const confettiContainer = resultsArea.querySelector('.confetti-container');
const resultsQuestionsListUL = resultsArea.querySelector('#results-questions-list ul');
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

const favoritesModal = document.getElementById('favorites-modal');
const favoritesList = document.getElementById('favorites-list');
const clearFavoritesButton = document.getElementById('clear-favorites-button');
const closeFavoritesModalButton = document.getElementById('close-favorites-modal-button');


// --- localStorage キー ---
const QUIZ_PROGRESS_KEY = 'quizAppProgress';
const SCORE_HISTORY_KEY = 'quizAppScoreHistory';
const FAVORITES_KEY = 'quizAppFavorites';

// --- 自動遷移タイマー ---
let autoAdvanceTimer = null;
let autoAdvanceInterval = null;
const AUTO_ADVANCE_DELAY = 15000;
let isAutoAdvancePaused = false; // ▼追加: 一時停止状態フラグ
let remainingAutoAdvanceTime = 0; // ▼追加: 残り時間保存用

// --- テーマ関連 ---
let currentTheme = localStorage.getItem('theme') || 'light';
const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>`;
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>`;
function applyTheme(theme) { if (theme === 'dark') { document.documentElement.classList.add('dark'); if (themeToggleButton) themeToggleButton.innerHTML = sunIcon; } else { document.documentElement.classList.remove('dark'); if (themeToggleButton) themeToggleButton.innerHTML = moonIcon; } localStorage.setItem('theme', theme); currentTheme = theme; }
function toggleTheme() { const newTheme = currentTheme === 'light' ? 'dark' : 'light'; applyTheme(newTheme); }
function initializeTheme() { const savedTheme = localStorage.getItem('theme'); const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; if (savedTheme) { applyTheme(savedTheme); } else if (prefersDark) { applyTheme('dark'); } else { applyTheme('light'); } }

// --- 効果音関連 ---
let isMuted = false;
let synth, correctSound, incorrectSound, scoreSoundGood, scoreSoundOkay, scoreSoundBad;
const speakerOnIcon = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.143 3.107a1.002 1.002 0 00-1.086.143L9.63 8H5a1 1 0 00-1 1v6a1 1 0 001 1h4.63l5.427 4.75a1.002 1.002 0 001.086.143 1 1 0 00.557-.92V4.027a1 1 0 00-.557-.92zM18 8.465a1 1 0 00-1.414.035 4.502 4.502 0 000 7.002A1 1 0 1018 16.537a6.503 6.503 0 000-10.107 1 1 0 00-.001-1.001L18 8.465z"></path><path d="M19.071 4.929a1 1 0 10-1.414 1.414 8.503 8.503 0 010 11.314 1 1 0 101.414 1.414 10.504 10.504 0 000-14.142z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;
const speakerOffIcon = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.143 3.107a1.002 1.002 0 00-1.086.143L9.63 8H5a1 1 0 00-1 1v6a1 1 0 001 1h4.63l5.427 4.75a1.002 1.002 0 001.086.143 1 1 0 00.557-.92V4.027a1 1 0 00-.557-.92zM20.485 9.515a1 1 0 10-1.414-1.414L16 11.172l-3.071-3.071a1 1 0 00-1.414 1.414L14.586 12.5l-2.929 2.929a1 1 0 101.414 1.414L16 13.828l3.071 3.071a1 1 0 001.414-1.414L17.414 12.5l3.071-3.071z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;
function initializeAudio() { if (typeof Tone === 'undefined') { console.warn("Tone.js is not loaded. Sound effects will be disabled."); return; } if (Tone.context.state !== 'running') { Tone.start().then(() => { console.log("AudioContext started by Tone.js on demand."); setupSynths(); }).catch(e => console.error("Error starting Tone.js AudioContext on demand:", e)); } else { setupSynths(); } }
function setupSynths() { if (!synth) { synth = new Tone.Synth({ oscillator: { type: "triangle" }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.4 } }).toDestination(); synth.volume.value = -18; correctSound = () => { if (isMuted || !synth) return; const now = Tone.now(); synth.triggerAttackRelease("E5", "16n", now); synth.triggerAttackRelease("G5", "8n", now + 0.1); }; incorrectSound = () => { if (isMuted || !synth) return; synth.triggerAttackRelease("C3", "8n", Tone.now()); synth.triggerAttackRelease("A2", "8n", Tone.now() + 0.05);}; scoreSoundGood = () => { if (isMuted || !synth) return; const now = Tone.now(); const notes = ["C5", "E5", "G5", "C6"]; notes.forEach((note, i) => { synth.triggerAttackRelease(note, "8n", now + i * 0.1); }); }; scoreSoundOkay = () => { if (isMuted || !synth) return; const now = Tone.now(); synth.triggerAttackRelease("C4", "4n", now); synth.triggerAttackRelease("G4", "4n", now + 0.2); }; scoreSoundBad = () => { if (isMuted || !synth) return; const noiseSynth = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.1 } }).toDestination(); noiseSynth.volume.value = -20; noiseSynth.triggerAttackRelease("8n", Tone.now()); }; } }
function toggleMute() { isMuted = !isMuted; updateMuteButtonIcon(); localStorage.setItem('quizMuted', isMuted.toString()); }
function updateMuteButtonIcon() { if (muteButton) muteButton.innerHTML = isMuted ? speakerOffIcon : speakerOnIcon; }

// --- お気に入り機能関連 ---
let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
const starEmptyIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.82.61l-4.72-3.004a.563.563 0 00-.652 0l-4.72 3.004a.562.562 0 01-.82-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>`;
const starFilledIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.76 3.003c-.996.608-2.231-.289-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>`;

function isFavorite(question) { if (!question) return false; return favorites.some(fav => fav.year === question.year && fav.category === question.category && fav.question === question.question); }
function toggleFavorite() { if (currentQuizQuestions.length === 0 || !currentQuizQuestions[currentQuestionIndex]) return; const currentQuestion = currentQuizQuestions[currentQuestionIndex]; const index = favorites.findIndex(fav => fav.year === currentQuestion.year && fav.category === currentQuestion.category && fav.question === currentQuestion.question); if (index > -1) { favorites.splice(index, 1); } else { favorites.push({ year: currentQuestion.year, category: currentQuestion.category, question: currentQuestion.question, options: currentQuestion.options, correctAnswer: currentQuestion.correctAnswer, explanation: currentQuestion.explanation }); } localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); updateFavoriteButtonIcon(); }
function updateFavoriteButtonIcon() { if (!favoriteButton || currentQuizQuestions.length === 0 || !currentQuizQuestions[currentQuestionIndex]) { if(favoriteButton) favoriteButton.innerHTML = starEmptyIcon; return; } const currentQuestion = currentQuizQuestions[currentQuestionIndex]; favoriteButton.innerHTML = isFavorite(currentQuestion) ? starFilledIcon : starEmptyIcon; }
function displayFavorites() { if (!favoritesList || !favoritesModal) { console.error("Favorites DOM elements not found."); return; } favoritesList.innerHTML = ''; if (favorites.length === 0) { favoritesList.innerHTML = '<li>お気に入り登録された問題はありません。</li>'; } else { favorites.forEach((fav) => { const li = document.createElement('li'); li.className = 'favorite-item'; li.innerHTML = `<div class="favorite-item-year-category">${formatYearForDisplay(fav.year.toString())} - ${fav.category}</div><div class="favorite-item-question">${(fav.question || "").length > 60 ? (fav.question || "").substring(0, 60) + "..." : (fav.question || "")}</div>`; li.addEventListener('click', () => { currentQuizQuestions = [fav]; selectedYearValue = fav.year.toString(); selectedCategoryValue = fav.category; currentQuestionIndex = 0; score = 0; userAnswers = [null]; currentSetYear = fav.year; currentSetCategory = fav.category; currentSetScore = 0; currentSetAttempted = 0; updateYearButtonSelection(selectedYearValue); updateCategoryButtonSelection(selectedCategoryValue); switchView(selectionArea, quizContentArea); switchView(favoritesModal, null); if (resultsArea) resultsArea.style.display = 'none'; if (navigationArea) navigationArea.style.display = 'flex'; if (nextQuestionButton) { nextQuestionButton.textContent = '結果を見る'; nextQuestionButton.style.display = 'none';} if (prevQuestionButton) prevQuestionButton.disabled = true; if (creditText) creditText.style.display = 'none'; loadQuestion(true); }); favoritesList.appendChild(li); }); } favoritesModal.classList.add('active'); }
function clearFavorites() { if (confirm('すべてのお気に入りを解除しますか？')) { favorites = []; localStorage.removeItem(FAVORITES_KEY); displayFavorites(); updateFavoriteButtonIcon(); } }


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
if (nextQuestionButton) nextQuestionButton.addEventListener('click', () => { /* clearTimeout(autoAdvanceTimer); clearInterval(autoAdvanceInterval); */ resetAutoAdvanceState(); loadNextQuestion(); }); // resetAutoAdvanceState呼び出しに修正
if (prevQuestionButton) prevQuestionButton.addEventListener('click', () => { /* clearTimeout(autoAdvanceTimer); clearInterval(autoAdvanceInterval); */ resetAutoAdvanceState(); loadPreviousQuestion(); }); // resetAutoAdvanceState呼び出しに修正
if (restartQuizButton) restartQuizButton.addEventListener('click', handleRestartSameQuiz);
if (homeButtonQuiz) homeButtonQuiz.addEventListener('click', () => { /* clearTimeout(autoAdvanceTimer); clearInterval(autoAdvanceInterval); */ goToHome(); }); // goToHome内でresetAutoAdvanceStateが呼ばれる
if (homeButtonResults) homeButtonResults.addEventListener('click', goToHome);
if (muteButton) muteButton.addEventListener('click', toggleMute);
if (themeToggleButton) themeToggleButton.addEventListener('click', toggleTheme);
if (viewHistoryButton) viewHistoryButton.addEventListener('click', displayScoreHistory);
if (closeModalButton) closeModalButton.addEventListener('click', () => { if (scoreHistoryModal) scoreHistoryModal.classList.remove('active'); });
if (clearHistoryButton) clearHistoryButton.addEventListener('click', clearScoreHistory);
if (viewFavoritesButton) viewFavoritesButton.addEventListener('click', displayFavorites);
if (closeFavoritesModalButton) closeFavoritesModalButton.addEventListener('click', () => { if (favoritesModal) favoritesModal.classList.remove('active'); });
if (clearFavoritesButton) clearFavoritesButton.addEventListener('click', clearFavorites);
if (favoriteButton) favoriteButton.addEventListener('click', toggleFavorite);
if (continueToNextSetButton) continueToNextSetButton.addEventListener('click', () => { resetAutoAdvanceState(); continueToNextSet(); }); // resetAutoAdvanceState呼び出しに修正
if (interruptQuizButton) interruptQuizButton.addEventListener('click', () => { resetAutoAdvanceState(); interruptQuiz(); }); // resetAutoAdvanceState呼び出しに修正
if (pauseResumeButton) pauseResumeButton.addEventListener('click', toggleAutoAdvancePause); // ▼追加


// --- 保存・読み込み関連 ---
function saveQuizProgress() { const progress = { selectedYear: selectedYearValue, selectedCategory: selectedCategoryValue, currentQuestionIndex: currentQuestionIndex, userAnswers: userAnswers, score: score, currentQuizQuestions: currentQuizQuestions, currentSetYear, currentSetCategory, currentSetScore, currentSetAttempted }; localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(progress)); }
function loadQuizProgress() { const savedProgress = localStorage.getItem(QUIZ_PROGRESS_KEY); if (savedProgress) { return JSON.parse(savedProgress); } return null; }
function clearQuizProgress() { localStorage.removeItem(QUIZ_PROGRESS_KEY); if (resumeQuizButton) resumeQuizButton.style.display = 'none'; }
function saveScore(quizResult) { let history = JSON.parse(localStorage.getItem(SCORE_HISTORY_KEY)) || []; history.unshift(quizResult); if (history.length > 20) history.pop(); localStorage.setItem(SCORE_HISTORY_KEY, JSON.stringify(history)); }
function displayScoreHistory() { if (!scoreHistoryTableBody || !scoreHistoryModal || !totalAttemptedStat || !totalCorrectStat || !averageAccuracyStat) { console.error("Score history DOM elements not found for displayScoreHistory."); return; } const history = JSON.parse(localStorage.getItem(SCORE_HISTORY_KEY)) || []; scoreHistoryTableBody.innerHTML = ''; let totalAttempted = 0; let totalCorrect = 0; if (history.length === 0) { const row = scoreHistoryTableBody.insertRow(); const cell = row.insertCell(); cell.colSpan = 5; cell.textContent = 'まだ成績がありません。'; cell.style.textAlign = 'center'; } else { history.forEach(result => { const row = scoreHistoryTableBody.insertRow(); row.insertCell().textContent = new Date(result.date).toLocaleString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}); row.insertCell().textContent = result.year === 'すべて' ? '全年度' : formatYearForDisplay(result.year); row.insertCell().textContent = result.category === 'すべて' ? '全分野' : result.category; row.insertCell().textContent = `${result.correctAnswers} / ${result.totalQuestions}`; row.insertCell().textContent = `${result.percentage.toFixed(1)}%`; totalAttempted += result.totalQuestions; totalCorrect += result.correctAnswers; }); } totalAttemptedStat.textContent = totalAttempted; totalCorrectStat.textContent = totalCorrect; averageAccuracyStat.textContent = totalAttempted > 0 ? ((totalCorrect / totalAttempted) * 100).toFixed(1) : '0.0'; scoreHistoryModal.classList.add('active'); }
function clearScoreHistory() { if (confirm('本当にすべての成績履歴を消去しますか？この操作は元に戻せません。')) { localStorage.removeItem(SCORE_HISTORY_KEY); displayScoreHistory(); } }

// --- 中間結果関連 ---
function showInterimResults() { if (!interimResultsModal || !interimTitleText || !interimScoreText) return; interimTitleText.textContent = `${formatYearForDisplay(currentSetYear)} ${currentSetCategory}`; const percentage = currentSetAttempted > 0 ? (currentSetScore / currentSetAttempted) * 100 : 0; interimScoreText.textContent = `このセットのスコア: ${currentSetScore} / ${currentSetAttempted} (${percentage.toFixed(1)}%)`; interimResultsModal.classList.add('active'); }
function continueToNextSet() { if (interimResultsModal) interimResultsModal.classList.remove('active'); currentSetScore = 0; currentSetAttempted = 0; loadQuestion(); }
function interruptQuiz() { if (interimResultsModal) interimResultsModal.classList.remove('active'); saveQuizProgress(); goToHome(); }


// ▼▼▼ 自動送り一時停止/再開関連の関数を追加 ▼▼▼
function toggleAutoAdvancePause() {
    if (!userAnswers[currentQuestionIndex]) return; // 解答前は無効 (または、タイマーが作動していない場合)

    isAutoAdvancePaused = !isAutoAdvancePaused;
    if (isAutoAdvancePaused) {
        clearTimeout(autoAdvanceTimer);
        clearInterval(autoAdvanceInterval);
        // remainingAutoAdvanceTime はタイマーバー更新時に保存されている
        if (pauseResumeButton) {
            pauseResumeButton.textContent = '再開';
        }
        if (timerBar) { // タイマーバーのアニメーションを即座に停止させる
            const currentWidth = timerBar.style.width;
            timerBar.style.transition = 'none';
            timerBar.style.width = currentWidth;
        }
    } else {
        if (remainingAutoAdvanceTime > 0) {
            if (pauseResumeButton) pauseResumeButton.textContent = '一時停止';
            
            // setTimeout を残り時間で再開
            autoAdvanceTimer = setTimeout(loadNextQuestion, remainingAutoAdvanceTime);
            
            // setInterval (タイマーバー) を残り時間から再開
            if (timerBar && timerBarContainer.style.display === 'block') {
                timerBar.style.transition = `width ${remainingAutoAdvanceTime / 1000}s linear`;
                // requestAnimationFrame(() => { // 描画更新後に幅を変更
                    timerBar.style.width = '0%';
                // });
                 startAutoAdvanceInterval(true); // isResuming = true で残り時間からインターバル開始
            }
        } else { // 残り時間がない場合は何もしないか、次の問題へ (現在のロジックではloadNextQuestionが呼ばれる)
             if (pauseResumeButton) pauseResumeButton.textContent = '一時停止'; // 念のため
        }
    }
}

function resetAutoAdvanceState() {
    clearTimeout(autoAdvanceTimer);
    clearInterval(autoAdvanceInterval);
    isAutoAdvancePaused = false;
    remainingAutoAdvanceTime = AUTO_ADVANCE_DELAY; // デフォルト遅延時間に戻す
    if (pauseResumeButton) {
        pauseResumeButton.textContent = '一時停止';
        pauseResumeButton.style.display = 'none'; // デフォルトは非表示
    }
    if (timerBarContainer) timerBarContainer.style.display = 'none';
    if (timerBar) {
        timerBar.style.transition = 'width 0.1s linear'; // 通常の遷移（瞬時更新用）
        timerBar.style.width = '100%'; // 非表示時のデフォルト
    }
}

function startAutoAdvanceInterval(isResumingFromPause = false) {
    clearInterval(autoAdvanceInterval); 

    let timeLeft = isResumingFromPause ? remainingAutoAdvanceTime : AUTO_ADVANCE_DELAY;
    
    if (timerBar) { // タイマーバーの初期状態を設定
        if (isResumingFromPause) {
            // 再開時は現在の残り時間に基づいてバーの幅を設定し、そこから減少アニメーション
             timerBar.style.transition = 'none'; // 一旦アニメーションを切り、
             timerBar.style.width = `${(timeLeft / AUTO_ADVANCE_DELAY) * 100}%`; // 現在の割合に設定
             requestAnimationFrame(() => { // DOM更新を待ってからアニメーション再開
                timerBar.style.transition = `width ${timeLeft / 1000}s linear`;
                timerBar.style.width = '0%';
             });
        } else {
            // 新規開始時は100%から0%へアニメーション
            timerBar.style.transition = 'none';
            timerBar.style.width = '100%';
            requestAnimationFrame(() => {
                timerBar.style.transition = `width ${AUTO_ADVANCE_DELAY / 1000}s linear`;
                timerBar.style.width = '0%';
            });
        }
    }

    remainingAutoAdvanceTime = timeLeft; // 残り時間を初期化または設定

    autoAdvanceInterval = setInterval(() => {
        if (isAutoAdvancePaused) {
            return; // 一時停止中は何もしない
        }
        timeLeft -= 100;
        remainingAutoAdvanceTime = Math.max(0, timeLeft); // 残り時間を更新 (0未満にならないように)

        // タイマーバーの視覚的更新はCSSアニメーションに任せるので、ここでは不要
        // const percentageLeft = (remainingAutoAdvanceTime / AUTO_ADVANCE_DELAY) * 100;
        // if (timerBar) timerBar.style.width = `${Math.max(0, percentageLeft)}%`;

        if (remainingAutoAdvanceTime <= 0) {
            clearInterval(autoAdvanceInterval);
        }
    }, 100);
}
// ▲▲▲ 自動送り一時停止/再開関連の関数 ▲▲▲


// --- 関数の定義 ---
function formatYearForDisplay(year) { if (year === 'すべて' || year === null || typeof year === 'undefined') return 'すべての年度'; const numericYear = parseInt(year.toString(), 10); if (isNaN(numericYear)) return year.toString(); if (numericYear >= 2019) { return `令和${numericYear - 2018}年 (${numericYear})`; } else if (numericYear >= 1989) { return `平成${numericYear - 1988}年 (${numericYear})`; } return `${numericYear}年度`; }
function goToHome() {
    resetAutoAdvanceState(); // ▼修正
    switchView(quizContentArea, selectionArea);
    // ... (goToHomeの残りの処理)
}
function handleRestartSameQuiz() {
    resetAutoAdvanceState(); // ▼修正
    if (currentQuizQuestions.length === 0) { goToHome(); return; }
    // ... (handleRestartSameQuizの残りの処理)
}
function populateSelectors() { if (!yearButtonsContainer || !categoryButtonsContainer || !startQuizButton) return; yearButtonsContainer.innerHTML = ''; categoryButtonsContainer.innerHTML = ''; if (typeof allQuizData === 'undefined' || allQuizData.length === 0) { console.warn("クイズデータが空または未定義です。"); yearButtonsContainer.textContent = '年度データなし'; categoryButtonsContainer.textContent = '分野データなし'; startQuizButton.disabled = true; return; } startQuizButton.disabled = false; const years = ['すべて', ...new Set(allQuizData.map(q => q.year))].sort((a, b) => (a === 'すべて' ? -1 : b === 'すべて' ? 1 : Number(b) - Number(a))); const categories = ['すべて', ...new Set(allQuizData.map(q => q.category))].sort((a, b) => (a === 'すべて' ? -1 : b === 'すべて' ? 1 : String(a).localeCompare(String(b), 'ja'))); years.forEach(year => { const button = document.createElement('button'); button.textContent = formatYearForDisplay(year.toString()); button.dataset.year = year.toString(); button.className = 'year-button'; if (year.toString() === selectedYearValue) { button.classList.add('selected'); } button.addEventListener('click', () => { yearButtonsContainer.querySelectorAll('.year-button').forEach(btn => btn.classList.remove('selected')); button.classList.add('selected'); selectedYearValue = button.dataset.year; }); yearButtonsContainer.appendChild(button); }); categories.forEach(category => { const button = document.createElement('button'); button.textContent = category === 'すべて' ? 'すべて' : category; button.dataset.category = category; button.className = 'category-button'; if (category === selectedCategoryValue) { button.classList.add('selected'); } button.addEventListener('click', () => { categoryButtonsContainer.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('selected')); button.classList.add('selected'); selectedCategoryValue = category; }); categoryButtonsContainer.appendChild(button); }); }
function handleStartQuiz(isResuming = false) {
    resetAutoAdvanceState(); // ▼修正
    if (isResuming) { const progress = loadQuizProgress(); if (progress) { selectedYearValue = progress.selectedYear; selectedCategoryValue = progress.selectedCategory; currentQuestionIndex = progress.currentQuestionIndex; userAnswers = progress.userAnswers; score = progress.score; currentQuizQuestions = progress.currentQuizQuestions; currentSetYear = progress.currentSetYear; currentSetCategory = progress.currentSetCategory; currentSetScore = progress.currentSetScore; currentSetAttempted = progress.currentSetAttempted; updateYearButtonSelection(selectedYearValue); updateCategoryButtonSelection(selectedCategoryValue); } else { alert('保存されたデータが見つかりませんでした。新しくクイズを開始します。'); isResuming = false; } } if (!isResuming) { if (typeof allQuizData === 'undefined' || allQuizData.length === 0) { alert('クイズデータを読み込めませんでした。'); return; } currentQuizQuestions = allQuizData.filter(q => { const yearMatch = (selectedYearValue === 'すべて' || q.year.toString() === selectedYearValue); const categoryMatch = (selectedCategoryValue === 'すべて' || q.category === selectedCategoryValue); return yearMatch && categoryMatch; }); currentQuizQuestions.sort((a, b) => { if (a.year !== b.year) return a.year - b.year; const categoryOrder = ["衛生法規", "公衆衛生学", "栄養学", "食品学", "食品衛生学", "製菓理論", "製菓実技(和菓子)", "製菓実技(洋菓子)", "製菓実技(製パン)"]; const indexA = categoryOrder.indexOf(a.category); const indexB = categoryOrder.indexOf(b.category); if (indexA !== -1 && indexB !== -1) return indexA - indexB; return a.category.localeCompare(b.category); }); if (currentQuizQuestions.length === 0) { alert('選択された条件に該当する問題がありません。別の条件をお試しください。'); return; } currentQuestionIndex = 0; score = 0; userAnswers = new Array(currentQuizQuestions.length).fill(null); currentSetScore = 0; currentSetAttempted = 0; } if (currentQuizQuestions.length > 0 && currentQuizQuestions[currentQuestionIndex]) { currentSetYear = currentQuizQuestions[currentQuestionIndex].year; currentSetCategory = currentQuizQuestions[currentQuestionIndex].category; } else if (currentQuizQuestions.length > 0) { currentSetYear = currentQuizQuestions[0].year; currentSetCategory = currentQuizQuestions[0].category; } else { currentSetYear = null; currentSetCategory = null; } switchView(selectionArea, quizContentArea); if (resultsArea) resultsArea.style.display = 'none'; if (navigationArea) navigationArea.style.display = 'flex'; if (nextQuestionButton) { nextQuestionButton.textContent = '次の問題へ'; nextQuestionButton.style.display = 'none'; } if (prevQuestionButton) prevQuestionButton.disabled = true; if (creditText) creditText.style.display = 'none'; updateFavoriteButtonIcon(); loadQuestion(true); }

function loadQuestion(isFirstLoadOrPrevious = false) {
    resetAutoAdvanceState(); // ▼修正: タイマー関連の状態をリセット

    if (!optionsContainer || !feedbackTextElement || !explanationTextElement || !questionInfoElement || !questionTextElement || !nextQuestionButton || !prevQuestionButton || !questionDetailsWrapper || !favoriteButton) {
        console.error("One or more DOM elements for quiz question display are missing in loadQuestion.");
        return;
    }
    // ... (既存のloadQuestion処理) ...
    const userAnswerInfo = userAnswers[currentQuestionIndex];
    // ... (オプションボタン生成) ...
    if (userAnswerInfo) { // 解答済みの場合
        feedbackTextElement.textContent = userAnswerInfo.isCorrect ? '正解！' : '不正解...';
        feedbackTextElement.classList.add(userAnswerInfo.isCorrect ? 'feedback-text-correct' : 'feedback-text-incorrect', 'feedback-animation');
        explanationTextElement.textContent = `解説: ${currentQuestion.explanation || "解説はありません。"}`;
        explanationTextElement.classList.add('feedback-animation');
        
        if (pauseResumeButton) pauseResumeButton.style.display = 'inline-flex'; // ▼追加: 一時停止ボタン表示
        isAutoAdvancePaused = false; // 新しい問題なので一時停止は解除
        if (pauseResumeButton) pauseResumeButton.textContent = '一時停止';

        if(timerBarContainer && timerBar) {
            timerBarContainer.style.display = 'block';
            startAutoAdvanceInterval(); // タイマーバー更新開始 (残り時間はAUTO_ADVANCE_DELAY)
        }
        autoAdvanceTimer = setTimeout(loadNextQuestion, AUTO_ADVANCE_DELAY); // 自動送りタイマー開始
    } else {
        // 未解答の場合は一時停止ボタンなどを非表示 (resetAutoAdvanceStateで対応済み)
    }
    // ... (既存のloadQuestion処理) ...
}

function loadPreviousQuestion() { 
    resetAutoAdvanceState(); // ▼修正
    if (currentQuestionIndex > 0) { currentQuestionIndex--; loadQuestion(true); } 
}

function selectAnswer(selectedOption, correctAnswer, explanation) {
    // resetAutoAdvanceState(); は loadQuestion() の冒頭で呼ばれるのでここでは不要
    if (userAnswers[currentQuestionIndex] !== null) return; 
    const isCorrect = selectedOption === correctAnswer; 
    userAnswers[currentQuestionIndex] = { selected: selectedOption, isCorrect: isCorrect }; 
    if (isCorrect) { score++; currentSetScore++; if (correctSound) correctSound(); } else { if (incorrectSound) incorrectSound(); } 
    currentSetAttempted++; 
    saveQuizProgress(); 
    loadQuestion(); 
}
function updateScoreDisplay() { if (scoreTextElement) { const answeredCount = userAnswers.filter(ans => ans !== null).length; scoreTextElement.textContent = `スコア: ${score} / ${answeredCount}`; } }

function loadNextQuestion() {
    resetAutoAdvanceState(); // ▼修正
    if (currentQuestionIndex < currentQuizQuestions.length - 1) { 
        currentQuestionIndex++; 
        loadQuestion(); 
    } else { 
        showResults(); 
    } 
}

function showResults() {
    resetAutoAdvanceState(); // ▼修正
    switchView(quizContentArea, resultsArea);
    // ... (showResultsの残りの処理)
}

// ... (残りの関数 triggerConfetti, checkResumeButton, etc. は変更なし) ...
// --- 初期化 ---
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme(); 
    const savedMuteState = localStorage.getItem('quizMuted');
    if (savedMuteState !== null) isMuted = JSON.parse(savedMuteState);
    updateMuteButtonIcon();
    initializeAudio(); 
    favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

    populateSelectors();
    checkResumeButton();
    displayFeaturedQuestions();
    resetAutoAdvanceState(); // ▼追加: 初期状態でタイマー関連をリセット

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