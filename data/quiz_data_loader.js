// data/quiz_data_loader.js
// 各年度のデータファイルをインポートし、一つの配列にまとめます。

// ファイル名とエクスポート名を変更
import { quizDataR6 } from './data_r6.js';   // 令和6年 (2024年)
import { quizDataR5 } from './data_r5.js';   // 令和5年 (2023年)
import { quizDataR4 } from './data_r4.js';   // 令和4年 (2022年)
import { quizDataR3 } from './data_r3.js';   // 令和3年 (2021年)
import { quizDataR2 } from './data_r2.js';   // 令和2年 (2020年)
// 他の年度のデータも同様にインポート (例: data_h31.js / data_r1.js など)
// import { quizDataR1 } from './data_r1.js'; // 平成31年/令和元年 (2019年)

export const allQuizData = [
    ...(quizDataR6 || []),
    ...(quizDataR5 || []),
    ...(quizDataR4 || []),
    ...(quizDataR3 || []), // 令和3年度のデータを追加
    ...(quizDataR2 || []), // 令和2年度のデータを追加
    // ...(quizDataR1 || []),
].filter(q => q && q.question); // 有効な問題データのみフィルタリング

// データが正しくロードされたか確認（開発用コメント）
// console.log("Loaded allQuizData with Reiwa year filenames (up to R2):", allQuizData);
