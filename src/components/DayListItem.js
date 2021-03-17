import React from "react";
import "components/DayListItem.scss";
let classnames = require("classnames");
export default function DayListItem(props) {
	const dayListItemClass = classnames("day-list__item", {
		"day-list__item--selected": props.selected,
		"day-list__item--full": props.spots === 0,
	});
  /**
   * 
   * @param {number of remaining spots} spots 
   * @returns output string
   */
  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots remaining";
    }
    else if (spots === 1) {
      return spots + " spot remaining";
    }
    else {
      return spots + " spots remaining";
    }
  }
  const spotsRemaining = formatSpots(props.spots);
	return (
		<li className={dayListItemClass} onClick={() => props.setDay(props.name)}>
			<h2 className="text--regular">{props.name}</h2>
			<h3 className="text--light">{spotsRemaining}</h3>
		</li>
	);
}
