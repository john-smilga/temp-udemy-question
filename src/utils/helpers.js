export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100)
}

export const getUniqueValues = (data, type) => {
  // console.log(type)
  let unique = data.map((items) => items[type])
  console.log(unique)
  if (type === 'spice') {
    unique = unique.flat()
  }

  return ['all', ...new Set(unique)]
}
