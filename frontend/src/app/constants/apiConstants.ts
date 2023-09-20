import { environment } from '../../environments/environment';

/**
 * Constants used as API Url
*/

export const API = {
  publicAPI: 'public',
  privateAPI: 'private',
  idToken: 'idtoken',
  refereshTokenHeader: 'refreshtoken',
  authorization: 'authorization',
  tokenType: 'Bearer',
  userPermissionKey: 'userPermission',

  login: `${environment.publicApiEndPoint}/users/login`,
  //loginWithEncryption: `${environment.publicApiEndPoint}/auth`,

  // Dashboard
  getInterviewStatusChart: `${environment.publicApiEndPoint}/dashboard/getInterviewCount`,
  getInterviewDriveChart: `${environment.publicApiEndPoint}/gateway/getInterviewDriveCount`,

  //event
  getEvents: `${environment.publicApiEndPoint}/events`,
  deleteEvents: `${environment.publicApiEndPoint}/events/delete`,
  addEvents: `${environment.publicApiEndPoint}/events/add`,
  updateEvents: `${environment.publicApiEndPoint}/events/update`,

  //interview
  getInterviews: `${environment.publicApiEndPoint}/interviews`,
  deleteInterviews: `${environment.publicApiEndPoint}/interviews/delete`,
  addInterviews: `${environment.publicApiEndPoint}/interviews/add`,
  updateInterviews: `${environment.publicApiEndPoint}/interviews/update`,


  //user-profile
  getUser: `${environment.publicApiEndPoint}/users/`,
  deleteUser: `${environment.publicApiEndPoint}/users/deleteUser`,
  addUser: `${environment.publicApiEndPoint}/users/createUser`,
  updateUser: `${environment.publicApiEndPoint}/users/updateUser`,

  //profile
  getProfile: `${environment.publicApiEndPoint}/profile`,

  //candidates
  getCandidate: `${environment.publicApiEndPoint}/candidates/`,
  deleteCandidate: `${environment.publicApiEndPoint}/candidates/deleteCandidate`,
  addCandidate: `${environment.publicApiEndPoint}/candidates/createCandidate`,
  updateCandidate: `${environment.publicApiEndPoint}/candidates/updateCandidate`,

  // screening 
  getscreening : `${environment.publicApiEndPoint}/screening `,
  addscreening : `${environment.publicApiEndPoint}/screening/add`,
  
  // evaluation
  getevaluation : `${environment.publicApiEndPoint}/evaluations `,
  addevaluation : `${environment.publicApiEndPoint}/evaluations/add`,
  updateEvaluations: `${environment.publicApiEndPoint}/evaluations/update`,
  getReport: `${environment.publicApiEndPoint}/report`,


  //Dashboard
  getEventCount: `${environment.publicApiEndPoint}/dashboard/getEventsCount`,
  getInterviewCount: `${environment.publicApiEndPoint}/dashboard/getInterviewsCount`,
  getCandidateCount: `${environment.publicApiEndPoint}/dashboard/getCandidatesCount`,
  getCandidateStatus: `${environment.publicApiEndPoint}/dashboard/getCandidateStatus`,
  getUpcomingInterviews: `${environment.publicApiEndPoint}/dashboard/getUpcomingInterviews`,
  
  //interviewer
  getAllInterviewer: `${environment.publicApiEndPoint}/interviewers`,
  getInterviewer: `${environment.publicApiEndPoint}/interviewers/getInterviewers`,
  removeInterviewer: `${environment.publicApiEndPoint}/interviewers/delete`,
  updateInterviewer: `${environment.publicApiEndPoint}/interviewers/update`,
  addInterviewer: `${environment.publicApiEndPoint}/interviewers/add`
}
  

