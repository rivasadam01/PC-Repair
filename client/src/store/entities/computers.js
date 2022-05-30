import { createSlice, createSelector } from "@reduxjs/toolkit"
import moment from "moment"
import { apiCallBegan } from "./../actions/api"

const url = "/computer"

const slice = createSlice({
  name: "computers",
  initialState: {
    list: [],
    lastUpdate: null,
  },
  reducers: {
    addingComputer: (computers, action) => {},
    computerAdded: (computers, action) => {
      const index = computers.list.findIndex(
        (computer) => computer._id === action.payload._id
      )
      if (index === -1) computers.list.push(action.payload)
    },
    addingComputerFailed: (computers, action) => {},
    requestingComputers: (computers, action) => {
      computers.lastUpdate = Date.now()
    },
    computersRecieved: (computers, action) => {
      computers.list = action.payload
      computers.list.forEach((computer) => {
        const tempTask = structuredClone(computer.tasks)
        tempTask.sort((t1, t2) => {
          if (t1.weight > t2.weight) return -1
          if (t1.weight < t2.weight) return 1
          return 0
        })
        computer.tasks = tempTask
      })
    },
    requestingComputersFailed: (computers, action) => {
      computers.lastUpdate = null
    },
  },
})

export default slice.reducer

const {
  addingComputer,
  computerAdded,
  addingComputerFailed,
  requestingComputers,
  computersRecieved,
  requestingComputersFailed,
} = slice.actions

export const getComputersFromServer = () => (dispatch, getState) => {
  const lastUpdate = getState().entities.computers.lastUpdate
  const moment1 = moment(lastUpdate)
  const moment2 = moment(Date.now())
  const diff = moment2.diff(moment1, "minutes")
  if (diff < 10) return
  return dispatch(
    apiCallBegan({
      url,
      method: "GET",
      onStart: requestingComputers.type,
      onSuccess: computersRecieved.type,
      onFailed: requestingComputersFailed.type,
    })
  )
}

export const addComputer = (computer) => (dispatch, getState) => {
  const tasks = computer.tasks.map((task) => {
    if (task.name === "Restore")
      return { id: task._id, notes: computer.windows }
    if (task.name === "AV") return { id: task._id, notes: computer.avSerial }
    if (task.name === "Other") return { id: task._id, notes: computer.other }
    return { id: task._id, notes: null }
  })
  computer.tasks = tasks

  return dispatch(
    apiCallBegan({
      url,
      method: "POST",
      data: computer,
      onStart: addingComputer.type,
      onSuccess: computerAdded.type,
      onFailure: addingComputerFailed.type,
    })
  )
}

export const getComputers = createSelector(
  (state) => state.entities.computers.list,
  (computers) => computers
)
