const ABSPATH = process.env.ABSPATH;

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
const DEALERSHIP_VISIT_REPORT_LIST = `https://www.scmibusiness.co.uk/ipadapp/dealershipvisitreportresultlist.php`
const HOME_PAGE_IMG_URL = `${ABSPATH}midbar-image.php`;

module.exports = {
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
  HOME_PAGE_IMG_URL
};
