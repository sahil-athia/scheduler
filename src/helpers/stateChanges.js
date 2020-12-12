// export function save(name, interviewer) {
//   transition(SAVING)
//   setTimeout(() => {
//     const interview = {
//       student: name,
//       interviewer
//     };

//     props.bookInterview(props.id, interview)
//     .then(transition(SHOW))
//   }, 1000)

// }

// export function deleteConfirm() {
//   transition(DELETING)
//   setTimeout(() => {
//     props.cancelInterview(props.id)
//     .then(transition(EMPTY))
//   }, 1000)
// }

// export function deleteCancel() {
//   transition(SHOW)
// }

// export function showConfirm() {
//   transition(CONFIRM)
// }