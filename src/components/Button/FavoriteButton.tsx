import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import Button from '.';

type FavoriteButtonProps = {
    liked?: boolean;
    onClick: () => void;
};

export default function FavoriteButton ({
    liked,
    onClick
}: FavoriteButtonProps) {
    return (
        <div className='max-w-10'>
            <Button onClick={onClick} type='button'>
                {!liked ? <FaRegHeart /> : <FaHeart />}
            </Button>
        </div>
    );
}
