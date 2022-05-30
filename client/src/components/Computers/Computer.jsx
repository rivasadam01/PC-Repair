import React, { Fragment } from "react"

export default function Computer({ computers }) {
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
            {computer.tasks.map((task) => (
              <Fragment key={task._id}>
                <input type="checkbox" />
                {task.name}
                {task.notes && <label> {task.notes}</label>}
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
