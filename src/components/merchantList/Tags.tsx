const Tags = () => {
  const tags = ['Restaurants', 'Coffe Shop', 'Chinese Restaurants']
  return (
    <div className="tags-filter flex flex-wrap mt-1">
      {tags.map((tag, index) => (
        <div className="tag bg-lightgreen text-green mr-4 mb-2" key={index}>
          {tag}
        </div>
      ))}
    </div>
  )
}

export default Tags
