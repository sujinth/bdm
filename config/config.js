const ABSPATH = process.env.API_ABSPATH;
const LAST_UPDATED_TTM = process.env.LAST_UPDATED_TTM;

const LOGIN = `${ABSPATH}login.php`;
const CHANGE_PASSWORD = `${ABSPATH}changepassword.php`;
const FORGOT_PASSWORD = `${ABSPATH}forgotpassword.php`;
const COACHINGMODULE = `${ABSPATH}coachingmodule.php`;
const RESOURCE = `${ABSPATH}resources.php`;
const DELEARSHIP_VISIT_REPORTS = `${ABSPATH}incomplete_dealershipvisitreportstemplate.php`;
const INCOMPLETE_DEALERSHIP = `${ABSPATH}incomplete_dealership.php`;
const INCOMPLETE_ACTION = `${ABSPATH}incomplete_reportlist.php`;
const INCOMPLETE_UPDATEACTION_STATUS = `${ABSPATH}incomplete_updateactionstatus.php`;
const DEALERSHIP = `${ABSPATH}dealership.php`;
const VISITREPORTS = `${ABSPATH}dealershipvisitreportstemplate.php`;
const DEALERSHIP_VISIT_REPORT_LIST = `${ABSPATH}dealershipvisitreportresultlist.php`
const POST_DEALERSHIP_VISIT_REPORT_RESPONSE = `${ABSPATH}dealershipvisitreportresponse.php`;
const VISIT_REPORT_SEND_EMAIL = `${ABSPATH}emailapi.php`;
const HOME_PAGE_IMG_URL = `${ABSPATH}midbar-image.php`;
const NEWS = `${ABSPATH}news.php`;

module.exports = {
  LAST_UPDATED_TTM,
  LOGIN,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  COACHINGMODULE,
  RESOURCE,
  VISITREPORTS,
  DEALERSHIP,
  DELEARSHIP_VISIT_REPORTS,
  INCOMPLETE_DEALERSHIP,
  INCOMPLETE_ACTION,
  INCOMPLETE_UPDATEACTION_STATUS,
  DEALERSHIP_VISIT_REPORT_LIST,
  HOME_PAGE_IMG_URL,
  POST_DEALERSHIP_VISIT_REPORT_RESPONSE,
  VISIT_REPORT_SEND_EMAIL,
  NEWS
};
