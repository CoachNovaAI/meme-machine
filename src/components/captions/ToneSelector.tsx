"use client";

import { cn } from "@/lib/utils";

export type Tone = "funny" | "sarcastic" | "wholesome";

interface ToneSelectorProps {
  selectedTone: Tone;
  onToneChange: (tone: Tone) => void;
  disabled?: boolean;
}

const tones: { value: Tone; label: string; icon: string; description: string }[] = [
  {
    value: "funny",
    label: "Funny",
    icon: "😂",
    description: "Witty and humorous",
  },
  {
    value: "sarcastic",
    label: "Sarcastic",
    icon: "😏",
    description: "Dry wit and irony",
  },
  {
    value: "wholesome",
    label: "Wholesome",
    icon: "🥰",
    description: "Heartwarming and positive",
  },
];

export function ToneSelector({
  selectedTone,
  onToneChange,
  disabled,
}: ToneSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Tone</label>
      <div className="grid grid-cols-3 gap-2">
        {tones.map((tone) => (
          <button
            key={tone.value}
            type="button"
            onClick={() => onToneChange(tone.value)}
            disabled={disabled}
            className={cn(
              "flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all",
              "hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              selectedTone === tone.value
                ? "border-primary bg-primary/5"
                : "border-muted",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <span className="text-2xl">{tone.icon}</span>
            <span className="text-sm font-medium">{tone.label}</span>
            <span className="text-xs text-muted-foreground text-center">
              {tone.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
