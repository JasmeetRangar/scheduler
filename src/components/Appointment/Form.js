import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
export default function Form(props) {
	//Declare states
	const [error, setError] = useState("");
	const [name, setName] = useState(props.name || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	//Input field listener
	const handleNameChange = (event) => {
		setName(event.target.value);
	};
	//Resets input field and selected interviewer
	const reset = () => {
		setName("");
		setInterviewer(null);
	};
	//Handles cancel click event
	const cancel = () => {
		reset();
		props.onCancel();
	};
	//Validate and handle save click event
	const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
		setError("");
    props.onSave(name, interviewer);
  }

	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
					<input
						className="appointment__create-input text--semi-bold"
						name="name"
						type="text"
						placeholder="Enter Student Name"
						value={name}
						onChange={handleNameChange}
						data-testid="student-name-input"
					/>
				</form>
				<section className="appointment__validation">{error}</section>
				<InterviewerList
					interviewers={props.interviewers}
					interviewer={interviewer}
					setInterviewer={setInterviewer}
				/>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					<Button confirm onClick={validate}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
