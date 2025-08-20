import Post from './Post.jsx'

const PostList = ({ postData }) => {
  if (postData.length === 0) {
    return <p>게시글이 없습니다</p>
  }
  return (
    <div className='flex flex-col gap-[3.91vh]'>
      {postData.map((post) => {
        // console.log(post.images[0].image_url)
        return (
          <div key={post.memory_id}>
            <Post
              tag1={post.emotions}
              tag2={post.location}
              urllist={post.images[0].image_url}
              text={post.content}
            />
          </div>
        )
      })}
    </div>
  )
}

export default PostList
