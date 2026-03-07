const PROGRESS_KEY = "sip_progress";

export interface ProgressData {
  quizzesTaken: number;
  interviewSessions: number;
  totalScore: number;
  totalQuestions: number;
  history: { date: string; score: number; type: "quiz" | "interview"; role: string }[];
}

export const getProgress = (userId: string): ProgressData => {
  try {
    const all = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
    return all[userId] || { quizzesTaken: 0, interviewSessions: 0, totalScore: 0, totalQuestions: 0, history: [] };
  } catch {
    return { quizzesTaken: 0, interviewSessions: 0, totalScore: 0, totalQuestions: 0, history: [] };
  }
};

export const saveQuizResult = (userId: string, score: number, total: number, role: string) => {
  const all = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
  const data = all[userId] || { quizzesTaken: 0, interviewSessions: 0, totalScore: 0, totalQuestions: 0, history: [] };
  data.quizzesTaken += 1;
  data.totalScore += score;
  data.totalQuestions += total;
  data.history.push({ date: new Date().toISOString(), score: Math.round((score / total) * 100), type: "quiz", role });
  all[userId] = data;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
};

export const saveInterviewSession = (userId: string, role: string) => {
  const all = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
  const data = all[userId] || { quizzesTaken: 0, interviewSessions: 0, totalScore: 0, totalQuestions: 0, history: [] };
  data.interviewSessions += 1;
  data.history.push({ date: new Date().toISOString(), score: 100, type: "interview", role });
  all[userId] = data;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
};
