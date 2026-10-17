"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  User,
  Award,
  Code,
  Briefcase,
  Database,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  applicationSchema,
  ApplicationFormData,
} from "@/lib/validations/applicationSchema";
import { COMMUNITY_INFO } from "@/lib/data/initialData";
import { useSound } from "@/components/audio/SoundManager";

const AVAILABLE_ROLES = [
  "Data Engineering Associate (Mentored by Anchit Malik)",
  "Cloud Computing Associate (Mentored by Tanish Namdev)",
  "AI / ML & MLOps Associate (Mentored by Shafque Ansari)",
  "Innovation, Logistics & Event Associate (Mentored by Aayesha Malik)",
  "Software Engineering & DevOps Associate (Mentored by Aakansha Panchal)",
  "Marketing & Digital Growth Associate (Mentored by Muskan Goyal)",
  "Graphic Design & Creative Media Associate (Mentored by Harshit Singh Sikarwar)",
  "General Student Cloud Builder Volunteer",
];

const DEPARTMENTS = [
  "Computer Science & Engineering (CSE)",
  "CSE - Artificial Intelligence & Machine Learning",
  "Information Technology (IT)",
  "Electronics & Communication Engineering (ECE)",
  "Mechanical Engineering (ME)",
  "Civil Engineering (CE)",
  "Other Engineering Branch",
];

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

