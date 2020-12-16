import React from "react";

import "components/Button.scss";
import classNames from 'classnames';

export default function Button(props) {
   let buttonClass = classNames('button', {
         'button--confirm': props.confirm,
         'button--danger': props.danger
      });
   // this is allowing us to set the classes in the button, is will always have button
   // if the value after the : evaluate to true, the key gets added, else it doesnt

   return (
      <button 
         disabled={props.disabled} 
         onClick={props.onClick} 
         className={buttonClass}
      >
      {props.children}
      </button>
   );
}
