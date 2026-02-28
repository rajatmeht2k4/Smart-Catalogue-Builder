'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wand2, ArrowLeft, ArrowRight } from 'lucide-react';
import StepBranding from '@/components/onboarding/StepBranding';
import StepProduct from '@/components/onboarding/StepProduct';
import StepAIMagic from '@/components/onboarding/StepAIMagic';
import StepTemplate from '@/components/onboarding/StepTemplate';
import StepSuccess from '@/components/onboarding/StepSuccess';
import { Product } from '@/lib/mockProducts';

export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);

  const [formData, setFormData] = useState({
    businessName: '',
    tagline: '',
    whatsapp: '',
    logo: '',
    brandColor: '#8B5CF6',
    catalogueLink: '',
    template: "minimal",
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const canProceed = () => {
    if (step === 2) {
      return products.length > 0 && products.every(p => p.image);
    }
    if (step === 3) {
      return products.length > 0 && products.every(p => p.bgRemoved === true);
    }
    if (step === 1) {
      return !!formData.businessName;
    }
    return true;
  };

  const next = () => {
    if (step === 4) {
      setFormData(prev => ({
        ...prev,
        catalogueLink: `smartcatalogue.app/catalogue/${prev.businessName
          .toLowerCase()
          .replace(/\s+/g, '-')}`,
      }));
    }

    if (step < totalSteps) setStep(s => s + 1);
    else router.push('/admin'); // dashboard route
  };

  const back = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">

      {/* Top Bar */}
      <div className="bg-white/80 backdrop-blur shadow-sm sticky top-0 z-10">
        <div className="container mx-auto max-w-7xl px-6 py-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold">Smart Catalogue</span>
            </div>
            <span className="text-sm text-gray-600">
              Step {step} of {totalSteps}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="container mx-auto max-w-2xl px-4 py-10">
        <Card className="p-6 md:p-8 space-y-6 shadow-xl border border-white/50 backdrop-blur-sm bg-white/90">
          {step === 1 && <StepBranding formData={formData} setFormData={setFormData} />}
          {step === 2 && <StepProduct products={products} setProducts={setProducts} />}
          {step === 3 && <StepAIMagic products={products} setProducts={setProducts} />}
          {step === 4 && (
            <StepTemplate
              formData={formData}
              setFormData={setFormData}
              products={products}
            />
          )}
          {step === 5 && <StepSuccess formData={formData} />}

          {/* Navigation */}
          <div className='space-y-2'>
            <div className="flex gap-3">
              {step > 1 && (
                <Button variant="outline" onClick={back} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              )}

              <Button
                onClick={next}
                disabled={!canProceed()}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white disabled:opacity-50"
              >
                {step === totalSteps ? 'Go to Dashboard' : 'Continue'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            {/* Validation Messages */}
            {step === 1 && !canProceed() && (
              <p className="text-xs text-gray-500 text-center">
                Please enter your business name to continue.
              </p>
            )}

            {step === 2 && !canProceed() && (
              <p className="text-xs text-gray-500 text-center">
                Add at least one product with an image to continue.
              </p>
            )}

            {step === 3 && !canProceed() && (
              <p className="text-xs text-gray-500 text-center">
                Please remove background for all products before continuing.
              </p>
            )}
          </div>

        </Card>
      </div>
    </div>
  );
} 