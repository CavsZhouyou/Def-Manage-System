/*
 * @Author: zhouyou@werun
 * @Descriptions: 接口 api 定义文件
 * @TodoList: 无
 * @Date: 2020-03-09 17:00:55
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-29 12:01:50
 */

import axios from './request';
import {
  TokenResponse,
  BaseResponse,
  LoginResponse,
  LoginParams,
  LogoutParams,
  ChangePasswordParams,
  GetAppListParams,
  GetAppListResponse,
  CreateAppParams,
  CreateAppResponse,
  GetIterationListParams,
  GetIterationListResponse,
  CreateIterationParams,
  CreateIterationResponse,
  GetMyAppListParams,
  GetMyAppListResponse,
  GetAppBranchesParams,
  GetAppBranchesResponse,
  GetUserListResponse,
  GetUserListParams,
  ResetPasswordParams,
  DeleteUserParams,
  GetDepartmentListResponse,
  GetPostListResponse,
  AddUserParams,
  AddUserResponse,
  GetAppBasicInfoParams,
  GetAppBasicInfoResponse,
  GetDynamicListParams,
  GetDynamicListResponse,
  GetAppMemberListParams,
  GetAppMemberListResponse,
  DeleteAppMemberParams,
  AddAppMemberParams,
  ChangeMemberRightsParams,
  GetPublishListParams,
  GetPublishListResponse,
  GetMemberOptionsParams,
  GetMemberOptionsResponse,
  GetCodeReviewListParams,
  GetCodeReviewListResponse,
  ReviewPublishParams,
  GetPageListParams,
  GetPageListResponse,
  RollbackVersionParams,
  EditBasicInfoParams,
  EditCodeReviewSettingParams,
  GetCodeReviewSettingParams,
  GetCodeReviewSettingResponse,
  GetIterationDetailParams,
  GetIterationDetailResponse,
  GetPublishDetailResponse,
  GetPublishDetailParams,
  ApplyCodeReviewParams,
  GetReviewerOptionsParams,
  GetReviewerOptionsResponse,
  GetPublishLogParams,
  GetPublishLogResponse
} from './types';

export function getToken(): Promise<BaseResponse<TokenResponse>> {
  return axios.get<TokenResponse>('/def/getToken');
}

/**
 * 登录请求
 */
export function loginRequest(
  params: LoginParams
): Promise<BaseResponse<LoginResponse>> {
  return axios.post<LoginResponse>('/def/auth/login', { ...params });
}

/**
 * 退出登录请求
 */
export function logoutRequest(
  params: LogoutParams
): Promise<BaseResponse<void>> {
  return axios.post<void>('/def/auth/logout', { ...params });
}

/**
 * 修改密码请求
 */
export function changePasswordRequest(
  params: ChangePasswordParams
): Promise<BaseResponse<void>> {
  return axios.post<void>('/def/user/changePassword', { ...params });
}

/**
 * 获取应用列表请求
 */
export function getAppListRequest(
  params: GetAppListParams
): Promise<BaseResponse<GetAppListResponse>> {
  return axios.post<GetAppListResponse>('/def/app/getAppList', { ...params });
}

/**
 * 创建应用请求
 */
export function createAppRequest(
  params: CreateAppParams
): Promise<BaseResponse<CreateAppResponse>> {
  return axios.post<CreateAppResponse>('/def/app/createApp', { ...params });
}

/**
 * 获取迭代列表请求
 */
export function getIterationListRequest(
  params: GetIterationListParams
): Promise<BaseResponse<GetIterationListResponse>> {
  return axios.post<GetIterationListResponse>(
    '/def/iteration/getIterationList',
    {
      ...params
    }
  );
}

/**
 * 创建迭代请求
 */
export function createIterationRequest(
  params: CreateIterationParams
): Promise<BaseResponse<CreateIterationResponse>> {
  return axios.post<CreateIterationResponse>('/def/iteration/createIteration', {
    ...params
  });
}

