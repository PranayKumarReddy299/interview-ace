import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getQuestionsForRole, getRoles, EXPERIENCE_LEVELS } from "@/services/interviewData";
import { saveInterviewSession } from "@/services/progressStore";
import QuestionCard from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

const InterviewPractice = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");
  const [started, setStarted] = useState(false);

  const questions = started ? getQuestionsForRole(role, level) : [];

  const handleStart = () => {
    if (!role || !level) return;
    setStarted(true);
    if (user) saveInterviewSession(user.id, role);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-foreground">Interview Practice</h1>
        <p className="mt-1 text-muted-foreground">Select your role and level to get AI-generated questions</p>
      </motion.div>

      {!started ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mx-auto mt-8 max-w-lg rounded-2xl border border-border bg-card p-8 shadow-card"
        >
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary animate-pulse-glow">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Job Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select a role" /></SelectTrigger>
                <SelectContent>
                  {getRoles().map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Experience Level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select level" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {EXPERIENCE_LEVELS.map(l => <SelectItem key={l} value={l} className="capitalize">{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleStart} disabled={!role || !level} className="w-full gradient-primary text-primary-foreground shadow-primary hover:opacity-90">
              <Sparkles className="mr-2 h-4 w-4" /> Generate Questions
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="mt-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <strong className="text-foreground">{questions.length}</strong> questions for <strong className="text-foreground">{role}</strong> ({level})
            </p>
            <Button variant="outline" size="sm" onClick={() => setStarted(false)}>Change Selection</Button>
          </div>
          <div className="space-y-4">
            {questions.map((q, i) => <QuestionCard key={q.id} question={q} index={i} />)}
          </div>
          {questions.length === 0 && (
            <p className="mt-8 text-center text-muted-foreground">No questions found for this combination. Try a different level.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewPractice;
