'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { useToast } from '@/hooks/use-toast';
import { CREATE_COMMENT } from '@/lib/queries';
import { CommentData, CreateCommentResponse } from '@/lib/types';
import { useMutation } from '@apollo/client';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface CommentFormProps {
  talkId: string;
  onCommentAdded?: () => void;
  refetchComments?: () => void;
}

export function CommentForm({
  talkId,
  onCommentAdded,
  refetchComments,
}: CommentFormProps) {
  const [comment, setComment] = useState<CommentData[]>([]);
  const { toast } = useToast();

  const [createComment, { loading }] = useMutation<CreateCommentResponse>(
    CREATE_COMMENT,
    {
      onCompleted: () => {
        toast({
          title: 'Comentário enviado!',
          description: 'Seu comentário foi publicado com sucesso.',
        });
        setComment([]);
        onCommentAdded?.();
        refetchComments?.();
      },
      onError: error => {
        toast({
          title: 'Erro ao enviar comentário',
          description:
            error.message || 'Ocorreu um erro ao enviar seu comentário.',
          variant: 'destructive',
        });
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (comment.length === 0 || !comment[0]?.children?.[0]?.text?.trim()) {
      toast({
        title: 'Comentário vazio',
        description: 'Por favor, escreva um comentário antes de enviar.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createComment({
        variables: {
          input: {
            talk_id: talkId,
            comment,
          },
        },
      });
    } catch (error) {
      // Error is handled in onError callback
    }
  };

  const isEmpty = !comment.length || !comment[0]?.children?.[0]?.text?.trim();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Deixe seu comentário</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <RichTextEditor
            value={comment}
            onChange={setComment}
            placeholder="Compartilhe suas ideias sobre esta palestra..."
            disabled={loading}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading || isEmpty}
              className="min-w-[120px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Comentário'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
