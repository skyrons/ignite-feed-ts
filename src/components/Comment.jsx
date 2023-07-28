/* eslint-disable react/prop-types */
import { ThumbsUp, Trash } from 'phosphor-react';
import style from './COmment.module.css';
import { Avatar } from './Avatar';
import { useState } from 'react';

export function Comment ({ content, onDeleteComment }){

    const [likeCount, setLikeCount] = useState(0)

    function handleDeleteComment(){
        onDeleteComment(content);
    }

    function handleLikeComment() {
        setLikeCount((state)=>{
            return state + 1
        })
    }
    return (
        <div className={style.comment}>
            <Avatar      
                hasBorder={false}               
                src="https://avatars.githubusercontent.com/u/57599226?v=4" 
            />
            <div className={style.commentBox}>
                <div className={style.commentContent}>
                    <header>
                        <div className={style.authorAndTime}>
                            <strong>Hugo Souza</strong>
                            <time 
                                title='Há cerca de uma hora' 
                                dateTime='2023-07-13 08:11:51'>Há cerca de uma hora</time>
                        </div>
                        <button>
                            <Trash 
                                onClick={handleDeleteComment} 
                                size={20} 
                            />
                        </button>
                    </header>

                    <p>{content}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}