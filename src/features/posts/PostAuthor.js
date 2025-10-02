import { useSelector } from "react-redux";


function PostAuthor({ userId }) {
    const author = useSelector((state) =>
        state.users.find((user) => user.id === userId)
    );
    console.log('PostAuthoruserId', userId);

    return <span>by {author ? author.name : 'Unknown author'}</span>;
}

export default PostAuthor;