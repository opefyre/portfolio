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
}

export default function FloatingInput({ label, id, type = "text", isTextArea = false, required = false }: FloatingInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const isFloating = isFocused || hasValue;

    return (
        <div className="relative group w-full pt-4">
            <motion.label
                htmlFor={id}
                animate={{
                    y: isFloating ? (isTextArea ? -24 : -24) : (isTextArea ? 16 : 14),
                    scale: isFloating ? 0.85 : 1,
                    color: isFocused ? "#38bdf8" : "#94a3b8" // brand-blue vs slate-400
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={clsx(
                    "absolute left-0 pointer-events-none origin-[0_0]",
                    !isFloating && !isTextArea && "top-0 flex items-center h-full",
                    !isFloating && isTextArea && "top-0 pt-4"
                )}
            >
                {label} {required && <span className="text-brand-purple ml-1">*</span>}
            </motion.label>

            {isTextArea ? (
                <textarea
                    id={id}
                    name={id}
                    required={required}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => {
                        setIsFocused(false);
                        setHasValue(e.target.value.length > 0);
                    }}
                    onChange={(e) => setHasValue(e.target.value.length > 0)}
                    className="w-full bg-transparent border-b border-border text-white px-0 py-4 focus:outline-none focus:border-brand-blue transition-colors resize-none min-h-[120px] relative z-10"
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={id}
                    required={required}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => {
                        setIsFocused(false);
                        setHasValue(e.target.value.length > 0);
                    }}
                    onChange={(e) => setHasValue(e.target.value.length > 0)}
                    className="w-full bg-transparent border-b border-border text-white px-0 py-4 focus:outline-none focus:border-brand-blue transition-colors h-14 relative z-10"
                />
            )}

            {/* Animated Bottom Border Glow on Focus */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-brand-blue z-20"
                initial={{ width: "0%" }}
                animate={{ width: isFocused ? "100%" : "0%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        </div>
    );
}
