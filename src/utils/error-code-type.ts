export const errorCodeType = (code: string) => {
  let msg = "";
  switch (code) {
    case "401":
      break;
    case "403":
      break;
    case "404":
      msg = "访问的资源不存在";
      break;
    case "500":
      msg = "服务器内部发生错误";
      break;
    case "default":
      msg = "系统未知错误,请反馈给管理员";
      break;
    default:
      return "发生位置错误 , 请联系管理员";
  }
  return msg;
};
