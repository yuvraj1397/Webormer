import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/seeds/${id}`)
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                seed: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty,
            }
        })
    } catch (error) {
        const { data } = await axios.get(`/api/lendMachines/${id}`)
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                seed: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.quantity,
                qty,
            }
        })
    }

    localStorage.setItem('cartItems', JSON.stringify(getState().cartSeed.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cartSeed.cartItems))
}