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
    <div>
      <h2>Computers</h2>
      {!showNewPcForm && (
        <input
          type="button"
          value="Add New PC"
          onClick={() => setShowNewPcForm(!showNewPcForm)}
        />
      )}
      {showNewPcForm && (
        <NewComputer tasks={tasks} oses={oses} showForm={setShowNewPcForm} />
      )}
      <Computer computers={computers} />
    </div>
  )
}
