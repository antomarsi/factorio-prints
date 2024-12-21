import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import Button from '.';

type LikeButtonProps = {
    liked?: boolean;
};

export default function LikeButton ({ liked }: LikeButtonProps) {
    return <div className='max-w-10'><Button>{!liked ? <FaRegHeart /> : <FaHeart />}</Button></div>;
}
