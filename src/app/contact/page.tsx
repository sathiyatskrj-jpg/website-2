import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary text-primary-foreground py-16 bg-chess-pattern relative">
        <div className="absolute inset-0 bg-primary/95"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-poppins mb-4">Contact Us</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Get in touch with the Andaman & Nicobar Chess Association for any queries, affiliations, or support.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background flex-1">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold font-poppins mb-6">Offices & Support</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-secondary/20 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Head Office</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mt-1">123 Sports Complex Road,<br />Port Blair, Andaman & Nicobar Islands,<br />India - 744101</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-secondary/20 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Phone Number</h3>
                      <p className="text-muted-foreground text-sm mt-1">+91 99999 99999<br />+91 88888 88888</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-secondary/20 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Email Address</h3>
                      <p className="text-muted-foreground text-sm mt-1">info@ancachess.in<br />support@ancachess.in</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-muted h-64 rounded-xl border border-border flex items-center justify-center">
                 <p className="text-muted-foreground font-medium">Map Embed Placeholder</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border shadow-md rounded-2xl p-8">
              <h2 className="text-2xl font-bold font-poppins mb-6">Send a Message</h2>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Name</label>
                  <input type="text" className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-primary" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input type="email" className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-primary" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <input type="text" className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-primary" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea rows={4} className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-primary" placeholder="Write your message here..."></textarea>
                </div>
                <button type="button" className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 flex justify-center items-center gap-2 mt-4 transition-colors">
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
