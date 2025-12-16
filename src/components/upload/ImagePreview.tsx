"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ImagePreviewProps {
  imageUrl: string;
  onCrop: () => void;
  onRemove: () => void;
  onProceed: () => void;
}

export function ImagePreview({
  imageUrl,
  onCrop,
  onRemove,
  onProceed,
}: ImagePreviewProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video w-full bg-muted">
          <Image
            src={imageUrl}
            alt="Uploaded preview"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 p-4 justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onCrop}>
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
                <path d="M6 2v14a2 2 0 0 0 2 2h14" />
                <path d="M18 22V8a2 2 0 0 0-2-2H2" />
              </svg>
              Crop
            </Button>
            <Button variant="outline" size="sm" onClick={onRemove}>
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
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              Remove
            </Button>
          </div>
          <Button onClick={onProceed}>
            Continue to Captions
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
      </CardContent>
    </Card>
  );
}
