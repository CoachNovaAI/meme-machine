"use client";

import { useState, useCallback } from "react";
import { ImageUpload, ImageCropper, ImagePreview } from "@/components/upload";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<{
    file: File | null;
    previewUrl: string;
  } | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

  const handleImageSelect = useCallback((file: File, previewUrl: string) => {
    setUploadedImage({ file, previewUrl });
    setOriginalImageUrl(previewUrl);
  }, []);

  const handleCropComplete = useCallback((croppedImageUrl: string) => {
    setUploadedImage((prev) =>
      prev ? { ...prev, previewUrl: croppedImageUrl } : null
    );
    setShowCropper(false);
  }, []);

  const handleRemove = useCallback(() => {
    if (uploadedImage?.previewUrl) {
      URL.revokeObjectURL(uploadedImage.previewUrl);
    }
    if (originalImageUrl) {
      URL.revokeObjectURL(originalImageUrl);
    }
    setUploadedImage(null);
    setOriginalImageUrl(null);
  }, [uploadedImage, originalImageUrl]);

  const handleProceed = useCallback(() => {
    // TODO: Navigate to caption generation (Epic 2)
    console.log("Proceeding to caption generation with image:", uploadedImage);
  }, [uploadedImage]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">MemeMachine</h1>
          <p className="text-sm text-muted-foreground">
            AI-Powered Meme Generator
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Create Your Meme</h2>
            <p className="text-muted-foreground">
              Upload an image to get started with AI-powered caption generation
            </p>
          </div>

          {!uploadedImage ? (
            <ImageUpload onImageSelect={handleImageSelect} />
          ) : (
            <ImagePreview
              imageUrl={uploadedImage.previewUrl}
              onCrop={() => setShowCropper(true)}
              onRemove={handleRemove}
              onProceed={handleProceed}
            />
          )}

          {showCropper && originalImageUrl && (
            <ImageCropper
              imageSrc={originalImageUrl}
              onCropComplete={handleCropComplete}
              onCancel={() => setShowCropper(false)}
              open={showCropper}
            />
          )}
        </div>
      </main>

      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          Built with Next.js and Claude AI
        </div>
      </footer>
    </div>
  );
}
