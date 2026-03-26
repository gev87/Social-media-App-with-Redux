import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice";


function PostAuthor() {
    const author = useSelector(selectUserById);

    return <span>by {author ? author.name : 'Unknown author'}</span>;
}

export default PostAuthor;