/**
 * 获取我的应用列表请求
 */
export function getMyAppListRequest(
  params: GetMyAppListParams
): Promise<BaseResponse<GetMyAppListResponse>> {
  return axios.post<GetMyAppListResponse>('/def/app/getMyAppList', {
    ...params
  });
}

/**
 * 获取应用分支列表请求
 */
export function getAppBranchesRequest(
  params: GetAppBranchesParams
): Promise<BaseResponse<GetAppBranchesResponse>> {
  return axios.post<GetAppBranchesResponse>('/def/app/getAppBranches', {
    ...params
  });
}

/**
 * 获取用户列表请求
 */
export function getUserListRequest(
  params: GetUserListParams
): Promise<BaseResponse<GetUserListResponse>> {
  return axios.post<GetUserListResponse>('/def/user/getUserList', {
    ...params
  });
}

/**
 * 重置密码请求
 */
export function resetPasswordRequest(
  params: ResetPasswordParams
): Promise<BaseResponse<void>> {
  return axios.post<void>('/def/user/resetPassword', { ...params });
}

/**
 * 删除用户请求
 */
export function deleteUserRequest(
  params: DeleteUserParams
): Promise<BaseResponse<void>> {
  return axios.post<void>('/def/user/deleteUser', { ...params });
}

/**
 * 获取部门列表请求
 */
export function getDepartmentListRequest(): Promise<
  BaseResponse<GetDepartmentListResponse>
> {
  return axios.get<GetDepartmentListResponse>(
    '/def/constants/getDepartmentList'
  );
}

/**
 * 获取职位列表请求
 */
export function getPostListRequest(): Promise<
  BaseResponse<GetPostListResponse>
> {
  return axios.get<GetPostListResponse>('/def/constants/getPostList');
}

/**
 * 添加用户请求
 */
export function addUserRequest(
  params: AddUserParams
): Promise<BaseResponse<AddUserResponse>> {
  return axios.post<AddUserResponse>('/def/user/addUser', { ...params });
}

/**
 * 获取应用基本信息请求
 */
export function getAppBasicInfoRequest(
  params: GetAppBasicInfoParams
): Promise<BaseResponse<GetAppBasicInfoResponse>> {
  return axios.post<GetAppBasicInfoResponse>('/def/app/getAppBasicInfo', {
    ...params
  });
}
/**
 * 获取动态列表请求
 */
export function getDynamicListRequest(
  params: GetDynamicListParams
): Promise<BaseResponse<GetDynamicListResponse>> {
  return axios.post<GetDynamicListResponse>('/def/dynamic/getDynamicList', {
    ...params
  });
}

/**
 * 获取应用成员列表请求
 */
export function getAppMemberListRequest(
  params: GetAppMemberListParams
): Promise<BaseResponse<GetAppMemberListResponse>> {
  return axios.post<GetAppMemberListResponse>('/def/member/getAppMemberList', {
    ...params
  });
}

/**
 * 删除用户请求
 */
export function deleteAppMemberRequest(
  params: DeleteAppMemberParams
): Promise<BaseResponse<void>> {
  return axios.post<void>('/def/member/deleteAppMember', { ...params });
}

/**
 * 添加应用成员请求
 */
export function addAppMemberRequest(
  params: AddAppMemberParams
): Promise<BaseResponse<void>> {
  return axios.post<void>('/def/member/addAppMember', { ...params });
}

/**
 * 修改应用成员权限请求
 */
export function changeMemberRightsRequest(
  params: ChangeMemberRightsParams
): Promise<BaseResponse<void>> {
  return axios.post<void>('/def/member/changeMemberRights', { ...params });
}

/**
 * 获取发布列表请求
 */
export function getPublishListRequest(
  params: GetPublishListParams
): Promise<BaseResponse<GetPublishListResponse>> {
  return axios.post<GetPublishListResponse>('/def/publish/getAppPublishList', {
    ...params
  });
}

