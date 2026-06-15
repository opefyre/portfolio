"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, ArrowRight, Loader2, AlertTriangle } from "lucide-react";
import ZeroGravityLiquid from "@/components/UI/ZeroGravityLiquid";
import FloatingInput from "@/components/UI/FloatingInput";
import MagneticButton from "@/components/UI/MagneticButton";
import EnvelopeSystem from "@/components/UI/EnvelopeSystem";
import MagneticBackButton from "@/components/UI/MagneticBackButton";
import { submitInquiryToFirestore } from "@/lib/firebase-client";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function validate(data: { name: string; email: string; message: string }): FieldErrors {
    const errors: FieldErrors = {};
    if (data.name.length < 2) errors.name = "Please enter your full name (2+ characters).";
    else if (data.name.length > 120) errors.name = "Name must be 120 characters or fewer.";
    if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";
    else if (data.email.length > 254) errors.email = "Email must be 254 characters or fewer.";
    if (data.message.length < 10) errors.message = "A short message helps me reply — at least 10 characters.";
    else if (data.message.length > 5000) errors.message = "Message must be 5,000 characters or fewer.";
    return errors;
}

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [copied, setCopied] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const successHeadingRef = useRef<HTMLHeadingElement>(null);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText("hello@abosh.io");
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard may be denied; fail silently
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError(null);

        const formData = new FormData(e.currentTarget);
        const website = String(formData.get("website") ?? "").trim();
        if (website) {
            // Honeypot tripped — pretend success without writing
            setIsSuccess(true);
            return;
        }

        const data = {
            name: String(formData.get("name") ?? "").trim(),
            email: String(formData.get("email") ?? "").trim(),
            message: String(formData.get("message") ?? "").trim(),
        };

        const errors = validate(data);
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            const first = (Object.keys(errors)[0] as keyof FieldErrors);
            window.setTimeout(() => {
                document.getElementById(first)?.focus();
            }, 30);
            return;
        }
        setFieldErrors({});

        setIsSubmitting(true);
        try {
            await submitInquiryToFirestore(data);
            setIsSuccess(true);
            window.setTimeout(() => successHeadingRef.current?.focus(), 80);
        } catch (error) {
            console.error("Transmission error:", error);
            setFormError("Secure transmission failed. Please try again or email hello@abosh.io directly.");
            setIsSubmitting(false);
        }
    };

    return (
        <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-24 pb-12">
            <MagneticBackButton />

            <div className="hidden md:block">
                <ZeroGravityLiquid />
            </div>

            <div className="md:hidden absolute inset-0 bg-canvas -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px]" />
            </div>

            <div className="container relative z-10 max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[70vh]">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col gap-8 md:pr-12"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium leading-[1.1] tracking-tight">
                            Let&apos;s build <br /><span className="text-brand-blue">extraordinary.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-secondary max-w-md leading-relaxed">
                            Looking to architect a new platform, discuss technical consulting, or just say hello?
                        </p>

                        <div className="pt-8">
                            <p className="text-sm font-mono tracking-widest uppercase text-tertiary mb-4">Direct Channel</p>
                            <button
                                type="button"
                                onClick={handleCopyEmail}
                                className="group flex items-center gap-4 text-xl md:text-2xl font-mono text-white transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded-md"
                                aria-label="Copy email address"
                            >
                                <span className="relative">
                                    hello@abosh.io
                                    <span className="absolute left-0 -bottom-1 w-0 h-px bg-brand-blue transition-all duration-300 group-hover:w-full" />
                                </span>

                                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-white/5 group-hover:bg-brand-blue/10 transition-colors">
                                    <AnimatePresence mode="wait">
                                        {copied ? (
                                            <motion.div
                                                key="check"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                            >
                                                <Check className="w-4 h-4 text-brand-blue" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="copy"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                            >
                                                <Copy className="w-4 h-4 text-secondary group-hover:text-brand-blue" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </button>
                            <span aria-live="polite" className="sr-only">{copied ? "Email copied to clipboard" : ""}</span>
                        </div>
                    </motion.div>

                    <div className="w-full relative">
                        <EnvelopeSystem
                            isSubmitting={isSubmitting}
                            isSuccess={isSuccess}
                            formComponent={
                                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 relative z-10 w-full">
                                    {/* Honeypot — off-screen, real bots fill it; CSS-hidden is too easy to skip */}
                                    <label
                                        htmlFor="website"
                                        style={{
                                            position: "absolute",
                                            left: "-9999px",
                                            width: "1px",
                                            height: "1px",
                                            overflow: "hidden",
                                        }}
                                        aria-hidden="true"
                                    >
                                        Don&apos;t fill this in
                                        <input
                                            type="text"
                                            name="website"
                                            id="website"
                                            tabIndex={-1}
                                            autoComplete="off"
                                        />
                                    </label>

                                    <FloatingInput
                                        id="name"
                                        label="Your Name"
                                        autoComplete="name"
                                        required
                                        maxLength={120}
                                        minLength={2}
                                        error={fieldErrors.name ?? null}
                                    />
                                    <FloatingInput
                                        id="email"
                                        type="email"
                                        label="Email Address"
                                        autoComplete="email"
                                        required
                                        maxLength={254}
                                        minLength={5}
                                        error={fieldErrors.email ?? null}
                                    />
                                    <FloatingInput
                                        id="message"
                                        label="How can I help you?"
                                        isTextArea
                                        required
                                        maxLength={5000}
                                        minLength={10}
                                        error={fieldErrors.message ?? null}
                                    />

                                    {formError && (
                                        <div
                                            role="alert"
                                            className="flex items-start gap-3 p-3 rounded-xl border border-rose-400/30 bg-rose-400/5 text-rose-200"
                                        >
                                            <AlertTriangle className="w-4 h-4 mt-0.5 text-rose-400 shrink-0" aria-hidden="true" />
                                            <p className="text-sm">{formError}</p>
                                        </div>
                                    )}

                                    <div className="pt-6">
                                        <MagneticButton strength={0.2} className="w-full sm:w-auto">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="relative w-full sm:w-auto overflow-hidden bg-brand-blue text-deep px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:bg-brand-blue/90 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] disabled:opacity-70 disabled:cursor-not-allowed group flex items-center justify-center min-w-[200px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                                            >
                                                <AnimatePresence mode="wait">
                                                    {isSubmitting ? (
                                                        <motion.div
                                                            key="submitting"
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -20 }}
                                                        >
                                                            <Loader2 className="w-5 h-5 animate-spin" />
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div
                                                            key="idle"
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -20 }}
                                                            className="flex items-center gap-2"
                                                        >
                                                            Transmit
                                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </button>
                                        </MagneticButton>
                                    </div>
                                </form>
                            }
                            ticketComponent={
                                <div
                                    role="status"
                                    aria-live="polite"
                                    className="bg-deep/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden text-center text-white flex flex-col items-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mb-6">
                                        <Check className="w-8 h-8 text-brand-blue" aria-hidden="true" />
                                    </div>

                                    <h2
                                        ref={successHeadingRef}
                                        tabIndex={-1}
                                        className="text-2xl font-display font-medium mb-3 focus-visible:outline-none"
                                    >
                                        Message Sent
                                    </h2>

                                    <p className="text-secondary leading-relaxed max-w-sm">
                                        Thanks for reaching out. I&apos;ve received your message and will get back to you shortly.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsSuccess(false);
                                            setIsSubmitting(false);
                                            setFormError(null);
                                            setFieldErrors({});
                                        }}
                                        className="mt-4 text-xs tracking-widest uppercase text-tertiary hover:text-white transition-colors self-start flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md p-1"
                                    >
                                        <ArrowRight className="w-3 h-3 rotate-180 transition-transform group-hover:-translate-x-1" />
                                        Reset Form
                                    </button>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
