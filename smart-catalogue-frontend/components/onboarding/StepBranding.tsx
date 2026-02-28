'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';
import { brandColorPresets } from '@/lib/onboardingTemplates';

export default function StepBranding({ formData, setFormData }: any) {

  return (
    <div className="space-y-6">
      <div className='text-center space-y-1'>
        <h2 className="text-3xl font-semibold">Brand your catalogue</h2>
        <p className="text-sm text-gray-500">Make it uniquely yours</p>

      </div>

      <div>
        <Label>Logo (optional)</Label>
        <div className="flex items-center gap-4 mt-2">
          <div className="relative w-20 h-20 border-2 border-dashed rounded-lg bg-gray-50">
            {formData.logo ? (
              <SmartImage src={formData.logo} alt="Logo" className="rounded-lg" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Upload />
              </div>
            )}
          </div>

          <Button
            variant="outline"
            onClick={() =>
              setFormData({
                ...formData,
                logo: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=200'
              })
            }
          >
            Upload Logo
          </Button>
        </div>
      </div>


      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label>Business Name</Label>
          <Input
            placeholder="e.g. NP Mart India"
            value={formData.businessName}
            onChange={(e) =>
              setFormData({ ...formData, businessName: e.target.value })
            }
          />

        </div>

        <div className='space-y-1'>
          <Label>Tagline (optional)</Label>
          <Input
            placeholder="e.g. Premium Flavored Drinks"
            value={formData.tagline}
            onChange={(e) =>
              setFormData({ ...formData, tagline: e.target.value })
            }
          />

        </div>

        <div className='space-y-1'>
          <Label>WhatsApp Number</Label>
          <Input
            placeholder="+91 9XXXXXXXXX"
            value={formData.whatsapp}
            onChange={(e) =>
              setFormData({ ...formData, whatsapp: e.target.value })
            }
          />
        </div>
      </div>

      {/* <div>
        <Label>Brand Color</Label>
        <div className="flex gap-2 mt-2 flex-wrap">
          {brandColorPresets.map((color: string) => (
            <button
              key={color}
              onClick={() => setFormData({ ...formData, brandColor: color })}
              className={`w-10 h-10 rounded-lg ${formData.brandColor === color ? 'ring-2 ring-purple-600 ring-offset-2' : ''
                }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <Input
          className="mt-3"
          value={formData.brandColor}
          onChange={(e) => setFormData({ ...formData, brandColor: e.target.value })}
        />
      </div> */}
    </div>
  );
}