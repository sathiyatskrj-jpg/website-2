"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Trophy, Users, MapPin, Calendar, Award, ChevronLeft, Download, Share2 } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface Player {
  id: string;
  name: string;
  fide_id: string | null;
  rating: number | null;
  district: string | null;
  title: string | null;
  dob: string | null;
  club: string | null;
  photo: string | null;
  created_at: string;
}

const TITLE_COLORS: Record<string, string> = {
  GM: "bg-yellow-100 text-yellow-800 border-yellow-200",
  IM: "bg-blue-100 text-blue-800 border-blue-200",
  FM: "bg-green-100 text-green-800 border-green-200",
  CM: "bg-purple-100 text-purple-800 border-purple-200",
  WGM: "bg-pink-100 text-pink-800 border-pink-200",
  WIM: "bg-indigo-100 text-indigo-800 border-indigo-200",
  WFM: "bg-teal-100 text-teal-800 border-teal-200",
  WCM: "bg-orange-100 text-orange-800 border-orange-200",
};

export default function PlayerProfilePage() {
  const params = useParams();
  const id = params.id as string;
  
  const [player, setPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayer() {
      if (!id) return;
      
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("players")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setPlayer(data);
      }
      setIsLoading(false);
    }
    fetchPlayer();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-muted-foreground animate-pulse">Loading player profile...</p>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Player Not Found</h2>
        <p className="text-muted-foreground mb-8">The requested player profile could not be found or has been removed.</p>
        <Link href="/players" className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
          Return to Directory
        </Link>
      </div>
    );
  }

  // Calculate age if DOB exists
  let age = "N/A";
  if (player.dob) {
      const birthDate = new Date(player.dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          calculatedAge--;
      }
      age = calculatedAge.toString();
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/30">
        <section className="bg-primary text-primary-foreground py-6 border-b-4 border-secondary">
            <div className="container mx-auto px-4">
                <Link href="/players" className="inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-white mb-4 transition-colors">
                    <ChevronLeft className="h-4 w-4" /> Back to Directory
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black font-poppins uppercase tracking-wide flex items-center gap-3">
                            {player.name}
                        </h1>
                        <p className="text-primary-foreground/80 mt-2 text-sm md:text-base">
                            Registered ANCA Player Profile
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section className="container mx-auto px-4 py-10 flex-1">
            <div className="max-w-4xl mx-auto">
                {/* ID Card Display */}
                <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden relative">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                    
                    {/* Card Header */}
                    <div className="px-8 py-6 border-b border-border flex justify-between items-center bg-muted/50">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                                <Award className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground font-poppins text-lg">Official ANCA Digital ID</h3>
                                <p className="text-xs text-muted-foreground uppercase tracking-widest">{player.fide_id || 'ID Pending'}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 border border-border rounded-md hover:bg-muted text-muted-foreground transition-colors hidden sm:block" title="Share via link">
                                <Share2 className="h-4 w-4" />
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-md hover:bg-primary/90 transition-colors">
                                <Download className="h-4 w-4" /> <span className="hidden sm:inline">Save Card</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-8 grid md:grid-cols-12 gap-8">
                        {/* Avatar */}
                        <div className="md:col-span-4 flex flex-col items-center justify-center border-r-0 md:border-r border-border pb-8 md:pb-0 pr-0 md:pr-8">
                            <div className="w-40 h-40 rounded-full bg-muted border-4 border-background shadow-inner flex items-center justify-center overflow-hidden mb-4 relative z-10">
                                {player.photo ? (
                                    <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                                ) : (
                                    <Users className="h-16 w-16 text-muted-foreground/30" />
                                )}
                            </div>
                            {player.title && (
                                <span className={`px-4 py-1 text-sm font-black rounded uppercase tracking-wider border mb-4 shadow-sm ${TITLE_COLORS[player.title] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                                    {player.title}
                                </span>
                            )}
                            <div className="text-center w-full bg-primary/5 rounded-lg p-3 border border-primary/10">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Standard Rating</p>
                                <p className="text-3xl font-black text-primary flex items-center justify-center gap-2">
                                    <Trophy className="h-5 w-5 text-secondary" /> {player.rating || 'Unrated'}
                                </p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="md:col-span-8 flex flex-col justify-center">
                            <div className="grid sm:grid-cols-2 gap-y-6 gap-x-8">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Full Name</p>
                                    <p className="font-bold text-foreground text-lg">{player.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">FIDE ID</p>
                                    <p className="font-mono font-medium text-foreground text-lg">{player.fide_id || 'Not Assigned'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">District Association</p>
                                    <p className="font-medium text-foreground flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" /> {player.district || 'Unassigned'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Club / Academy</p>
                                    <p className="font-medium text-foreground flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" /> {player.club || 'Independent'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Age</p>
                                    <p className="font-medium text-foreground flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" /> {age} {age !== "N/A" && "years"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span> Active
                                    </span>
                                </div>
                            </div>
                            
                            {/* Stats or Recent matches placeholder */}
                            <div className="mt-8 pt-6 border-t border-border">
                                <p className="text-sm text-muted-foreground italic">Match history parsing is currently disabled. Check FIDE profile for classical history.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
}
