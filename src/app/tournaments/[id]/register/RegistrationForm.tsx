"use client";

import { CheckCircle2, CreditCard, User, Upload } from "lucide-react";

export function RegistrationForm({ tournamentId }: { tournamentId: string }) {
  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black font-poppins text-primary mb-2">Tournament Registration</h1>
          <p className="text-muted-foreground">Complete the form below to register and pay the entry fee securely.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold font-poppins mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-secondary" /> Player Details
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-primary" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date of Birth</label>
                  <input type="date" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">AICF ID (Optional)</label>
                  <input type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-primary" placeholder="e.g. 12345" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">FIDE ID (Optional)</label>
                  <input type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-primary" placeholder="e.g. 5000000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">FIDE Rating</label>
                  <input type="number" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-primary" placeholder="0 if Unrated" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-primary">
                    <option>Open Category</option>
                    <option>Under 19</option>
                    <option>Under 15</option>
                    <option>Under 11</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium flex items-center justify-between">
                  <span>Payment Proof (Screenshot / PDF)</span>
                  <span className="text-xs text-muted-foreground">Max 2MB</span>
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                </div>
              </div>
            </div>

            {/* Simulated Payment Gateway */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold font-poppins mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-secondary" /> Mock Payment Gateway
              </h2>
              <p className="text-sm text-muted-foreground mb-4">This simulates a Razorpay/Stripe checkout process.</p>
              
              <div className="p-4 bg-muted rounded-lg border border-border">
                 <div className="flex justify-between items-center mb-6">
                    <span className="font-bold">Total Payable</span>
                    <span className="text-2xl font-black text-primary">₹1,000</span>
                 </div>
                 
                 <div className="space-y-3">
                   <button className="w-full py-3 bg-[#3399cc] text-white font-bold rounded-lg hover:bg-[#2b83b0] transition-colors flex justify-center items-center gap-2 shadow-sm" onClick={() => alert("Razorpay UI Triggered!")}>
                     Pay with Razorpay UI
                   </button>
                   <button className="w-full py-3 bg-[#635BFF] text-white font-bold rounded-lg hover:bg-[#5249ea] transition-colors flex justify-center items-center gap-2 shadow-sm" onClick={() => alert("Stripe UI Triggered!")}>
                     Pay with Stripe UI
                   </button>
                   <div className="relative flex py-2 items-center">
                      <div className="flex-grow border-t border-border"></div>
                      <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs uppercase font-medium">or</span>
                      <div className="flex-grow border-t border-border"></div>
                   </div>
                   <button className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors flex justify-center items-center gap-2 shadow-sm" onClick={() => alert("Registration Submitted!")}>
                     <CheckCircle2 className="h-5 w-5 text-secondary" /> Submit Registration manually
                   </button>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Tournament Summary */}
          <div className="space-y-6">
            <div className="bg-primary text-primary-foreground rounded-xl p-6 shadow-lg shadow-primary/20">
              <h3 className="font-bold font-poppins text-lg mb-4 text-secondary border-b border-primary-foreground/20 pb-4">Order Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-primary-foreground/80">Tournament</span>
                  <span className="font-semibold text-right max-w-[150px]">3rd A&N State Chess Championship ({tournamentId})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-foreground/80">Date</span>
                  <span className="font-semibold">15 May 2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-foreground/80">Entry Fee</span>
                  <span className="font-semibold">₹1,000</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-primary-foreground/20">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-xl text-secondary">₹1,000</span>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border p-6 rounded-xl">
               <h3 className="font-bold font-poppins mb-2">Need Help?</h3>
               <p className="text-sm text-muted-foreground mb-4">Contact the organizing committee if you face any issues during registration.</p>
               <p className="text-sm font-medium">📞 +91 99999 99999</p>
               <p className="text-sm font-medium">✉️ support@ancachess.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
