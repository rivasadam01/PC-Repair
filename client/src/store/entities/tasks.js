import { createSlice, createSelector } from "@reduxjs/toolkit"
import moment from "moment"
import { apiCallBegan } from "./../actions/api"

const url = `/task`

const slice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    lastUpdate: false,
  },
  reducers: {
    tasksRequested: (tasks, action) => {
      tasks.lastUpdate = Date.now()
    },
    tasksRecieved: (tasks, action) => {
      tasks.list = action.payload
    },
    tasksRequestFailed: (tasks, action) => {
      tasks.lastUpdate = null
    },
  },
})

const { tasksRequested, tasksRecieved, tasksRequestFailed } = slice.actions
export default slice.reducer

export const getTasksFromServer = () => (dispatch, getState) => {
  const { lastUpdate } = getState().entities.tasks
  const moment1 = moment(new Date(lastUpdate))
  const moment2 = moment(new Date())

  const diff = moment2.diff(moment1, "minutes")
  if (diff < 10) return

  return dispatch(
    apiCallBegan({
      url,
      method: "GET",
      onStart: tasksRequested.type,
      onSuccess: tasksRecieved.type,
      onFailed: tasksRequestFailed.type,
    })
  )
}

export const getTasks = createSelector(
  (state) => state.entities.tasks.list,
  (tasks) => tasks
)
