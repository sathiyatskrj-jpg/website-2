"use client";

import { Crown, Target, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const committee = [
    { name: "Dr. Chess Master", role: "President", photo: "https://ui-avatars.com/api/?name=Dr+Chess+Master&size=200&background=random" },
    { name: "Shri ANCA Admin", role: "Vice President", photo: "https://ui-avatars.com/api/?name=Shri+ANCA&size=200&background=random" },
    { name: "Mr. Island King", role: "Secretary", photo: "https://ui-avatars.com/api/?name=Island+King&size=200&background=random" },
    { name: "Mrs. Board Queen", role: "Treasurer", photo: "https://ui-avatars.com/api/?name=Board+Queen&size=200&background=random" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-16 bg-chess-pattern relative">
        <div className="absolute inset-0 bg-primary/95 flex items-center justify-center"></div>
        <div className="container relative mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black font-poppins mb-4"
          >
            About ANCA
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-primary-foreground/80 max-w-2xl mx-auto"
          >
            Discover the rich history, visionary mission, and the dedicated team driving chess development in the Andaman & Nicobar Islands.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
            className="grid md:grid-cols-2 gap-12"
          >
            <motion.div 
              variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              className="bg-muted p-8 rounded-2xl border border-border transition-all"
            >
              <div className="h-12 w-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold font-poppins mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To identify, nature, and elevate chess talent across all islands of Andaman & Nicobar, providing world-class infrastructure, regular tournaments, and top-tier coaching to help our players achieve national and international excellence.
              </p>
            </motion.div>
            <motion.div 
              variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              className="bg-muted p-8 rounded-2xl border border-border transition-all"
            >
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Crown className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold font-poppins mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To make the Andaman & Nicobar Islands a premier hub for chess in India, fostering a culture of strategic thinking, discipline, and intellectual growth among the youth.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold font-poppins mb-6">History of Chess in A&N Islands</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Andaman and Nicobar Chess Association (ANCA) was established with the sole purpose of formalizing the sport in the islands. Over the decades, we have evolved from organizing small local club matches to hosting prestigious state and national-level tournaments. Our affiliation with the All India Chess Federation (AICF) has opened doors for our players to compete on global platforms, obtaining FIDE ratings and prestigious titles.
          </p>
        </div>
      </section>

      {/* Executive Committee */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Users className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold font-poppins mb-4">Executive Committee</h2>
            <p className="text-muted-foreground">The leaders actively working behind the scenes to promote chess.</p>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {}
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {committee.map((member, i) => (
              <motion.div 
                key={i} 
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                whileHover={{ y: -10 }}
                className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="aspect-square relative overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold font-poppins text-lg">{member.name}</h3>
                  <p className="text-secondary font-medium text-sm mt-1">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
