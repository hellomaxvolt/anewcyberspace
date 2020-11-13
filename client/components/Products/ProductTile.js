import React from 'react'

export default function ProductTile({imageUrl, name, price, description}) {
  return (
    <div className="product-tile">
      <img src={imageUrl} />
      <h3 className="product-name">{name}</h3>
      <p className="product-description">{description}</p>
      <h3 className="product-price">${price / 100}</h3>
    </div>
  )
}
