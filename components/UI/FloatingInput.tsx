"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface FloatingInputProps {
    label: string;
    id: string;
    type?: string;
    isTextArea?: boolean;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    autoComplete?: string;
    error?: string | null;
}

export default function FloatingInput({
    label,
    id,
    type = "text",
    isTextArea = false,
    required = false,
    maxLength,
    minLength,
    autoComplete,
    error,
}: FloatingInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const isFloating = isFocused || hasValue;
    const errorId = error ? `${id}-error` : undefined;

    const commonClasses = clsx(
        "w-full bg-transparent text-white px-0 py-4 focus:outline-none focus-visible:outline-none transition-colors relative z-10",
        error
            ? "border-b border-rose-400"
            : "border-b border-border focus:border-brand-blue"
    );

    return (
        <div className="relative group w-full pt-4">
            <motion.label
                htmlFor={id}
                animate={{
                    y: isFloating ? -24 : (isTextArea ? 16 : 14),
                    scale: isFloating ? 0.85 : 1,
                    color: error ? "#fb7185" : isFocused ? "#38bdf8" : "#94a3b8",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={clsx(
                    "absolute left-0 pointer-events-none origin-[0_0]",
                    !isFloating && !isTextArea && "top-0 flex items-center h-full",
                    !isFloating && isTextArea && "top-0 pt-4"
                )}
            >
                {label} {required && <span className="text-brand-purple ml-1" aria-hidden="true">*</span>}
            </motion.label>

            {isTextArea ? (
                <textarea
                    id={id}
                    name={id}
                    required={required}
                    maxLength={maxLength}
                    minLength={minLength}
                    autoComplete={autoComplete}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={errorId}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => {
                        setIsFocused(false);
                        setHasValue(e.target.value.length > 0);
                    }}
                    onChange={(e) => setHasValue(e.target.value.length > 0)}
                    className={clsx(commonClasses, "resize-none min-h-[120px]")}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={id}
                    required={required}
                    maxLength={maxLength}
                    minLength={minLength}
                    autoComplete={autoComplete}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={errorId}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => {
                        setIsFocused(false);
                        setHasValue(e.target.value.length > 0);
                    }}
                    onChange={(e) => setHasValue(e.target.value.length > 0)}
                    className={clsx(commonClasses, "h-14")}
                />
            )}

            <motion.div
                aria-hidden="true"
                className={clsx(
                    "absolute bottom-0 left-0 h-[2px] z-20",
                    error ? "bg-rose-400" : "bg-brand-blue"
                )}
                initial={{ width: "0%" }}
                animate={{ width: isFocused || error ? "100%" : "0%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />

            {error && (
                <p
                    id={errorId}
                    role="alert"
                    className="mt-2 text-xs font-medium text-rose-400"
                >
                    {error}
                </p>
            )}
        </div>
    );
}
