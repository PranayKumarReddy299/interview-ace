import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain } from "lucide-react";

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOTP } = useAuth();
  const email = (location.state as any)?.email || "";
  const devOtp = (location.state as any)?.otp || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) { setError("Please enter a 6-digit OTP"); return; }
    setLoading(true);
    setError("");
    try {
      await verifyOTP(email, otp);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card text-center">
          <h1 className="mb-1 font-display text-2xl font-bold text-card-foreground">Verify your email</h1>
          <p className="mb-2 text-sm text-muted-foreground">We sent a 6-digit code to <strong className="text-foreground">{email}</strong></p>
          {devOtp && (
            <div className="mb-4 rounded-lg bg-info/10 p-3 text-sm text-info">
              Demo OTP: <strong>{devOtp}</strong>
            </div>
          )}
          {error && <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
          <form onSubmit={handleVerify} className="space-y-4">
            <Input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
              className="text-center text-2xl tracking-[0.5em] font-mono"
            />
            <Button type="submit" disabled={loading} className="w-full gradient-primary text-primary-foreground shadow-primary hover:opacity-90">
              {loading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
