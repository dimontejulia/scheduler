import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerClass = classnames("li", {
    interviewers__item: props,
    "interviewers__item--selected": props.selected,
  });

  const imageClass = classnames("img", {
    "interviewers-image": props.avatar,
    "interviewers-img--selected": props.avatar.selected,
  });

  return (
    <li className={interviewerClass} onClick={props.onClick}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {props.selected && props.name}
    </li>
  );
}
