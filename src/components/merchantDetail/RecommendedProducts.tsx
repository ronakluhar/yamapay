import productImg from '../../images/hotel1.jpg'
const IMG_URL = 'http://127.0.0.1:8000/'

const RecommendedProducts = (props: any) => {
  return (
    <div>
      <h5 className="text-base my-3">Recommended</h5>
      <div className="flex flex-wrap">
        {!props.productList ? (
          <h2>No Product Available</h2>
        ) : (
          props.productList.map((product: any, index: any) => (
            <div
              className="recommended-product mr-3 mb-4 rounded-lg"
              key={index}
            >
              <img
                className="product-img"
                style={{ height: '130px', width: '150px' }}
                src={
                  product.image_url ? IMG_URL + product.image_url : productImg
                }
                alt="dish"
              />
              <h6 className="text-violet text-base product-name break-words">
                {product.name}
              </h6>
              <p className="text-violet product-desc break-words">
                {product.description}
              </p>
              <div className="flex justify-between px-2">
                <div>
                  <span className="text-green product-price">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className="product-quantity flex items-center"></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default RecommendedProducts
