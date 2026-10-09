"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  MapPin,
  MessageCircle,
  ExternalLink,
  Send,
  HelpCircle,
  CheckCircle2,
  Clock,
  Building,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { contactSchema, ContactFormData } from "@/lib/validations/contactSchema";
import { COMMUNITY_INFO } from "@/lib/data/initialData";

const FAQS = [
  {
    q: "Is membership in the AWS Student Builder Group free?",
    a: "Yes, 100% free! All campus meetups, study groups, hackathon mentoring sessions, and open workshops organized at PITS Ujjain are free of charge for students.",
  },
  {
    q: "Can non-CSE students (Mechanical, Civil, ECE) participate?",
    a: "Absolutely. Cloud architectures, automated data pipelines, and AI systems are increasingly used across all branches of engineering and technology. Everyone is welcome.",
  },
  {
    q: "Do I need a credit card to learn AWS?",
    a: "AWS Free Tier account creation typically requires a credit or debit card for identity verification. In our campus labs, we guide students through setting up zero-cost AWS Budgets with billing alert alarms to protect against accidental charges.",
  },
  {
    q: "How can I join the organizing Core Team?",
    a: "Head to our 'Join Core Team' recruitment page, review the minimum 7.0 CGPA and technical criteria, and submit your application. We interview candidates on a rolling basis.",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "General Inquiry",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Failed to send message. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      toast.success("Your message has been sent to the organizing team!");
      reset();
    } catch {
      toast.error("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="orange" size="md">
            Get in Touch
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Connect with Community Organizers
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Have questions about workshops, need project guidance, or want to collaborate with the AWS Student Builder Group at Prashanti Institute of Technology &amp; Science?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Channels & Address */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Community Box */}
            <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 via-slate-900/90 to-slate-950 p-6 sm:p-8 backdrop-blur-md space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Official WhatsApp Group
                  </h3>
                  <p className="text-xs text-emerald-400">
                    Fastest way to get community updates
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Join our active student chat for instant workshop alerts, lab links, peer doubt solving, and hackathon team formations.
              </p>

              <a
                href={COMMUNITY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-600/20"
              >
                <span>Join Campus WhatsApp Group</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Campus Info Card */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Building className="w-4 h-4 text-amber-400" />
                <span>Campus Location &amp; Organizing Details</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">
                      {COMMUNITY_INFO.college}
                    </strong>
                    <span>{COMMUNITY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a
                    href={`mailto:${COMMUNITY_INFO.email}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {COMMUNITY_INFO.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Lab meetups: Alternate Saturdays (2:00 PM - 5:00 PM)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                Group Leader: <strong className="text-white">{COMMUNITY_INFO.leaderName}</strong>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
              <div className="space-y-2 mb-6">
                <h2 className="text-xl font-bold text-white">
                  Send an Inquiry to the Organizing Team
                </h2>
                <p className="text-xs text-slate-400">
                  Fill in the details below and a Core Team member will get back to you within 24 to 48 hours.
                </p>
              </div>

              {isSuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Thank you for reaching out. We have received your query and will reply via email shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSuccess(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        Your Name *
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="e.g. Rohan Sharma"
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-700/80 bg-slate-950/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        Email Address *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="your.email@pitsujjain.ac.in"
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-700/80 bg-slate-950/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        Category
                      </label>
                      <select
                        {...register("category")}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-700/80 bg-slate-950/80 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Event Registration">Event Registration Query</option>
                        <option value="Core Team Recruitment">Core Team Recruitment</option>
                        <option value="Project Collaboration">Project Collaboration</option>
                        <option value="Faculty / Institutional">Faculty / Academic</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        Subject *
                      </label>
                      <input
                        {...register("subject")}
                        type="text"
                        placeholder="e.g. Query regarding upcoming Bedrock lab"
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-700/80 bg-slate-950/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                      />
                      {errors.subject && (
                        <p className="text-xs text-red-400">{errors.subject.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Message *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Write your question, suggestion, or request here..."
                      className="w-full p-3.5 rounded-xl border border-slate-700/80 bg-slate-950/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full gap-2 shadow-xl"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Send Message</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="space-y-6 pt-8 border-t border-slate-800">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-400">
              Quick answers to common questions from students at PITS Ujjain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-2"
              >
                <h3 className="text-sm font-bold text-white flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
