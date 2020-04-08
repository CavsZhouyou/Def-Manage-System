import { type } from 'os';

/*
 * @Author: zhouyou@werun
 * @Descriptions: request 和 response types 定义文件
 * @TodoList: 无
 * @Date: 2020-03-09 19:00:23
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-29 16:10:09
 */

// 基本返回数据格式
export interface BaseResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 应用列表返回数据格式
export interface ListResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
  list: T[];
}

// get Token 返回数据格式
export interface TokenResponse {
  token: string;
}

// option 通用格式
export interface Option {
  code: string;
  name: string;
}

// 登录请求参数格式
export interface LoginParams {
  account: string;
  password: string;
}

// 登录返回数据格式
export interface LoginResponse {
  userInfo: {
    userName: string;
    userId: number;
    userAvatar: string;
    role: string;
  };
}

// 修改密码请求参数格式
export interface ChangePasswordParams {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

// 请求应用列表参数格式
export interface GetAppListParams {
  userId?: number;
  appName?: string;
  publishType: string[];
  page: number;
  pageSize: number;
}

// 通过 count 请求应用列表参数格式
export interface GetAppListByCountParams {
  userId?: number;
  appName?: string;
  publishType: string[];
  loadedCount: number;
  count: number;
}

// 请求应用列表返回数据格式
export interface AppInfo {
  appId: number;
  appLogo: string;
  appName: string;
  publishType: PublishType;
  progressingIterationCount: number;
  description: string;
}
export type GetAppListResponse = ListResponse<AppInfo>;

// 新建应用请求参数格式
export interface CreateAppParams {
  appName: string;
  repository: string;
  description: string;
  productTypeId: string;
  publishTypeId: string;
  userId: string;
}

// 新建应用返回数据格式
export interface CreateAppResponse {
  appId: number;
  appName: string;
}

// 获取迭代列表请求参数格式
export interface GetIterationListParams {
  userId: number;
  appId?: number;
  creator?: string;
  iterationStatus: string[];
  page: number;
  pageSize: number;
}

// 请求迭代列表返回数据格式
export interface IterationInfo {
  iterationId: number;
  appId: number;
  appLogo: string;
  appName: string;
  version: string;
  iterationName: string;
  createTime: string;
  endTime: string;
  branch: string;
  creator: string;
  creatorAvatar: string;
  iterationStatus: string;
  latestPublish: string;
  latestPublishStatus: string;
}

export type GetIterationListResponse = ListResponse<IterationInfo>;

// 新建迭代请求参数格式
export interface CreateIterationParams {
  appId: number;
  userId: string;
  branch: string;
  iterationName: string;
  description: string;
}

// 新建迭代返回数据格式
export interface CreateIterationResponse {
  appId: number;
  appName: string;
  iterationId: number;
  iterationName: string;
}

// 请求我的应用列表参数格式
export interface GetMyAppListParams {
  userId: string;
}

// 请求我的应用列表返回数据格式
export interface AppOption {
  appId: number;
  appName: string;
}
export interface GetMyAppListResponse {
  list: AppOption[];
}

// 请求应用分支列表参数格式
export interface GetAppBranchesParams {
  appId: number;
}

// 请求应用分支列表返回数据格式
export interface BranchOption {
  branchId: number;
  branchName: string;
}
export interface GetAppBranchesResponse {
  list: BranchOption[];
}

// 请求用户列表参数格式
export interface GetUserListParams {
  userName?: string;
  page: number;
  pageSize: number;
}

// 请求用户列表返回数据格式
export interface UserInfo {
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: UserRoleOption;
  department: DepartmentOption;
  post: PostOption;
}

export type GetUserListResponse = ListResponse<UserInfo>;

// 重置密码参数格式
export interface ResetPasswordParams {
  userId: string;
}

// 删除用户参数格式
export interface DeleteUserParams {
  userId: string;
}

// 请求用户角色列表返回数据格式
export interface UserRoleOption {
  roleId: string;
  roleName: string;
}
export interface GetUserRoleListResponse {
  list: UserRoleOption[];
}

// 请求部门列表返回数据格式
export interface DepartmentOption {
  departmentId: string;
  departmentName: string;
}
export interface GetDepartmentListResponse {
  list: DepartmentOption[];
}

// 请求产品类型列表返回数据格式
export type ProductType = Option;

export interface GetProductTypeListResponse {
  list: ProductType[];
}

// 请求产品类型列表返回数据格式
export type PublishType = Option;

export interface GetPublishTypeListResponse {
  list: PublishType[];
}

// 请求职位列表返回数据格式
export interface PostOption {
  postId: string;
  postName: string;
}

export interface GetPostListResponse {
  list: PostOption[];
}

// 添加用户参数格式
export interface AddUserParams {
  userName: string;
  userId: string;
  userRoleId: string;
  departmentId: string;
  postId: string;
}

// 新建迭代返回数据格式
export interface AddUserResponse {
  userId: number;
}

// 请求应用基本信息参数格式
export interface GetAppBasicInfoParams {
  userId: number;
  appId: number;
}

// 请求应用信息返回数据格式
export interface AppBasicInfo {
  description: string;
  product: string;
  repository: string;
  onlineAddress: string;
  isJoin: boolean;
  joinTime?: string;
  publishType: string;
  pagePrefix: string;
}

export type GetAppBasicInfoResponse = AppBasicInfo;

// 请求动态列表参数格式
export interface GetDynamicListParams {
  userId: number;
  appId?: number;
  loadedCount: number;
  count: number;
}

// 请求用户列表返回数据格式
export interface DynamicInfo {
  dynamicId: number;
  userName: string;
  userAvatar: string;
  content: string;
  operateTime: string;
}

export type GetDynamicListResponse = ListResponse<DynamicInfo>;

// 请求应用成员列表参数格式
export interface GetAppMemberListParams {
  page: number;
  pageSize: number;
}

// 请求应用成员列表返回数据格式
export interface MemberInfo {
  userId: number;
  userName: string;
  userAvatar: string;
  joinTime: string;
  expiredTime: string;
  lastPublishTime: string;
  role: string;
}

export type GetAppMemberListResponse = ListResponse<MemberInfo>;

// 删除应用成员参数格式
export interface DeleteAppMemberParams {
  appId: number;
  userId: number;
}

// 添加应用成员参数格式
export interface AddAppMemberParams {
  userName: string;
  useTime: string;
  role: string;
}

// 修改应用成员权限参数格式
export interface ChangeMemberRightsParams {
  userId: number;
  useTime: string;
  role: string;
}

// 获取发布列表请求参数格式
export interface GetPublishListParams {
  userId: number;
  appId: number;
  iterationId?: number;
  publishType: string[];
  publishEnv: string[];
  publishStatus: string[];
  publisherId?: number;
  page: number;
  pageSize: number;
}

// 请求迭代列表返回数据格式
export interface PublishInfo {
  publishId: number;
  createTime: string;
  appId: number;
  appName: string;
  iterationName: string;
  iterationId: number;
  version: string;
  publisher: string;
  publisherAvatar: string;
  commit: string;
  publishEnv: string;
  publishStatus: string;
  publishType: string;
}

export type GetPublishListResponse = ListResponse<PublishInfo>;

// 请求成员列表参数格式
export interface GetMemberOptionsParams {
  appId: number;
}

// 请求成员列表 option 返回数据格式
export interface MemberOption {
  userId: number;
  userName: string;
}

export interface GetMemberOptionsResponse {
  list: MemberOption[];
}

// 获取代码审阅列表请求参数格式
export interface GetCodeReviewListParams {
  userId: number;
  appId: number;
  page: number;
  pageSize: number;
}

// 请求迭代列表返回数据格式
export interface CodeReviewInfo {
  reviewId: number;
  createTime: string;
  appId: number;
  appName: string;
  iterationName: string;
  iterationId: number;
  reviewTitle: string;
  version: string;
  creator: string;
  creatorAvatar: string;
  reviewer: string;
  reviewerId: number;
  reviewerAvatar: string;
  reviewStatus: string;
  failReason?: string;
}

export type GetCodeReviewListResponse = ListResponse<CodeReviewInfo>;

// 审核代码发布参数格式
export interface ReviewPublishParams {
  userId: number;
  reviewId: number;
  reviewResult: 'pass' | 'fail';
  failReason?: string;
}

// 请求页面列表参数格式
export interface GetPageListParams {
  appId: number;
}

// 请求页面列表返回数据格式
export interface PageInfo {
  pageId: number;
  pageName: string;
  version: string;
  versionId: number;
  lastUpdateTime: string;
  onlineAddress: string;
}

export type GetPageListResponse = ListResponse<PageInfo>;

// 版本回滚参数格式
export interface RollbackVersionParams {
  appId: number;
  userId: number;
  rollbackVersionId: number;
}

// 修改基本设置参数格式
export interface EditBasicInfoParams {
  appId: number;
  userId: number;
  description: string;
  product: string;
}

// 修改代码审阅设置参数格式
export interface EditCodeReviewSettingParams {
  appId: number;
  userId: number;
  isOpen: boolean;
  reviewerScope: string;
}

// 获取代码审阅设置参数格式
export interface GetCodeReviewSettingParams {
  appId: number;
}

// 获取吧代码审阅设置返回数据格式
export interface GetCodeReviewSettingResponse {
  isOpen: boolean;
  reviewerScope: string;
}

// 请求迭代详情参数格式
export interface GetIterationDetailParams {
  appId: number;
  iterationId: number;
}

// 请求应用信息返回数据格式
export interface IterationDetail {
  iterationName: string;
  iterationStatus: string;
  description: string;
  createTime: string;
  branch: string;
  version: string;
  creator: string;
  master: string;
}

export type GetIterationDetailResponse = IterationDetail;

// 请求发布详情参数格式
export interface GetPublishDetailParams {
  appId: number;
  iterationId: number;
  publishId: number;
}

// 请求发布详情返回数据格式
export interface PublishDetail {
  publishId: number;
  publisher: string;
  publisherAvatar: string;
  commit: string;
  createTime: string;
  publishType: string;
  publishEnv: string;
  publishStatus: string;
  reviewId: number;
  reviewStatus: string;
  failReason?: string;
}

export type GetPublishDetailResponse = PublishDetail;

// 发起代码审阅设置参数格式
export interface ApplyCodeReviewParams {
  appId: number;
  iterationId: number;
  publishId: number;
  userId: number;
  reviewerId: number;
}

// 请求审阅者列表参数格式
export interface GetReviewerOptionsParams {
  appId: number;
}

// 请求成员列表 option 返回数据格式
export interface ReviewerOption {
  userId: number;
  userName: string;
}

export interface GetReviewerOptionsResponse {
  list: ReviewerOption[];
}

// 请求发布日志参数格式
export interface GetPublishLogParams {
  appId: number;
  iterationId: number;
  publishId: number;
}

// 请求发布日志返回数据格式
export interface PublishLog {
  log: string;
}

export type GetPublishLogResponse = PublishLog;
