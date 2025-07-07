import {
  BlocksRenderer,
  type BlocksContent,
} from '@strapi/blocks-react-renderer';
import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface ExpandableRichTextProps {
  content: BlocksContent | string;
  className?: string;
}

export const ExpandableRichText: React.FC<ExpandableRichTextProps> = ({
  content,
  className,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Se o conteúdo tem mais de 4 linhas visíveis, mostra o botão
      setShowButton(
        contentRef.current.scrollHeight > contentRef.current.clientHeight + 2
      );
    }
  }, [content]);

  return (
    <div>
      <div
        ref={contentRef}
        className={cn(
          'prose prose-gray max-w-none transition-all',
          className,
          !expanded && 'line-clamp-4 overflow-hidden'
        )}
        style={{
          WebkitLineClamp: !expanded ? 4 : 'unset',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {typeof content === 'string' ? (
          <p>{content}</p>
        ) : (
          <BlocksRenderer content={content} />
        )}
      </div>
      {showButton && (
        <div className="flex justify-center">
          <button
            type="button"
            className="mt-2 mb-4 text-blue-600 hover:underline text-sm font-medium"
            onClick={() => setExpanded(e => !e)}
          >
            {expanded ? 'Ver menos' : 'Ver mais'}
          </button>
        </div>
      )}
    </div>
  );
};
