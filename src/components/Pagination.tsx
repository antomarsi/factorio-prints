import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"
import Button from "./Button"


interface PaginationProps {
    endPage: number
    currentPage: number
    link: string
}


const Pagination: React.FC<PaginationProps> = ({endPage, currentPage}) => {
    const isFirst = currentPage == 1;
    const isLast = endPage == 1;

    return <>
        <Button squareSm icon={<FaAngleDoubleLeft/>} disabled={isFirst}/>
        <Button squareSm icon={<FaAngleDoubleRight/>} disabled={isLast}/>
    </>
}


export default Pagination