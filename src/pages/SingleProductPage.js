import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default function SingleProductPage() {
  const { id } = useParams()
  const history = useHistory()
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext()

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`)
  }, [id])

  // serverless function youtube example but doesn't work
  // const [product, setProduct] = useState(null)
  // const { productID } = useParams()

  // const fetchData = async () => {
  //   try {
  //     const { data } = await axios.get(`/.netlify/functions/airtable?id=${productID}`)
  //     setProduct(data)
  //   } catch (error) {}
  //   // setLoading(false)
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  //set up effect for error
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push('/')
      }, 3000)
    }
  }, [error])

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  // console.log(product)
  const { fields } = product
  const { title, price, type, description, image, color } = fields

  // console.log(product)

  return (
    <Wrapper>
      <PageHero title={title} product />
      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          back to products
        </Link>
        <div className='product-center'>
          <ProductImages images={image} />
          <section className='content'>
            <h2>{title}</h2>
            <h5 className='price'>{price}</h5>
            <p className='desc'>{description}</p>
            <p className='info'>
              <span>Type:</span>
              {type}
            </p>
            <hr />
            {/* <AddToCart product={product}/> */}
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`
