import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SeoForm({ onSubmit, isLoading }) {
  const [platform, setPlatform] = useState('');

  const platforms = [
    { id: 'instagram', name: 'Instagram', maxLength: 2200 },
    { id: 'twitter', name: 'Twitter/X', maxLength: 280 },
    { id: 'linkedin', name: 'LinkedIn', maxLength: 3000 },
    { id: 'threads', name: 'Threads', maxLength: 500 },
    { id: 'discord', name: 'Discord', maxLength: 2000 },
    { id: 'whatsapp', name: 'WhatsApp', maxLength: 65536 },
    { id: 'facebook', name: 'Facebook', maxLength: 63206 },
    { id: 'YouTube', name: 'YouTube', maxLength: 5000 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      platform: platform,
      topic: form.elements.topic.value,
      targetAudience: form.elements.targetAudience.value,
      tone: form.elements.tone.value,
      context: form.elements.context.value || form.elements.topic.value,
    };
    await onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 shadow-xl bg-white rounded-xl">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Social Media Post Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Platform
            </label>
            <div className="relative">
              <Select
                value={platform}
                onValueChange={setPlatform}
                required
              >
                <SelectTrigger className="w-full bg-black text-white">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent
                  className="w-full min-w-[200px] bg-black"
                  position="item"
                >
                  {platforms.map((p) => (
                    <SelectItem 
                      key={p.id} 
                      value={p.id}
                      className="py-3 hover:bg-gray-800 cursor-pointer"
                    >
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Topic/Theme
            </label>
            <Input
              name="topic"
              required
              placeholder="What's your post about?"
              className="w-full bg-black text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Target Audience
            </label>
            <Input
              name="targetAudience"
              required
              placeholder="Who is your target audience?"
              className="w-full bg-black text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Tone
            </label>
            <div className="relative">
              <Select name="tone" required defaultValue="professional">
                <SelectTrigger className="w-full bg-black text-white">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent
                  className="w-full min-w-[200px] bg-black"
                  position="item"
                >
                  <SelectItem value="professional" className="py-3 hover:bg-gray-800 cursor-pointer">
                    Professional
                  </SelectItem>
                  <SelectItem value="casual" className="py-3 hover:bg-gray-800 cursor-pointer">
                    Casual
                  </SelectItem>
                  <SelectItem value="humorous" className="py-3 hover:bg-gray-800 cursor-pointer">
                    Humorous
                  </SelectItem>
                  <SelectItem value="inspirational" className="py-3 hover:bg-gray-800 cursor-pointer">
                    Inspirational
                  </SelectItem>
                  <SelectItem value="educational" className="py-3 hover:bg-gray-800 cursor-pointer">
                    Educational
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Additional Context (Optional)
            </label>
            <Textarea
              name="context"
             
              placeholder="Add any additional details or specific requirements"
              className="min-h-[120px] bg-black text-white placeholder:text-gray-400"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 font-medium text-lg shadow-md"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Post'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default SeoForm;