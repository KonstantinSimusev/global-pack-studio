// import { setCookie, getCookie } from './cookie';
// import { TIngredient, TOrder, TOrdersData, TUser } from './types';

// const URL = process.env.BURGER_API_URL;

// const checkResponse = <T>(res: Response): Promise<T> =>
//   res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

// type TServerResponse<T> = {
//   success: boolean;
// } & T;

// type TRefreshResponse = TServerResponse<{
//   refreshToken: string;
//   accessToken: string;
// }>;

// export const refreshToken = (): Promise<TRefreshResponse> =>
//   fetch(`${URL}/auth/token`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify({
//       token: localStorage.getItem('refreshToken')
//     })
//   })
//     .then((res) => checkResponse<TRefreshResponse>(res))
//     .then((refreshData) => {
//       if (!refreshData.success) {
//         return Promise.reject(refreshData);
//       }
//       localStorage.setItem('refreshToken', refreshData.refreshToken);
//       setCookie('accessToken', refreshData.accessToken);
//       return refreshData;
//     });

// export const fetchWithRefresh = async <T>(
//   url: RequestInfo,
//   options: RequestInit
// ) => {
//   try {
//     const res = await fetch(url, options);
//     return await checkResponse<T>(res);
//   } catch (err) {
//     if ((err as { message: string }).message === 'jwt expired') {
//       const refreshData = await refreshToken();
//       if (options.headers) {
//         (options.headers as { [key: string]: string }).authorization =
//           refreshData.accessToken;
//       }
//       const res = await fetch(url, options);
//       return await checkResponse<T>(res);
//     } else {
//       return Promise.reject(err);
//     }
//   }
// };

// type TAuthResponse = TServerResponse<{
//   refreshToken: string;
//   accessToken: string;
//   user: TUser;
// }>;

// export const registerUserApi = (data: TRegisterData) =>
//   fetch(`${URL}/auth/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(data)
//   })
//     .then((res) => checkResponse<TAuthResponse>(res))
//     .then((data) => {
//       if (data?.success) return data;
//       return Promise.reject(data);
//     });

// export type TLoginData = {
//   email: string;
//   password: string;
// };

// export const loginUserApi = (data: TLoginData) =>
//   fetch(`${URL}/auth/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(data)
//   })
//     .then((res) => checkResponse<TAuthResponse>(res))
//     .then((data) => {
//       if (data?.success) return data;
//       return Promise.reject(data);
//     });

// export const forgotPasswordApi = (data: { email: string }) =>
//   fetch(`${URL}/password-reset`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(data)
//   })
//     .then((res) => checkResponse<TServerResponse<{}>>(res))
//     .then((data) => {
//       if (data?.success) return data;
//       return Promise.reject(data);
//     });

// export const resetPasswordApi = (data: { password: string; token: string }) =>
//   fetch(`${URL}/password-reset/reset`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(data)
//   })
//     .then((res) => checkResponse<TServerResponse<{}>>(res))
//     .then((data) => {
//       if (data?.success) return data;
//       return Promise.reject(data);
//     });

// type TUserResponse = TServerResponse<{ user: TUser }>;

// export const getUserApi = () =>
//   fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
//     headers: {
//       authorization: getCookie('accessToken')
//     } as HeadersInit
//   });

// export const updateUserApi = (user: Partial<TRegisterData>) =>
//   fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//       authorization: getCookie('accessToken')
//     } as HeadersInit,
//     body: JSON.stringify(user)
//   });

// export const logoutApi = () =>
//   fetch(`${URL}/auth/logout`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify({
//       token: localStorage.getItem('refreshToken')
//     })
//   }).then((res) => checkResponse<TServerResponse<{}>>(res));
