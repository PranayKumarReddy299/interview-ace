import { useAuth } from "@/contexts/AuthContext";
import { getProgress } from "@/services/progressStore";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Shield } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const progress = getProgress(user?.id || "");

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-foreground">Profile</h1>
        <p className="mt-1 text-muted-foreground">Your account information</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="mx-auto mt-8 max-w-lg"
      >
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          {/* Avatar */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-primary text-3xl font-bold text-primary-foreground">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="font-medium text-card-foreground">{user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium text-card-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="font-medium text-card-foreground">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Account Status</p>
                <p className="font-medium text-success">Verified</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-card p-4 text-center shadow-card">
            <p className="text-2xl font-bold text-card-foreground">{progress.quizzesTaken}</p>
            <p className="text-xs text-muted-foreground">Quizzes</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center shadow-card">
            <p className="text-2xl font-bold text-card-foreground">{progress.interviewSessions}</p>
            <p className="text-xs text-muted-foreground">Sessions</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center shadow-card">
            <p className="text-2xl font-bold text-card-foreground">
              {progress.totalQuestions > 0 ? Math.round((progress.totalScore / progress.totalQuestions) * 100) : 0}%
            </p>
            <p className="text-xs text-muted-foreground">Accuracy</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
