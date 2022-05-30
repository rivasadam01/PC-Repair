import React, { Fragment } from "react"
import moment from "moment"
import "./computer.css"

export default function Computer({ computers }) {
  const getAge = (createdAt) => {
    return {
      days: moment().diff(moment(createdAt), "days"),
      hours: moment().diff(moment(createdAt), "hours"),
      minutes: moment().diff(moment(createdAt), "minutes"),
    }
  }
  return (
    <div>
      {computers.map((computer) => (
        <div className="computerContainer" key={computer._id}>
          <div className="field-seperator">
            <label>SO:</label>
            {computer.serviceOrder}
          </div>
          <div className="field-seperator">
            <label>Client:</label>
            {computer.name}
          </div>
          <div className="field-seperator">
            <label>Repair Age:</label>
            {getAge(computer.createdAt).days}d.
            {getAge(computer.createdAt).hours}
            h.{getAge(computer.createdAt).minutes}m
          </div>
          <div className="field-seperator">
            {computer.tasks.map((task) => (
              <Fragment key={task._id}>
                <input className="checkbox" type="checkbox" />
                {task.name}
                {task.notes && <span> {task.notes}</span>}
                {task.name === "DB" && (
                  <input className="text-input" type="text" />
                )}
              </Fragment>
            ))}
          </div>
          <div className="field-seperator">
            <textarea></textarea>
          </div>
        </div>
      ))}
    </div>
  )
}
