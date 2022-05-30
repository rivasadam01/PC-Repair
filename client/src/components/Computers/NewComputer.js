import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addComputer } from "../../store/entities/computers"
import "./newComputer.css"

export default function NewComputer(props) {
  const dispatch = useDispatch()
  const [name, setName] = useState("John Doe")
  const [so, setSo] = useState("872")
  const [tasks, setTasks] = useState([])
  const [windows, setWindows] = useState(props.oses[0].name || "")
  const [avSerial, setAvSerial] = useState("")
  const [other, setOther] = useState("")

  useEffect(() => {
    const serverTasks = structuredClone(props.tasks)
    serverTasks.forEach((t) => (t["checked"] = false))
    setTasks(serverTasks)
  }, [props.tasks])

  const handleCheckBoxChange = (id) => {
    const tasksClone = structuredClone(tasks)
    const index = tasksClone.findIndex((task) => task._id === id)

    tasksClone[index].checked = !tasksClone[index].checked
    setTasks(tasksClone)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const tempTask = structuredClone(tasks)
    tasks.sort((t1, t2) => {
      if (t1.weight > t2.weight) return -1
      if (t1.weight < t2.weight) return 1
      return 0
    })
    dispatch(
      addComputer({
        serviceOrder: so,
        name,
        windows,
        avSerial,
        other,
        tasks: tasks.filter((t) => t.checked),
      })
    )
    props.showForm(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">SO:</label>
          <input
            className="text-input"
            type="text"
            placeholder="00872XXXXXXXXXX"
            value={so}
            onChange={(e) => setSo(e.currentTarget.value)}
          />
        </div>
        <div className="form-field">
          <label className="form-label">Name:</label>
          <input
            className="text-input"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div>
          <label className="form-label">Services to be done:</label>
        </div>
        <div className="form-field no-flex ml-2">
          {tasks.map((t) => (
            <div key={t._id}>
              <input
                className="checkbox"
                type="checkbox"
                checked={t.checked}
                onChange={() => handleCheckBoxChange(t._id)}
              />
              {t.name}
              {t.name === "Restore" && (
                <select
                  value={windows}
                  onChange={(e) => setWindows(e.currentTarget.value)}
                >
                  {props.oses.map((o) => (
                    <option key={o._id} value={o.name}>
                      {o.name}
                    </option>
                  ))}
                </select>
              )}
              {t.name === "AV" && (
                <input
                  className="text-input"
                  type="text"
                  placeholder="Serial Key"
                  value={avSerial}
                  onChange={(e) => setAvSerial(e.currentTarget.value)}
                ></input>
              )}
              {t.name === "Other" && (
                <input
                  className="text-input"
                  type="text"
                  placeholder="What needs to be done..."
                  value={other}
                  onChange={(e) => setOther(e.currentTarget.value)}
                ></input>
              )}
            </div>
          ))}
        </div>
        <div className="form-field">
          <input
            className="button button-success"
            type="submit"
            value="Add new PC"
          />
          <input
            className="button button-fail"
            type="button"
            value="Cancel"
            onClick={() => props.showForm(false)}
          />
        </div>
      </form>
    </div>
  )
}