/**
 * 获取应用成员 options 请求
 */
export function getMemberOptionsRequest(
  params: GetMemberOptionsParams
): Promise<BaseResponse<GetMemberOptionsResponse>> {
  return axios.post<GetMemberOptionsResponse>(
    '/def/member/getAppMemberOptions',
    {
      ...params
    }
  );
}

/**
 * 获取代码审核记录请求
 */
export function getCodeReviewListRequest(
  params: GetCodeReviewListParams
): Promise<BaseResponse<GetCodeReviewListResponse>> {
  return axios.post<GetCodeReviewListResponse>(
    '/def/review/getCodeReviewList',
    {
      ...params
    }
  );
}

/**
 * 审核发布请求
 */
export function reviewPublishRequest(
  params: ReviewPublishParams
): Promise<BaseResponse<void>> {
  return axios.post<void>('/def/review/reviewPublish', { ...params });
}

/**
 * 获取页面列表请求
 */
export function getPageListRequest(
  params: GetPageListParams
): Promise<BaseResponse<GetPageListResponse>> {
  return axios.post<GetPageListResponse>('/def/getPageList', {
    ...params
  });
}

/**
 * 版本回退请求
 */
export function rollbackVersionRequest(
  params: RollbackVersionParams
): Promise<BaseResponse<void>> {
  return axios.post<void>('/def/app/rollbackVersion', { ...params });
}

/**
 * 修改应用基本信息请求
 */
export function editBasicInfoRequest(
  params: EditBasicInfoParams
): Promise<BaseResponse<void>> {
  return axios.post<void>('/def/app/editBasicInfo', { ...params });
}

/**
 * 获取代码审阅设置请求
 */
export function getCodeReviewSettingRequest(
  params: GetCodeReviewSettingParams
): Promise<BaseResponse<GetCodeReviewSettingResponse>> {
  return axios.post<GetCodeReviewSettingResponse>(
    '/def/setting/getCodeReviewSetting',
    {
      ...params
    }
  );
}

/**
 * 修改代码审阅设置请求
 */
export function editCodeReviewSettingRequest(
  params: EditCodeReviewSettingParams
): Promise<BaseResponse<void>> {
  return axios.post<void>('/def/setting/editCodeReviewSetting', { ...params });
}

/**
 * 获取迭代详情请求
 */
export function getIterationDetailRequest(
  params: GetIterationDetailParams
): Promise<BaseResponse<GetIterationDetailResponse>> {
  return axios.post<GetIterationDetailResponse>(
    '/def/iteration/getIterationDetail',
    {
      ...params
    }
  );
}

/**
 * 获取发布详情请求
 */
export function getPublishDetailRequest(
  params: GetPublishDetailParams
): Promise<BaseResponse<GetPublishDetailResponse>> {
  return axios.post<GetPublishDetailResponse>('/def/publish/getPublishDetail', {
    ...params
  });
}

/**
 * 申请代码审阅请求
 */
export function applyCodeReviewRequest(
  params: ApplyCodeReviewParams
): Promise<BaseResponse<void>> {
  return axios.post<void>('/def/review/applyCodeReview', { ...params });
}

/**
 * 获取审阅人 options 请求
 */
export function getReviewerOptionsRequest(
  params: GetReviewerOptionsParams
): Promise<BaseResponse<GetReviewerOptionsResponse>> {
  return axios.post<GetReviewerOptionsResponse>(
    '/def/review/getReviewerOptions',
    {
      ...params
    }
  );
}

/**
 * 获取发布日志请求
 */
export function getPublishLogRequest(
  params: GetPublishLogParams
): Promise<BaseResponse<GetPublishLogResponse>> {
  return axios.post<GetPublishLogResponse>('/def/publish/getPublishLog', {
    ...params
  });
}
