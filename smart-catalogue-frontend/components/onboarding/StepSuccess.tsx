'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, MessageCircle } from 'lucide-react';

export default function StepSuccess({ formData }: any) {
  const copy = () => navigator.clipboard.writeText(formData.catalogueLink);
  const finishOnboarding = () => {
    localStorage.setItem("onboarding_done", "true");
    window.location.href = "/admin";
  };

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold">Your catalogue is live 🎉</h2>

      <div>
        <Input value={formData.catalogueLink} readOnly />
        <Button variant="outline" onClick={copy} className="mt-2 w-full">
          <Copy className="w-4 h-4 mr-2" /> Copy Link
        </Button>
      </div>

      <Button className="w-full bg-green-500 hover:bg-green-600">
        <MessageCircle className="w-4 h-4 mr-2" /> Share on WhatsApp
      </Button>

      {/* <button 
        onClick={finishOnboarding}
        className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white"
      >
        Finish Setup
      </button> */}
    </div>
  );
}