function JoinPageContent() {
  const searchParams = useSearchParams();
  const preselectedRole = searchParams.get("role") || "";
  const { playSuccess, playClick } = useSound();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionSuccess, setSubmissionSuccess] = React.useState<{
    id: string;
    fullName: string;
    preferredPosition: string;
    storageMode: string;
    databaseConfigured: boolean;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      collegeEmail: "",
      personalEmail: "",
      department: "",
      currentYear: "",
      cgpa: 7.0,
      technicalSkills: "",
      preferredPosition: preselectedRole || "",
      whyJoin: "",
      projectLinks: "",
      linkedinUrl: "",
      agreeToPrivacy: false,
    },
  });

  React.useEffect(() => {
    if (preselectedRole) {
      setValue("preferredPosition", preselectedRole);
    }
  }, [preselectedRole, setValue]);

  const onSubmit = async (data: ApplicationFormData) => {
    playClick();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Failed to submit application. Please check form errors.");
        setIsSubmitting(false);
        return;
      }

      playSuccess();
      setSubmissionSuccess({
        id: result.data.id,
        fullName: result.data.fullName,
        preferredPosition: result.data.preferredPosition,
        storageMode: result.storageMode || "development-mock",
        databaseConfigured: Boolean(result.databaseConfigured),
      });

      toast.success("Application submitted successfully!");
      reset();
    } catch {
      toast.error("Network error while submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="orange" size="md">
            2026 Core Team Recruitment
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Join the SBG Core Team
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Become a student leader at {COMMUNITY_INFO.collegeShort}. Help organize workshops, build cloud architectures, and empower fellow student developers.
          </p>
        </div>

        {/* Eligibility & Selection Process Bar */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md space-y-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">
              Eligibility &amp; Selection Criteria
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Minimum 7.0 CGPA</strong> in current degree coursework.
              </span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Good working knowledge of <strong>Cloud Computing</strong>.
              </span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Solid understanding of <strong>AI and Machine Learning</strong>.
              </span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Basic <strong>Web Development</strong> (HTML/CSS/JS or frameworks).
              </span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Enthusiasm for <strong>organizing technical events</strong> &amp; workshops.
              </span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Selection includes a short <strong>interactive interview</strong>.
              </span>
            </div>
          </div>
        </div>

        {/* Success Confirmation State */}
        {submissionSuccess ? (
          <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-500/10 via-slate-900/90 to-slate-950 p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Application Submitted Successfully!
              </h2>
              <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{submissionSuccess.fullName}</strong>. Your application for the <strong>{submissionSuccess.preferredPosition}</strong> role has been received by the AWS Student Builder Group organizing committee at PITS Ujjain.
              </p>
            </div>

            <div className="inline-block p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-xs font-mono text-amber-400 space-y-1.5 shadow-lg">
              <div className="font-bold">Applicant Reference: {submissionSuccess.id}</div>
              <div className="text-[11px] text-emerald-400 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Application Logged • Status: Under Review</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 max-w-md mx-auto">
              Our leadership team will review your application and reach out via your college email regarding the interview schedule.
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => setSubmissionSuccess(null)}
              >
                Submit Another Application
              </Button>
            </div>
          </div>
        ) : (
          /* Application Form */
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-md shadow-2xl space-y-8"
          >
            {/* Form Section 1: Academic & Personal */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <User className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  1. Candidate &amp; Academic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Full Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    {...register("fullName")}
                    type="text"
                    placeholder="e.g. Ashwin Chauhan"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-700/80 bg-slate-950/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-400">{errors.fullName.message}</p>
                  )}
                </div>

                {/* College Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    College / Institutional Email <span className="text-amber-400">*</span>
                  </label>
                  <input
                    {...register("collegeEmail")}
                    type="email"
                    placeholder="student.name@pitsujjain.ac.in"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-700/80 bg-slate-950/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  {errors.collegeEmail && (
                    <p className="text-xs text-red-400">{errors.collegeEmail.message}</p>
                  )}
                </div>

                {/* Personal Email (Optional) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Personal Email (Optional)
                  </label>
                  <input
                    {...register("personalEmail")}
                    type="email"
                    placeholder="personal@gmail.com"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-700/80 bg-slate-950/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  {errors.personalEmail && (
                    <p className="text-xs text-red-400">{errors.personalEmail.message}</p>
                  )}
                </div>

                {/* CGPA */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Current CGPA (Min 7.0) <span className="text-amber-400">*</span>
                  </label>
                  <input
                    {...register("cgpa", { valueAsNumber: true })}
                    type="number"
                    step="0.01"
                    min="7.0"
                    max="10.0"
                    placeholder="e.g. 8.4"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-700/80 bg-slate-950/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  {errors.cgpa && (
                    <p className="text-xs text-red-400">{errors.cgpa.message}</p>
                  )}
                </div>

                {/* Department */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Engineering Department <span className="text-amber-400">*</span>
                  </label>
                  <select
                    {...register("department")}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-700/80 bg-slate-950/80 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="">Select your department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-xs text-red-400">{errors.department.message}</p>
                  )}
                </div>

                {/* Current Semester / Year */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Current Semester / Academic Year <span className="text-amber-400">*</span>
                  </label>
                  <select
                    {...register("currentYear")}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-700/80 bg-slate-950/80 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="">Select semester / year</option>
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                  {errors.currentYear && (
                    <p className="text-xs text-red-400">{errors.currentYear.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Form Section 2: Position & Technical Skills */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  2. Role Preference &amp; Technical Competency
                </h3>
              </div>

              {/* Preferred Position */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Preferred Position <span className="text-amber-400">*</span>
                </label>
                <select
                  {...register("preferredPosition")}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-700/80 bg-slate-950/80 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="">Select preferred position</option>
                  {AVAILABLE_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.preferredPosition && (
                  <p className="text-xs text-red-400">{errors.preferredPosition.message}</p>
                )}
              </div>

              {/* Technical Skills */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Technical Skills &amp; Cloud/Coding Background <span className="text-amber-400">*</span>
                </label>
                <textarea
                  {...register("technicalSkills")}
                  rows={3}
                  placeholder="e.g. Familiar with AWS EC2 & S3, Python, JavaScript/React, Git, Docker, basic Linux terminal..."
                  className="w-full p-3.5 rounded-xl border border-slate-700/80 bg-slate-950/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />
                {errors.technicalSkills && (
                  <p className="text-xs text-red-400">{errors.technicalSkills.message}</p>
                )}
              </div>

              {/* Reason for Applying */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Reason for Applying &amp; Community Goals <span className="text-amber-400">*</span>
                </label>
                <textarea
                  {...register("whyJoin")}
                  rows={3}
                  placeholder="Explain your motivation, past organizing experience, and what technical workshops or ideas you'd like to bring to PITS..."
                  className="w-full p-3.5 rounded-xl border border-slate-700/80 bg-slate-950/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />
                {errors.whyJoin && (
                  <p className="text-xs text-red-400">{errors.whyJoin.message}</p>
                )}
              </div>
            </div>

            {/* Form Section 3: Links & Profiles */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Code className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  3. Relevant Projects &amp; Profiles (Optional)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Relevant Projects / GitHub Portfolio URL
                  </label>
                  <input
                    {...register("projectLinks")}
                    type="text"
                    placeholder="https://github.com/your-username"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-700/80 bg-slate-950/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    LinkedIn Profile URL
                  </label>
                  <input
                    {...register("linkedinUrl")}
                    type="text"
                    placeholder="https://linkedin.com/in/your-profile"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-700/80 bg-slate-950/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Privacy Notice & Agreement */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Applicant Privacy &amp; Data Protection Notice</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                We only collect academic and contact information required to assess eligibility and schedule interviews. We will never request sensitive identification numbers (Aadhaar, PAN, banking) or passwords. Your data will only be viewed by the AWS SBG PITS selection committee.
              </p>

              <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                <input
                  {...register("agreeToPrivacy")}
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-xs text-slate-300 leading-normal">
                  I certify that the information provided is accurate and agree to allow the organizing committee to review my academic and project credentials for Core Team selection. *
                </span>
              </label>
              {errors.agreeToPrivacy && (
                <p className="text-xs text-red-400">{errors.agreeToPrivacy.message}</p>
              )}
            </div>

            {/* Mode Indicator & Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Database className="w-4 h-4 text-amber-400" />
                <span>
                  Live Application Engine • PostgreSQL &amp; In-Memory Fallback
                </span>
              </div>

              <Button
                type="submit"
                size="lg"
                isLoading={isSubmitting}
                className="w-full sm:w-auto shadow-xl"
              >
                Submit Application
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function JoinPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen py-24 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-slate-400 text-sm">Loading application portal...</p>
        </div>
      }
    >
      <JoinPageContent />
    </React.Suspense>
  );
}

