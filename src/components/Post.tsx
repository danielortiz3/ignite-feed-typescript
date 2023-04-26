import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}
interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState(["Daora"]);

  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLL 'às' HH:mm'h'", {
    locale: ptBR
  });

  const publishedDateRalativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    
    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  function deleteComment(commentsToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comments => {
      return comments !== commentsToDelete
    });

    setComments(commentsWithoutDeletedOne);
  }

  return (
    <article className={styles.post}>
      {/* Cabeçalho */}
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl}/>          
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRalativeToNow}
        </time>
      </header>
      {/* Conteúdo */}
      <div className={styles.content}>
        {post.content.map(line => {
          if(line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a href="#">{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário..."
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Comentar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
       {comments.map(comment => {
        return (
          <Comment 
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        )
      })}
      </div>
    </article>
  )
}