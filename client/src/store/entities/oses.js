import { createSlice, createSelector } from "@reduxjs/toolkit"
import { apiCallBegan } from "./../actions/api"
import moment from "moment"

const url = "/os"

const slice = createSlice({
  name: "oses",
  initialState: {
    list: [],
    lastUpdate: null,
  },
  reducers: {
    requestOses: (oses, action) => {
      oses.lastUpdate = Date.now()
    },
    osesRecieved: (oses, action) => {
      oses.list = action.payload
    },
    requestOsesFailed: (oses, action) => {
      oses.lastUpdate = null
    },
  },
})

export default slice.reducer

const { requestOses, osesRecieved, requestOsesFailed } = slice.actions

export const getOsesFromServer = () => (dispatch, getState) => {
  const lastUpdate = getState().entities.oses.lastUpdate
  const diff = moment(lastUpdate).diff(moment(Date.now()), "minutes")

  if (diff < 10) return

  return dispatch(
    apiCallBegan({
      url,
      method: "GET",
      onStart: requestOses.type,
      onSuccess: osesRecieved.type,
      onFailed: requestOsesFailed.type,
    })
  )
}

export const getOses = createSelector(
  (state) => state.entities.oses.list,
  (oses) => oses
)
