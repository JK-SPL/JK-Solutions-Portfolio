"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const BUILD_OPTIONS = ["Website", "SaaS", "CRM", "Automation", "AI", "Mobile", "3D / Motion", "Something Experimental"];
const STAGE_OPTIONS = ["Idea", "Prototype", "Existing Product", "Redesign", "Scaling"];

type Status = { kind: "idle" | "sending" | "sent" | "mailto" | "error"; message?: string; mailto?: string };

function OptionGroup({
  legend,
  options,
  value,
  onChange,
  name,
}: {
  legend: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="eyebrow">{legend}</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={legend}>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={value === o}
            aria-label={`${legend}: ${o}`}
            onClick={() => onChange(o)}
            className={cn(
              "border px-4 py-2.5 text-sm transition-colors duration-300",
              value === o ? "border-primary-glow bg-primary/15 text-paper" : "border-line text-mute hover:border-faint hover:text-paper"
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

type StepId = "project" | "details" | "contact";

const STEPS: { id: StepId; label: string; icon: string; description: string }[] = [
  { id: "project", label: "PROJECT", icon: "🎯", description: "What are you building and at what stage?" },
  { id: "details", label: "DETAILS", icon: "📝", description: "Describe the problem, users, and what exists today." },
  { id: "contact", label: "CONTACT", icon: "📧", description: "How should I reach you?" },
];

export function ContactBrief() {
  const [step, setStep] = useState<StepId>("project");
  const [building, setBuilding] = useState("");
  const [stage, setStage] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const checkStepValid = (currentStep: StepId) => {
    if (currentStep === "project") {
      return building && stage;
    }
    if (currentStep === "details") {
      return description.trim().length >= 20;
    }
    if (currentStep === "contact") {
      return name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    }
    return false;
  };

  const nextStep = () => {
    if (!checkStepValid(step)) return;
    const idx = STEPS.findIndex((s) => s.id === step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].id);
  };

  const prevStep = () => {
    const idx = STEPS.findIndex((s) => s.id === step);
    if (idx > 0) setStep(STEPS[idx - 1].id);
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!checkStepValid(step)) return;
    if (status.kind === "sending") return;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ building, stage, description, name, email, phone, company }),
      });
      const data = await res.json();
      if (res.ok && data.delivered) {
        setStatus({ kind: "sent" });
      } else if (res.ok && data.mailto) {
        setStatus({ kind: "mailto", mailto: data.mailto });
      } else {
        setStatus({ kind: "error", message: data.error ?? "Something went wrong. Try again." });
      }
    } catch {
      setStatus({ kind: "error", message: "Network error — try again." });
    }
  };

  if (status.kind === "sent") {
    return (
      <div className="border border-primary-glow/50 bg-primary/10 p-10 text-center animate-in fade-in slide-in-from-top-2 duration-300" role="status">
        <p className="display-3">Brief received.</p>
        <p className="mt-4 text-mute">I&rsquo;ll read it properly and reply personally.</p>
        <Button variant="ghost" onClick={() => { setStatus({ kind: "idle" }); setStep("project"); }} className="mt-6">
          Send another brief
        </Button>
      </div>
    );
  }

  const currentStepIndex = STEPS.findIndex((s) => s.id === step);
  const currentStepData = STEPS[currentStepIndex];

  const inputCls =
    "w-full border border-line bg-panel px-4 py-3.5 text-paper placeholder:text-faint transition-colors focus:border-primary-glow focus:outline-none";

  return (
    <form onSubmit={submit} noValidate className="space-y-0">
      {/* Progress indicator */}
      <div className="mb-10 flex items-center gap-4">
        <ol className="flex items-center gap-2" role="list" aria-label="Brief steps">
          {STEPS.map((s, i) => (
            <li key={s.id} className="flex items-center gap-2">
              <span
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 font-mono text-[0.625rem] transition-all duration-300",
                  i < currentStepIndex
                    ? "border-primary-glow bg-primary/15 text-paper"
                    : i === currentStepIndex
                    ? "border-primary-glow bg-primary/10 text-primary-glow"
                    : "border-line text-faint"
                )}
              >
                {i < currentStepIndex ? "✓" : String(i + 1)}
              </span>
              {i < STEPS.length - 1 && (
                <span className={cn(
                  "hidden sm:block w-16 h-px transition-colors",
                  i < currentStepIndex ? "bg-primary-glow/30" : "bg-line"
                )} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Step content */}
      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="mb-6">
          <p className="font-mono text-[0.625rem] uppercase tracking-label text-primary-glow mb-1">
            STEP {String(currentStepIndex + 1).padStart(2, "0")} — {currentStepData.label}
          </p>
          <p className="text-sm text-mute">{currentStepData.description}</p>
        </div>

        {step === "project" && (
          <div className="space-y-8">
            <OptionGroup legend="What are you building?" options={BUILD_OPTIONS} value={building} onChange={setBuilding} name="building" />
            {errors.building && <p role="alert" className="mt-2 text-xs text-danger">{errors.building}</p>}
            <OptionGroup legend="What stage are you in?" options={STAGE_OPTIONS} value={stage} onChange={setStage} name="stage" />
            {errors.stage && <p role="alert" className="mt-2 text-xs text-danger">{errors.stage}</p>}
          </div>
        )}

        {step === "details" && (
          <div>
            <label htmlFor="brief-desc" className="eyebrow mb-4 block">Project description</label>
            <textarea
              id="brief-desc"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What should it do? Who will use it? What exists today? What's the constraint?"
              className={inputCls}
              aria-invalid={!!errors.description}
              aria-describedby="desc-hint"
            />
            <p id="desc-hint" className="mt-2 text-xs text-faint">Be specific — the better the brief, the faster the reply.</p>
            {errors.description && <p role="alert" className="mt-2 text-xs text-danger">{errors.description}</p>}
          </div>
        )}

        {step === "contact" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="brief-name" className="eyebrow mb-4 block">Name</label>
                <input id="brief-name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} autoComplete="name" aria-invalid={!!errors.name} />
                {errors.name && <p role="alert" className="mt-2 text-xs text-danger">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="brief-email" className="eyebrow mb-4 block">Email</label>
                <input id="brief-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} autoComplete="email" aria-invalid={!!errors.email} />
                {errors.email && <p role="alert" className="mt-2 text-xs text-danger">{errors.email}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="brief-phone" className="eyebrow mb-4 block">Phone <span className="normal-case tracking-normal text-faint">(optional)</span></label>
                <input id="brief-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} autoComplete="tel" />
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line pt-8">
          <div className="flex items-center gap-4">
            {step !== "project" && (
              <Button variant="ghost" type="button" onClick={prevStep} className="w-full sm:w-auto">
                ← Back
              </Button>
            )}
          </div>
          <div className="flex items-center gap-4">
            {step !== "contact" ? (
              <Button type="button" onClick={nextStep} disabled={!checkStepValid(step)}>
                Next →
              </Button>
            ) : (
              <Button type="submit" disabled={status.kind === "sending"}>
                {status.kind === "sending" ? "Sending…" : "Start the conversation"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {status.kind === "error" && (
        <div className="mt-6 p-4 border border-danger/50 bg-danger/10 text-danger text-sm" role="alert">
          {status.message}
        </div>
      )}

      {status.kind === "mailto" && status.mailto && (
        <div className="mt-6 p-4 border border-primary-glow/50 bg-primary/10 text-sm text-primary-glow" role="status">
          Direct delivery isn&rsquo;t wired up yet —{" "}
          <a href={status.mailto} className="underline underline-offset-4">
            send the brief by email instead
          </a>
          .
        </div>
      )}

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
      </div>
    </form>
  );
}