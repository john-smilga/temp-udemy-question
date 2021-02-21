import React from 'react'
import axios from 'axios'


export default function AirtableItems() {

    const fetchProducts = async () => {
        
       try {
        const {data} = await axios.get('/.netlify/functions/airtable')
        // console.log(data)
       } catch (error) {
        console.log(error.response)
       }
    }

    fetchProducts()

    return (
        <div>
            <h2>Hello</h2>
        </div>
    )
}

