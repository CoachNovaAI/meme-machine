"use client";

import { useState, useCallback } from "react";
import { ImageUpload, ImageCropper, ImagePreview } from "@/components/upload";
import { CaptionGenerator } from "@/components/captions";

type Step = "upload" | "caption" | "editor";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<{
    file: File | null;
    previewUrl: string;
  } | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [selectedCaption, setSelectedCaption] = useState<string | null>(null);

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
    setCurrentStep("upload");
    setSelectedCaption(null);
  }, [uploadedImage, originalImageUrl]);

  const handleProceed = useCallback(() => {
    setCurrentStep("caption");
  }, []);

  const handleBackToUpload = useCallback(() => {
    setCurrentStep("upload");
  }, []);

  const handleSelectCaption = useCallback((caption: string) => {
    setSelectedCaption(caption);
    // TODO: Navigate to meme editor (Epic 3)
    console.log("Selected caption:", caption);
    setCurrentStep("editor");
  }, []);

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
            <h2 className="text-3xl font-bold">
              {currentStep === "upload" && "Create Your Meme"}
              {currentStep === "caption" && "Generate Captions"}
              {currentStep === "editor" && "Edit Your Meme"}
            </h2>
            <p className="text-muted-foreground">
              {currentStep === "upload" &&
                "Upload an image to get started with AI-powered caption generation"}
              {currentStep === "caption" &&
                "Choose a tone and let AI generate witty captions for your meme"}
              {currentStep === "editor" &&
                `Selected: "${selectedCaption}" - Editor coming soon!`}
            </p>
          </div>

          {currentStep === "upload" && (
            <>
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
            </>
          )}

          {currentStep === "caption" && uploadedImage && (
            <CaptionGenerator
              imageUrl={uploadedImage.previewUrl}
              onBack={handleBackToUpload}
              onSelectCaption={handleSelectCaption}
            />
          )}

          {currentStep === "editor" && uploadedImage && (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">
                Meme Editor coming in Epic 3!
              </p>
              <button
                onClick={handleBackToUpload}
                className="mt-4 text-primary hover:underline"
              >
                Start over
              </button>
            </div>
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
