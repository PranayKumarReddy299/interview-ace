import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { generateQuiz, getRoles } from "@/services/interviewData";
import { saveQuizResult } from "@/services/progressStore";
import type { QuizQuestion } from "@/services/interviewData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Target, CheckCircle2, XCircle, Trophy } from "lucide-react";

const Quiz = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [phase, setPhase] = useState<"setup" | "quiz" | "results">("setup");

  const startQuiz = () => {
    if (!role) return;
    const q = generateQuiz(role);
    setQuestions(q);
    setAnswers(new Array(q.length).fill(null));
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setPhase("quiz");
  };

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setShowResult(false);
    setSelected(null);

    if (current + 1 >= questions.length) {
      const score = newAnswers.filter((a, i) => a === questions[i].correctIndex).length;
      if (user) saveQuizResult(user.id, score, questions.length, role);
      setAnswers(newAnswers);
      setPhase("results");
    } else {
      setCurrent(current + 1);
    }
  };

  const handleCheck = () => {
    setShowResult(true);
  };

  const score = answers.filter((a, i) => a === questions[i]?.correctIndex).length;
  const q = questions[current];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-foreground">Quiz Mode</h1>
        <p className="mt-1 text-muted-foreground">Test your interview knowledge</p>
      </motion.div>

      {phase === "setup" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mx-auto mt-8 max-w-lg rounded-2xl border border-border bg-card p-8 shadow-card"
        >
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary animate-pulse-glow">
              <Target className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Select Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Choose a role" /></SelectTrigger>
                <SelectContent>
                  {getRoles().map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={startQuiz} disabled={!role} className="w-full gradient-primary text-primary-foreground shadow-primary hover:opacity-90">
              Start Quiz
            </Button>
          </div>
        </motion.div>
      )}

      {phase === "quiz" && q && (
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="mx-auto mt-8 max-w-2xl">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Question {current + 1} of {questions.length}</span>
            <div className="h-2 flex-1 mx-4 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full gradient-primary transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="mb-6 font-display text-lg font-semibold text-card-foreground">{q.question}</h2>
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                let cls = "border-border hover:border-primary/50 cursor-pointer";
                if (selected === i && !showResult) cls = "border-primary bg-accent";
                if (showResult && i === q.correctIndex) cls = "border-success bg-success/10";
                if (showResult && selected === i && i !== q.correctIndex) cls = "border-destructive bg-destructive/10";
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`w-full rounded-xl border p-4 text-left text-sm transition-all ${cls}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-card-foreground">{opt}</span>
                      {showResult && i === q.correctIndex && <CheckCircle2 className="ml-auto h-5 w-5 text-success" />}
                      {showResult && selected === i && i !== q.correctIndex && <XCircle className="ml-auto h-5 w-5 text-destructive" />}
                    </div>
                  </button>
                );
              })}
            </div>
            {showResult && (
              <div className="mt-4 rounded-lg bg-accent/50 p-4 text-sm text-accent-foreground">
                <strong>Explanation:</strong> {q.explanation}
              </div>
            )}
            <div className="mt-6 flex gap-3">
              {!showResult ? (
                <Button onClick={handleCheck} disabled={selected === null} className="gradient-primary text-primary-foreground shadow-primary hover:opacity-90">
                  Check Answer
                </Button>
              ) : (
                <Button onClick={handleNext} className="gradient-primary text-primary-foreground shadow-primary hover:opacity-90">
                  {current + 1 >= questions.length ? "See Results" : "Next Question"}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {phase === "results" && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto mt-8 max-w-lg">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-primary">
                <Trophy className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
            <h2 className="font-display text-2xl font-bold text-card-foreground">Quiz Complete!</h2>
            <p className="mt-2 text-4xl font-bold text-gradient">{score}/{questions.length}</p>
            <p className="mt-1 text-muted-foreground">{Math.round((score / questions.length) * 100)}% accuracy</p>
            <div className="mt-6 flex gap-3 justify-center">
              <Button onClick={() => { setPhase("setup"); setRole(""); }} variant="outline">New Quiz</Button>
              <Button onClick={startQuiz} className="gradient-primary text-primary-foreground shadow-primary hover:opacity-90">Retry</Button>
            </div>
          </div>

          {/* Review */}
          <div className="mt-6 space-y-3">
            {questions.map((q, i) => (
              <div key={q.id} className={`rounded-xl border p-4 ${answers[i] === q.correctIndex ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"}`}>
                <div className="flex items-start gap-2">
                  {answers[i] === q.correctIndex ? <CheckCircle2 className="mt-0.5 h-5 w-5 text-success shrink-0" /> : <XCircle className="mt-0.5 h-5 w-5 text-destructive shrink-0" />}
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{q.question}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Correct: {q.options[q.correctIndex]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;
