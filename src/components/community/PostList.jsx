import Post from './Post.jsx'

const PostList = ({ imageData }) => {
  return (
    <div className='flex flex-col gap-[3.91vh]'>
      {imageData.map((post, index) => (
        <div key={index}>
          <Post list={post.url} text={post.text} />
        </div>
      ))}
    </div>
  )
}

export default PostList
