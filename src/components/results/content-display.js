import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Copy } from 'lucide-react';

export function ContentDisplay({ content }) {
  const sections = content.split('\n\n').filter(Boolean);

  // Function to extract different sections of content
  const getContentSections = () => {
    const result = {
      description: [],
      hashtags: [],
      tags: '',
      recommendations: []
    };

    let currentSection = '';
    sections.forEach((section) => {
      if (section.includes('Tags:')) {
        result.tags = section
          .replace('Tags:', '')
          .split('\n')
          .map(tag => tag.trim().replace(/^\d+\.\s*/, ''))
          .filter(Boolean)
          .join(', ');
      } else if (section.includes('Recommendations:') || section.includes('Platform-specific recommendations:')) {
        result.recommendations.push(
          section.replace('Recommendations:', '').replace('Platform-specific recommendations:', '').trim()
        );
      } else if (section.includes('#')) {
        result.hashtags.push(section);
      } else {
        result.description.push(section);
      }
    });

    return result;
  };
console.log(sections);
console.log(getContentSections());
  const { description, hashtags, tags, recommendations } = getContentSections();
  const fullDescription = [...description, ...hashtags].join('\n\n');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="w-full bg-white shadow-xl rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <CardTitle className="text-2xl font-bold text-center">
          Generated Content
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Description Section */}
        <div className="space-y-4 bg-gray-50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Description
            </h3>
            <button
              onClick={() => handleCopy(fullDescription)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all group"
            >
              <Copy size={18} className="group-hover:scale-110 transition-transform" />
              Copy Description
            </button>
          </div>
          <div className="prose max-w-none">
            {description.map((section, index) => (
              <p key={`desc-${index}`} className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">
                {section}
              </p>
            ))}
          </div>
        </div>

        {/* Hashtags Section */}
        {hashtags.length > 0 && (
          <div className="space-y-4 bg-gray-50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Hashtags
              </h3>
              <button
                onClick={() => handleCopy(hashtags.join('\n'))}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all group"
              >
                <Copy size={18} className="group-hover:scale-110 transition-transform" />
                Copy Hashtags
              </button>
            </div>
            <div className="text-blue-600 space-y-2">
              {hashtags.map((hashtag, index) => (
                <p key={`hash-${index}`} className="whitespace-pre-wrap leading-relaxed">
                  {hashtag}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Tags Section */}
        {tags && (
          <div className="space-y-4 bg-gray-50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Tags
              </h3>
              <button
                onClick={() => handleCopy(tags)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all group"
              >
                <Copy size={18} className="group-hover:scale-110 transition-transform" />
                Copy Tags
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {tags}
            </p>
          </div>
        )}

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="space-y-4 bg-gray-50 rounded-xl p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Recommendations
              </h3>
            </div>
            <div className="text-gray-700 space-y-4">
              {recommendations.map((rec, index) => (
                <p key={`rec-${index}`} className="whitespace-pre-wrap leading-relaxed">
                  {rec}
                </p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ContentDisplay;