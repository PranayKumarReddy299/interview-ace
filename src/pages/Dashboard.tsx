import { useAuth } from "@/contexts/AuthContext";
import { getProgress } from "@/services/progressStore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Target, BarChart3, TrendingUp, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const progress = getProgress(user?.id || "");
  const accuracy = progress.totalQuestions > 0 ? Math.round((progress.totalScore / progress.totalQuestions) * 100) : 0;

  const stats = [
    { icon: Target, label: "Quizzes Taken", value: progress.quizzesTaken, color: "gradient-primary" },
    { icon: Brain, label: "Interview Sessions", value: progress.interviewSessions, color: "gradient-primary" },
    { icon: BarChart3, label: "Accuracy Score", value: `${accuracy}%`, color: "gradient-primary" },
    { icon: TrendingUp, label: "Total Questions", value: progress.totalQuestions, color: "gradient-primary" },
  ];

  const quickActions = [
    { to: "/interview", label: "Practice Interview", desc: "AI-generated questions for your role", icon: Brain },
    { to: "/quiz", label: "Take a Quiz", desc: "Test your knowledge with MCQs", icon: Target },
    { to: "/progress", label: "View Progress", desc: "Track your improvement over time", icon: BarChart3 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Welcome back, <span className="text-gradient">{user?.name?.split(" ")[0]}</span>
        </h1>
        <p className="mt-1 text-muted-foreground">Ready to sharpen your interview skills?</p>
      </motion.div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border bg-card p-5 shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
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

      {/* Quick Actions */}
      <h2 className="mt-10 mb-4 font-display text-xl font-semibold text-foreground">Quick Actions</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {quickActions.map((a, i) => (
          <motion.div key={a.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
            <Link
              to={a.to}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-elevated hover:border-primary/30"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-primary">
                <a.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-card-foreground">{a.label}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      {progress.history.length > 0 && (
        <>
          <h2 className="mt-10 mb-4 font-display text-xl font-semibold text-foreground">Recent Activity</h2>
          <div className="space-y-2">
            {progress.history.slice(-5).reverse().map((h, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${h.type === "quiz" ? "bg-primary" : "bg-secondary"}`} />
                  <span className="text-sm text-card-foreground capitalize">{h.type} — {h.role}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-card-foreground">{h.score}%</span>
                  <span className="text-xs text-muted-foreground">{new Date(h.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
