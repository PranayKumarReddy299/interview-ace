import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Brain, Sparkles, BarChart3, Target, ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Questions", desc: "Get tailored interview questions based on your role and experience level." },
  { icon: Target, title: "Interactive Quizzes", desc: "Test your knowledge with multiple-choice quizzes and detailed explanations." },
  { icon: BarChart3, title: "Track Progress", desc: "Monitor your improvement with detailed analytics and accuracy scores." },
  { icon: Sparkles, title: "Smart Feedback", desc: "Receive AI-generated insights to sharpen your interview skills." },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          SmartPrep
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="gradient-primary text-primary-foreground shadow-primary hover:opacity-90">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <Sparkles className="h-4 w-4" /> AI-Powered Interview Prep
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-bold leading-tight text-foreground md:text-6xl">
            Ace Your Next Interview with{" "}
            <span className="text-gradient">Smart Preparation</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Practice with AI-generated questions, take quizzes, track your progress, and build confidence for any interview.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/signup">
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-primary hover:opacity-90 px-8">
                Start Practicing Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="px-8">I have an account</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="mb-12 text-center font-display text-3xl font-bold text-foreground">Everything you need to succeed</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-elevated"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-card-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-2xl gradient-primary p-12 text-center shadow-primary">
          <h2 className="font-display text-3xl font-bold text-primary-foreground">Ready to ace your interview?</h2>
          <p className="mx-auto mt-4 max-w-md text-primary-foreground/80">
            Join thousands of professionals preparing smarter with AI-powered practice.
          </p>
          <Link to="/signup">
            <Button size="lg" className="mt-8 bg-card text-foreground hover:bg-card/90 px-8">
              Get Started — It's Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 SmartPrep. Built for interview success.
      </footer>
    </div>
  );
};

export default Landing;
