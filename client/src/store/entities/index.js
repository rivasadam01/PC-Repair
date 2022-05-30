import { combineReducers } from "@reduxjs/toolkit"
import tasks from "./tasks"
import oses from "./oses"
import computers from "./computers"

export default combineReducers({
  tasks,
  oses,
  computers,
})
