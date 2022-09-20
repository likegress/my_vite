import { ElMessage } from 'element-plus';
import {postAction} from "../utils/http"
/**
 * 用户登录
 * @param username 用户名称
 * @param password 密码
 * @param isAgree 是否同意用户协议
*/
const userLogin = async (
  username: string,
  password: string,
  isConfirmAgreement: boolean
):Promise<string> => {
  const res = await postAction("/login", { username, password, isConfirmAgreement });  
  if(!res.code){
    return res.data.token;
  }else {
    ElMessage.error(res.message);
  }
  return ''
  
};

// const userList = async (
//   username: string,
//   password: string,
//   isConfirmAgreement: boolean
// ): Promise<UserModel> => {
//   const res = await postAction("/login", {
//     username,
//     password,
//     isConfirmAgreement,
//   });
//   return res.data as UserModel[];
// };
export { userLogin };
