/*
 * @Author: zhouyou@werun
 * @Descriptions: request 和 response types 定义文件
 * @TodoList: 无
 * @Date: 2020-03-09 19:00:23
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-23 17:46:49
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
  list: T[];
}

// get Token 返回数据格式
export interface TokenResponse {
  token: string;
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
    avatar: string;
    token: string;
  };
}

// 退出登录请求参数格式
export interface LogoutParams {
  userId: number;
}

// 修改密码请求参数格式
export interface ChangePasswordParams {
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

// 请求应用列表返回数据格式
export interface AppInfo {
  appId: number;
  appLogo: string;
  appName: string;
  publishType: string;
  iterationCount: number;
  description: string;
}
export type GetAppListResponse = ListResponse<AppInfo>;

// 新建应用请求参数格式
export interface CreateAppParams {
  appName: string;
  repository: string;
  description: string;
  productType: string;
  publishType: string;
}

// 新建应用返回数据格式
export interface CreateAppResponse {
  appId: number;
}

// 获取迭代列表请求参数格式
export interface GetIterationListParams {
  userId: number;
  appName?: string;
  creator?: string;
  iterationType: string[];
  page: number;
  pageSize: number;
}

// 请求迭代列表返回数据格式
export interface IterationInfo {
  iterationId: number;
  appId: number;
  appLogo: string;
  appName: string;
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
  userId: number;
  branch: string;
  iterationName: string;
  description: string;
}

// 新建迭代返回数据格式
export interface CreateIterationResponse {
  iterationId: number;
}

// 请求我的应用列表参数格式
export interface GetMyAppListParams {
  userId: number;
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
}

// 请求用户列表返回数据格式
export interface UserInfo {
  userId: number;
  userName: string;
  userAvatar: string;
  department: string;
  post: string;
}

export type GetUserListResponse = ListResponse<UserInfo>;

// 重置密码参数格式
export interface ResetPasswordParams {
  userId: number;
}

// 删除用户参数格式
export interface DeleteUserParams {
  userId: number;
}

// 请求部门列表返回数据格式
export interface DepartmentOption {
  departmentId: number;
  departmentName: string;
}

export type GetDepartmentListResponse = ListResponse<DepartmentOption>;

// 请求职位列表返回数据格式
export interface PostOption {
  postId: number;
  postName: string;
}

export type GetPostListResponse = ListResponse<PostOption>;

// 添加用户参数格式
export interface AddUserParams {
  userName: string;
  department: number;
  post: number;
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
export interface GetAppBasicInfo {
  description: string;
  product: string;
  repository: string;
  isJoin: boolean;
  joinTime?: string;
  publishType: string;
  pagePrefix: string;
}

export type GetAppBasicInfoResponse = GetAppBasicInfo;
