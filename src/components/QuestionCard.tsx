import { useState } from "react";
import { InterviewQuestion } from "@/services/interviewData";
import { ChevronDown, ChevronUp, CheckCircle2, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  question: InterviewQuestion;
  index: number;
}

const categoryColors: Record<string, string> = {
  technical: "bg-primary/10 text-primary",
  hr: "bg-secondary/10 text-secondary",
  coding: "bg-success/10 text-success",
};

const QuestionCard = ({ question, index }: Props) => {
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-xl border bg-card p-5 shadow-card transition-all ${completed ? "border-success/30 bg-success/5" : "border-border"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[question.category]}`}>
              <Tag className="h-3 w-3" />
              {question.category.toUpperCase()}
            </span>
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground capitalize">
              {question.difficulty}
            </span>
          </div>
          <h3 className="font-display text-base font-semibold text-card-foreground">{question.question}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCompleted(!completed)}
            className={`rounded-full p-1 transition-colors ${completed ? "text-success" : "text-muted-foreground hover:text-foreground"}`}
          >
            <CheckCircle2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <button
        onClick={() => setRevealed(!revealed)}
        className="mt-3 flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        {revealed ? "Hide Answer" : "Reveal Answer"}
        {revealed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-3 rounded-lg bg-accent/50 p-4 text-sm leading-relaxed text-accent-foreground">
              {question.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionCard;
