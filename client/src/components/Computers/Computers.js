import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getComputers,
  getComputersFromServer,
} from "../../store/entities/computers"
import { getTasks, getTasksFromServer } from "../../store/entities/tasks"
import { getOsesFromServer, getOses } from "../../store/entities/oses"
import NewComputer from "./NewComputer"
import Computer from "./Computer"
import "./computers.css"

export default function Computers() {
  const dispatch = useDispatch()
  const tasks = useSelector(getTasks)
  const oses = useSelector(getOses)
  const computers = useSelector(getComputers)
  const [showNewPcForm, setShowNewPcForm] = useState(false)

  useEffect(() => {
    dispatch(getTasksFromServer())
    dispatch(getOsesFromServer())
    dispatch(getComputersFromServer())
  }, [dispatch])
  return (
    <div className="container">
      {!showNewPcForm && (
        <input
          className="button button-success"
          type="button"
          value="Add New PC"
          onClick={() => setShowNewPcForm(!showNewPcForm)}
        />
      )}
      {showNewPcForm && (
        <NewComputer tasks={tasks} oses={oses} showForm={setShowNewPcForm} />
      )}
      <div className="computers">
        <Computer computers={computers} />
      </div>
    </div>
  )
}
