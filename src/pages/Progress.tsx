import { useAuth } from "@/contexts/AuthContext";
import { getProgress } from "@/services/progressStore";
import { motion } from "framer-motion";
import { BarChart3, Target, Brain, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Progress = () => {
  const { user } = useAuth();
  const progress = getProgress(user?.id || "");
  const accuracy = progress.totalQuestions > 0 ? Math.round((progress.totalScore / progress.totalQuestions) * 100) : 0;

  const chartData = progress.history.map((h, i) => ({
    name: `#${i + 1}`,
    score: h.score,
    date: new Date(h.date).toLocaleDateString(),
  }));

  const stats = [
    { icon: Target, label: "Quizzes Taken", value: progress.quizzesTaken },
    { icon: Brain, label: "Interview Sessions", value: progress.interviewSessions },
    { icon: BarChart3, label: "Accuracy", value: `${accuracy}%` },
    { icon: TrendingUp, label: "Total Questions", value: progress.totalQuestions },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-foreground">Progress Tracker</h1>
        <p className="mt-1 text-muted-foreground">Track your interview preparation journey</p>
      </motion.div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border bg-card p-5 shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                <s.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card"
      >
        <h2 className="mb-4 font-display text-lg font-semibold text-card-foreground">Improvement Over Time</h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 88%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(225, 10%, 45%)" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="hsl(225, 10%, 45%)" />
              <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(225, 15%, 88%)" }} />
              <Line type="monotone" dataKey="score" stroke="hsl(235, 70%, 55%)" strokeWidth={2} dot={{ fill: "hsl(235, 70%, 55%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-48 items-center justify-center text-muted-foreground">
            Complete some quizzes or practice sessions to see your progress chart.
          </div>
        )}
      </motion.div>

      {/* History */}
      {progress.history.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Activity History</h2>
          <div className="space-y-2">
            {progress.history.slice().reverse().map((h, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${h.type === "quiz" ? "bg-primary" : "bg-secondary"}`} />
                  <span className="text-sm text-card-foreground capitalize">{h.type}</span>
                  <span className="text-xs text-muted-foreground">— {h.role}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-card-foreground">{h.score}%</span>
                  <span className="text-xs text-muted-foreground">{new Date(h.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Progress;
