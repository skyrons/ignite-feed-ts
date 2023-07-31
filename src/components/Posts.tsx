
import { format, formatDistanceToNow} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from './Avatar'
import { Comment } from './Comment'


import style from './Post.module.css'


interface Author {
    name: string;
    avatarUrl: string;
    role: string
}

interface Content {
    
    type: 'paragraph' | 'link',
    content: string;
}

export interface PostType {
    id: string;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface PostProps {
    post: PostType
}

export function Post ({ post }: PostProps) {

    const [comments, setComments] = useState ([
    ])

    const [newCommentText, setNewCommentText] = useState ('')
    
    const publishedDateFormat = format(post.publishedAt, "d 'de' LLLL 'as' HH:mm 'h'",{
        locale:ptBR
    })

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale:ptBR,
        addSuffix:true,
    })

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault() 

        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    function deleteComment(commentToDelete: string ) {
        const commentsWithoutDeleteOne = comments.filter(comments => {
            return comments !== commentToDelete

        })
        
        setComments(commentsWithoutDeleteOne)
    }

    function handleNewCommentInvalid (event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('EEEEEEEEEEEEEEEEEPA')
    }

    const isNewCommentEmpty = newCommentText.length === 0

    return(
        <article className={style.post}>
            <header>
                <div className={style.author}>
                    <Avatar
                        src={post.author.avatarUrl}
                    />
                    <div className={style.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormat} dateTime={post.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>
            
            <div className={style.content}>
                {post.content.map( line => {
                    if(line.type == 'paragraph'){
                        return (
                            <p key={line.content}>{line.content}</p>
                        )
                    }else if(line.type == 'link'){
                        return (
                            <p key={line.content}><a href="#">{line.content}</a></p>
                        )
                     }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className= {style.commentForm}>

                <strong>Deixe seu feedback</strong>

                <textarea 
                    name='comment'
                    placeholder='Escreva um comentário...'
                    onChange={handleNewCommentChanged}
                    value={newCommentText}
                    required
                    onInvalid={handleNewCommentInvalid}
                    />
                    

                <footer>
                    <button  disabled={isNewCommentEmpty} type="submit">
                        Publicar
                    </button>
                </footer>
            </form>
            <div className={style.commentList}>
                {comments.map(comment => {
                    return <Comment 
                        onDeleteComment={deleteComment}
                        key={comment}
                        content={comment} />
                })}
            </div>
        </article>
    )
}