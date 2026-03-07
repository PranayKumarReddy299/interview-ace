import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain } from "lucide-react";

const ForgotPassword = () => {
  const [step, setStep] = useState<"email" | "otp" | "done">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Enter your email"); return; }
    setLoading(true); setError("");
    try {
      const code = await forgotPassword(email);
      setDevOtp(code);
      setStep("otp");
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) { setError("Enter a valid 6-digit OTP"); return; }
    if (newPassword.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true); setError("");
    try {
      await resetPassword(email, otp, newPassword);
      setStep("done");
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2 font-display text-2xl font-bold text-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          SmartPrep
        </Link>
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          {step === "email" && (
            <>
              <h1 className="mb-1 font-display text-2xl font-bold text-card-foreground">Forgot password?</h1>
              <p className="mb-6 text-sm text-muted-foreground">Enter your email to receive a reset code</p>
              {error && <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1" /></div>
                <Button type="submit" disabled={loading} className="w-full gradient-primary text-primary-foreground shadow-primary hover:opacity-90">
                  {loading ? "Sending..." : "Send Reset Code"}
                </Button>
              </form>
            </>
          )}
          {step === "otp" && (
            <>
              <h1 className="mb-1 font-display text-2xl font-bold text-card-foreground">Reset password</h1>
              <p className="mb-2 text-sm text-muted-foreground">Enter the code sent to {email}</p>
              {devOtp && <div className="mb-4 rounded-lg bg-info/10 p-3 text-sm text-info">Demo OTP: <strong>{devOtp}</strong></div>}
              {error && <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
              <form onSubmit={handleReset} className="space-y-4">
                <Input type="text" maxLength={6} placeholder="6-digit code" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ""))} className="text-center text-2xl tracking-[0.5em] font-mono" />
                <div><Label>New Password</Label><Input type="password" placeholder="Min 6 characters" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="mt-1" /></div>
                <Button type="submit" disabled={loading} className="w-full gradient-primary text-primary-foreground shadow-primary hover:opacity-90">
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            </>
          )}
          {step === "done" && (
            <div className="text-center">
              <h1 className="mb-2 font-display text-2xl font-bold text-card-foreground">Password reset!</h1>
              <p className="mb-6 text-sm text-muted-foreground">You can now sign in with your new password.</p>
              <Button onClick={() => navigate("/login")} className="gradient-primary text-primary-foreground shadow-primary hover:opacity-90">Go to Login</Button>
            </div>
          )}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link to="/login" className="font-medium text-primary hover:underline">Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
