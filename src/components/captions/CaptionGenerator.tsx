"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToneSelector, type Tone } from "./ToneSelector";
import { cn } from "@/lib/utils";

interface CaptionGeneratorProps {
  imageUrl: string;
  onBack: () => void;
  onSelectCaption: (caption: string) => void;
}

export function CaptionGenerator({
  imageUrl,
  onBack,
  onSelectCaption,
}: CaptionGeneratorProps) {
  const [tone, setTone] = useState<Tone>("funny");
  const [captions, setCaptions] = useState<string[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCaptions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setCaptions([]);
    setSelectedCaption(null);

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      const apiResponse = await fetch("/api/captions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, tone }),
      });

      if (!apiResponse.ok) {
        throw new Error("Failed to generate captions");
      }

      const data = await apiResponse.json();
      setCaptions(data.captions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [imageUrl, tone]);

  const handleProceed = useCallback(() => {
    if (selectedCaption) {
      onSelectCaption(selectedCaption);
    }
  }, [selectedCaption, onSelectCaption]);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-video w-full bg-muted">
            <Image
              src={imageUrl}
              alt="Meme image"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </CardContent>
      </Card>

      <ToneSelector
        selectedTone={tone}
        onToneChange={setTone}
        disabled={isLoading}
      />

      <Button
        onClick={generateCaptions}
        disabled={isLoading}
        className="w-full"
        size="lg"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Generating Captions...
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12" />
            </svg>
            Generate Captions
          </>
        )}
      </Button>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {captions.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-medium">Choose a Caption</label>
          <div className="space-y-2">
            {captions.map((caption, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedCaption(caption)}
                className={cn(
                  "w-full text-left p-4 rounded-lg border-2 transition-all",
                  "hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  selectedCaption === caption
                    ? "border-primary bg-primary/5"
                    : "border-muted"
                )}
              >
                <p className="text-sm">{caption}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 justify-between pt-4 border-t">
        <Button variant="outline" onClick={onBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back
        </Button>
        <Button onClick={handleProceed} disabled={!selectedCaption}>
          Continue to Editor
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
