import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
export default function Form(props) {
	const [name, setName] = useState(props.name || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const handleNameChange = (event) => {
    setName(event.target.value); 
  }
  const reset = () => {
    setName("");
    setInterviewer(null);
  }
  const cancel = () => {
    reset();
    props.onCancel();
  }
  const save = () => {
    props.onSave(name, interviewer)
  }

	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form autoComplete="off" onSubmit={event => event.preventDefault()}>
					<input
						className="appointment__create-input text--semi-bold"
						name="name"
						type="text"
						placeholder="Enter Student Name"
						value={name}
            onChange={handleNameChange}
					/>
				</form>
				<InterviewerList
					interviewers={props.interviewers}
					interviewer={interviewer}
					setInterviewer={setInterviewer}
				/>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={cancel}>Cancel</Button>
					<Button confirm onClick={save}>Save</Button>
				</section>
			</section>
		</main>
	);
}
