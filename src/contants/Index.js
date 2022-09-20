import CreateProjectPage from '../views/CreateProjectPage/CreateProjectPage';
import RoleManagePage from '../views/RoleManagePage/index';
import HomePage from '../views/HomePage/HomePage';
import LoginPage from '../views/LoginPage/LoginPage';
import PersonnelPage from '../views/PersonnelPage/indexGetAllUser';
import PersonnelProfilePage from '../views/PersonnelProfilePage/PersonnelProfilePage';
import ProjectDetailsPage from '../views/ProjectDetailsPage/indexProjectDetail';
import ProjectDetailsManagerPage from '../views/ProjectDetailsManagerPage/indexProjectDetail';
import ProjectPage from '../views/ProjectPage/indexGetAllProject';
import ProjectByManagerPage from '../views/ProjectByManagerPage/index';
import ProductPage from '../views/ProductPage/indexPostPage';
import ChatPage from '../views/ChatPage/ChatPage';
import WorkDetailsPage from '../views/WorkDetailsPage/WorkDetailsPage';
import EditReportPage from '../views/ProjectDetailsPage/indexGetAllReport';
import EditProjectDetailsPage from '../views/ProjectDetailsPage/EditProejectDetailsPage';
import EditProjectDetailsManagerPage from '../views/ProjectDetailsManagerPage/EditProejectDetailsPage';
import CreateRolePage from '../views/RoleManagePage/CreateRolePage';
import EditServicePage from '../views/ProductPage/EditServicePage';
import CreateProductPage from '../views/ProductPage/CreateProductPage';
import CreateBlueprintPage from '../views/ProductPage/CreateBlueprint';
import EditPersonnleProfile from '../views/PersonnelProfilePage/EditPersonnelProfile';
import CreatePersonnelPage from '../views/PersonnelPage/CreatePersonnelPage';
import CreateWorkerPage from '../views/PersonnelPage/CreateWorker';
import CreateTaskPage from '../views/TaskPage/CreateTaskProject';
import CreateReportPage from '../views/ReportPage/CreateReportProject';
import CreateReportManagerPage from '../views/ReportPageManager/CreateReportManagerProject';
import CreateRequestPage from '../views/RequestPage/CreateRequestProject';
import CreateRequestManagerPage from '../views/RequestManagerPage/CreateRequestManagerProject';
import ReportDetailPage from '../views/ReportPage/indexReportDetail';
import ReportDetailManagerPage from '../views/ReportPageManager/indexReportDetail';
import UpdateReportProject from '../views/ReportPage/UpdateReportProject';
import UpdateReportManagerProject from '../views/ReportPageManager/UpdateReportManagerProject';
import RequestDetailPage from '../views/RequestPage/RequestDetailPage';
import RequestDetailManagerPage from '../views/RequestManagerPage/RequestDetailPage';
import UpdateRequestPage from '../views/RequestPage/UpdateRequest';
import UpdateRequestManagerPage from '../views/RequestManagerPage/UpdateManagerRequest';
import UpdateTaskPage from '../views/TaskPage/UpdateTaskProject';
import TaskDetailPage from '../views/TaskPage/TaskDetailPage';
import UpdateProductPage from '../views/ProductPage/UpdateProductPage';
import CategoryPageManage from '../views/CategoryPage/indexCategoryPage';
import CreateCategoryPage from '../views/CategoryPage/CreateCategoryPage';
import UpdateCategoryPage from '../views/CategoryPage/UpdateCategoryPage';
import OTPByEmail from '../views/ForgotPassword/OTPByEmail';
import OTPByPhone from '../views/ForgotPassword/OTPByPhone';
import ResetPasswordPage from '../views/ForgotPassword/ResetPassword';
import OTPPage from '../views/ForgotPassword/OTPPage';
import UpdateWorkerPage from '../views/PersonnelPage/UpdateWorkerPage';
import UpdatePersonnelPage from '../views/PersonnelPage/UpdatePersonnelPage';
import UserProfile from '../views/UserProfile/UserProfile';
export const HOME_ROUTES = [
  // {
  //   path: '/home',
  //   name: 'Home Page',
  //   exact: true,
  //   component: HomePage,
  // },
  {
    path: '/chat',
    name: 'Chat Page',
    exact: true,
    component: ChatPage,
  },
  {
    path: '/project',
    name: 'Project Page',
    exact: true,
    component: ProjectPage,
  },
  {
    path: '/projectByManager',
    name: 'Project Manager Page',
    exact: true,
    component: ProjectByManagerPage,
  },
  {
    path: '/projectDetails/:id',
    name: 'Project Details Page',
    exact: true,
    component: ProjectDetailsPage,
  },
  {
    path: '/projectDetailsManager/:id',
    name: 'Project Details Manager Page',
    exact: true,
    component: ProjectDetailsManagerPage,
  },
  {
    path: '/reportDetails/:id',
    name: 'Report Details Page',
    exact: true,
    component: ReportDetailPage,
  },
  {
    path: '/reportDetailsManager/:id',
    name: 'Report Details Manager Page',
    exact: true,
    component: ReportDetailManagerPage,
  },
  {
    path: '/requestDetails/:id',
    name: 'Request Details Page',
    exact: true,
    component: RequestDetailPage,
  },
  {
    path: '/requestDetailsManager/:id',
    name: 'Request Details Manager Page',
    exact: true,
    component: RequestDetailManagerPage,
  },
  {
    path: '/taskDetails/:id',
    name: 'Task Details Page',
    exact: true,
    component: TaskDetailPage,
  },
  {
    path: '/createProject',
    name: 'Create Project Page',
    exact: true,
    component: CreateProjectPage,
  },
  {
    path: '/createTask/:id',
    name: 'Create Task Page',
    exact: true,
    component: CreateTaskPage,
  },
  {
    path: '/createReport/:id',
    name: 'Create Report Page',
    exact: true,
    component: CreateReportPage,
  },
  {
    path: '/createReportManager/:id',
    name: 'Create Report Manager Page',
    exact: true,
    component: CreateReportManagerPage,
  },
  {
    path: '/createRequest/:id',
    name: 'Create Request Page',
    exact: true,
    component: CreateRequestPage,
  },
  {
    path: '/createRequestManager/:id',
    name: 'Create Request Manager Page',
    exact: true,
    component: CreateRequestManagerPage,
  },
  {
    path: '/createCategory/',
    name: 'Create Category Page',
    exact: true,
    component: CreateCategoryPage,
  },
  {
    path: '/personnel',
    name: 'Personnel Page',
    exact: true,
    component: PersonnelPage,
  },
  {
    path: '/personnelProfile',
    name: 'Personnel Profile Page',
    exact: true,
    component: PersonnelProfilePage,
  },
  {
    path: '/roleManage',
    name: 'Role Manage Page',
    exact: true,
    component: RoleManagePage,
  },
  {
    path: '/categoryManage',
    name: 'Category Manage Page',
    exact: true,
    component: CategoryPageManage,
  },
  {
    path: '/updateCategory/:id',
    name: 'Update Manage Page',
    exact: true,
    component: UpdateCategoryPage,
  },
  {
    path: '/product',
    name: 'Product Page',
    exact: true,
    component: ProductPage,
  },
  {
    path: '/workDetails',
    name: 'Work Details Page',
    exact: true,
    component: WorkDetailsPage,
  },
  {
    path: '/editReport',
    name: 'Edit Report Page',
    exact: true,
    component: EditReportPage,
  },
  {
    path: '/editProjectDetails/:id',
    name: 'Edit Project Details Page',
    exact: true,
    component: EditProjectDetailsPage,
  },
  {
    path: '/editProjectDetailsManager/:id',
    name: 'Edit Project Details Page',
    exact: true,
    component: EditProjectDetailsManagerPage,
  },
  {
    path: '/updateReportDetails/:id',
    name: 'Update Report Details Page',
    exact: true,
    component: UpdateReportProject,
  },
  {
    path: '/updateReportDetailsManager/:id',
    name: 'Update Report Details Manager Page',
    exact: true,
    component: UpdateReportManagerProject,
  },
  {
    path: '/updateRequestDetails/:id',
    name: 'Update Request Details Page',
    exact: true,
    component: UpdateRequestPage,
  },
  {
    path: '/updateRequestDetailsManager/:id',
    name: 'Update Request Details Manager Page',
    exact: true,
    component: UpdateRequestManagerPage,
  },
  {
    path: '/updateTask/:id',
    name: 'Update Task  Page',
    exact: true,
    component: UpdateTaskPage,
  },
  {
    path: '/createRole',
    name: 'Create Role Page',
    exact: true,
    component: CreateRolePage,
  },
  {
    path: '/editService',
    name: 'Edit Service Page',
    exact: true,
    component: EditServicePage,
  },
  {
    path: '/createProduct',
    name: 'Create Product Page',
    exact: true,
    component: CreateProductPage,
  },
  {
    path: '/createBlueprint/:id',
    name: 'Create Blueprint Page',
    exact: true,
    component: CreateBlueprintPage,
  },
  {
    path: '/updateProduct/:id',
    name: 'Update Product Page',
    exact: true,
    component: UpdateProductPage,
  },
  {
    path: '/editPersonnelProfile',
    name: 'Edit Personnel Profile Page',
    exact: true,
    component: EditPersonnleProfile,
  },
  {
    path: '/createPersonnel',
    name: 'Create Personnel Page',
    exact: true,
    component: CreatePersonnelPage,
  },
  {
    path: '/updatePersonnel/:id',
    name: 'Update Personnel Page',
    exact: true,
    component: UpdatePersonnelPage,
  },
  {
    path: '/createWorker',
    name: 'Create Worker Page',
    exact: true,
    component: CreateWorkerPage,
  },
  {
    path: '/updateWorker/:id',
    name: 'Update Worker Page',
    exact: true,
    component: UpdateWorkerPage,
  },
  {
    path: '/updateTask',
    name: 'Update Task Page',
    exact: true,
    component: UpdateTaskPage,
  },
  {
    path: '/userProfile/:id',
    name: 'User Profile Page',
    exact: true,
    component: UserProfile,
  },
];

export const LOGIN_ROUTES = [
  {
    path: '/',
    name: 'Login Page',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/OTPByEmail',
    name: 'OTP By Email Page',
    exact: true,
    component: OTPByEmail,
  },
  {
    path: '/OTPByPhone',
    name: 'OTP By Phone Page',
    exact: true,
    component: OTPByPhone,
  },
  {
    path: '/OTPPage',
    name: 'OTP Page',
    exact: true,
    component: OTPPage,
  },
  {
    path: '/resetPassword',
    name: 'Reset Password Page',
    exact: true,
    component: ResetPasswordPage,
  },
];
