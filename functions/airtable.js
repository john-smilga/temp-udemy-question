require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('app8KYi4JU3zJeZiJ')
  .table('takeout')

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters
  if (id) {
    try {
      const product = await airtable.retrieve(id)
      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id: ${id}`,
        }
      }
      return {
        statusCode: 200,
        body: JSON.stringify(product),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Server Error`,
      }
    }
  }
    
  try {
    const {records} = await airtable.list()
    // console.log(records)
    const takeout  = records.map((product) => {
      const { id } = product
      const { title, image, price, description, category, spice } = product.fields
      const url = image[0].url
      return { id, title, url, price, description, category, spice }
      console.log(spice)
    })
    return {
      statusCode: 200,
      body: JSON.stringify(takeout),
    
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: "Server Error",
    }
  }
}
