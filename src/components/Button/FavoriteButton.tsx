import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import Button from '.';

type FavoriteButtonProps = {
    liked?: boolean;
};

export default function FavoriteButton ({ liked }: FavoriteButtonProps) {
    return <div className='max-w-10'><Button>{!liked ? <FaRegHeart /> : <FaHeart />}</Button></div>;
}
