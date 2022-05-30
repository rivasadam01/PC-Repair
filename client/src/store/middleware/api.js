import axios from "axios"
import * as apiCalls from "./../actions/api"

const baseURL = process.env.REACT_APP_SERVER_URL

const api = (store) => (next) => async (action) => {
  if (action.type !== apiCalls.apiCallBegan.type) return next(action)
  const { url, method, data, onStart, onSuccess, onFailed } = action.payload

  if (onStart) store.dispatch({ type: onStart })
  next(action)

  try {
    const response = await axios.request({
      url: `${baseURL}${url}`,
      method,
      data,
    })
    store.dispatch(apiCalls.apiCallSuccess(response.data))
    if (onSuccess) store.dispatch({ type: onSuccess, payload: response.data })
  } catch (err) {
    console.log(err)
    store.dispatch(apiCalls.apiCallFailed(err.message))
    if (onFailed) store.dispatch({ type: onFailed, payload: err.message })
  }
}

export default api
