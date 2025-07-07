import {
  BlocksRenderer,
  type BlocksContent,
} from '@strapi/blocks-react-renderer';
import * as React from 'react';

import { cn } from '@/lib/utils';

// Types for Strapi Rich Text
export interface RichTextNode {
  type: 'text' | 'paragraph' | 'quote';
  text?: string;
  bold?: boolean;
  children?: RichTextNode[];
}

export interface RichTextContent {
  type: 'paragraph' | 'quote';
  children: RichTextNode[];
}

interface RichTextProps {
  content: BlocksContent | string;
  className?: string;
}

export const RichText: React.FC<RichTextProps> = ({ content, className }) => {
  if (typeof content === 'string') {
    return (
      <div className={cn('prose prose-gray max-w-none', className)}>
        <p>{content}</p>
      </div>
    );
  }

  return (
    <div className={cn('prose prose-gray max-w-none', className)}>
      <BlocksRenderer content={content} />
    </div>
  );
};
