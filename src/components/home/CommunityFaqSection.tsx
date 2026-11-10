"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useSound } from "@/components/audio/SoundManager";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What is the AWS Student Builder Group?",
    answer:
      "The AWS Student Builder Group at Prashanti Institute of Technology & Science (PITS), Ujjain is an independent, student-led academic community. Affiliated through the AWS Student Builder Group program, it helps students master cloud computing, artificial intelligence, software engineering, and modern DevOps through hands-on learning, collaborative projects, and peer mentorship.",
  },
  {
    question: "Who can join the community?",
    answer:
      "Membership is open to all engineering and computer science students at PITS Ujjain across 1st, 2nd, 3rd, and 4th years, regardless of their branch or prior experience level. Students from Computer Science, AI/ML, Electronics, Mechanical, and Civil Engineering are all welcome.",
  },
  {
    question: "Do I need previous AWS experience?",
    answer:
      "No previous cloud or AWS experience is required! Our curriculum begins with foundational concepts — understanding compute, cloud architecture, and setting up an AWS Free Tier account with safety alarms so you can learn without incurring unexpected costs.",
  },
  {
    question: "What activities does the community organize?",
    answer:
      "We organize hands-on technical workshops, architecture walkthroughs, certification study bootcamps, open-source project sprints, industry guest speaker sessions, and student project showcases.",
  },
  {
    question: "How can I participate in workshops?",
    answer:
      "All workshop announcements, lab requirements, and registration links are published on our official Meetup community page and our website's events page. Simply RSVP on Meetup or register via our event page to secure your lab seat.",
  },
  {
    question: "How can I join the core team?",
    answer:
      "We regularly open applications for Junior Builder Volunteers and Domain Associates to shadow appointed Directors in Cloud, AI/ML, Data Engineering, DevOps, Innovation, Events, and Marketing. Look out for cohort recruitment announcements on our community channels.",
  },
  {
    question: "Where can I find upcoming events?",
    answer:
      "Upcoming workshops and calendar schedules are always updated live on our official Meetup group (https://www.meetup.com/aws-sbg-at-prashanti-institute-of-technology-and-science/) and in the Events section of this website.",
  },
];

export function CommunityFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { playClick } = useSound();

  const toggleFaq = (index: number) => {
    playClick();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 relative overflow-hidden bg-[#070912] border-b border-white/10"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-purple-900/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold tracking-wider uppercase shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>COMMUNITY FAQ • EVERYTHING YOU NEED TO KNOW</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-amber-300 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Got questions about our student builder group, workshops, or getting started with AWS? Here are the answers.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-purple-500/20 bg-[#0A0D1B]/90 backdrop-blur-2xl overflow-hidden transition-colors hover:border-purple-400/40"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="text-sm sm:text-base font-bold text-white font-sans">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-purple-500/25" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-purple-300" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-purple-500/15 animate-in fade-in duration-200"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
