export const addOrder = async (data) => {
  try {
    return await useFetch('/api/shop/orders/', {
      method: 'POST',
      body: data
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const updateOrder = async (id, data) => {
  try {
    return await useFetch('/api/shop/orders/' + id, {
      method: 'PUT',
      body: data
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getOrder = async (id) => {
  try {
    return await useFetch('/api/shop/orders/' + id, {
      method: 'GET'
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getAllOrders = async () => {
  try {
    return await useFetch('/api/shop/orders/', {
      method: 'GET'
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteOrder = async (id) => {
  try {
    return await useFetch('/api/shop/orders/' + id, {
      method: 'DELETE'
    })
  } catch (error) {
    throw new Error(error)
  }
}
