'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">حدث خطأ ما</h2>
        <p className="text-gray-500 mb-8">
          نعتذر عن الإزعاج. يرجى المحاولة مرة أخرى.
        </p>
        <Button onClick={reset} leftIcon={<RotateCcw className="w-4 h-4" />}>
          إعادة المحاولة
        </Button>
      </div>
    </div>
  );
}
