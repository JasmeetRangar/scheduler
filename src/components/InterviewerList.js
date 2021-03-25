import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";
function InterviewerList(props) {
	/**
	 * Maps over interviewers to get individual interviewer element
	 */
	const interviewers = props.interviewers.map((interviewer) => {
		return <InterviewerListItem
				key={interviewer.id}
				name={interviewer.name}
				avatar={interviewer.avatar}
				selected={interviewer.id === props.interviewer}
				setInterviewer={(event) => props.setInterviewer(interviewer.id)}
			/>
		
	});
	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list">
        {interviewers}
      </ul>
		</section>
	);
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;
