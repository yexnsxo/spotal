import Post from './Post.jsx'
import NoResult from '@/assets/NoResult.svg'

const PostList = ({ postData }) => {
  if (postData.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center mt-[25vh]'>
        <img src={NoResult} className='w-[28vh] h-[28vh]' />
        <p className='text-[18px] font-[Medium] text-gray-700'>올라온 게시물이 아직 없어요..</p>
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-[3.91vh]'>
      {postData.map((post) => {
        const locationName = post?.location?.name ?? null
        const emotionNames = Array.isArray(post?.emotions)
          ? post.emotions.map((e) => (typeof e === 'string' ? e : e?.name)).filter(Boolean)
          : []
        const urls = Array.isArray(post?.images) ? post.images : []
        const content = typeof post?.content === 'string' ? post.content : ''
        console.log(emotionNames)
        return (
          <div key={post.memory_id}>
            <Post
              emotionTags={emotionNames}
              locationTags={locationName}
              urllist={urls}
              text={content}
              memory_id={post.memory_id}
            />
          </div>
        )
      })}
    </div>
  )
}

export default PostList
