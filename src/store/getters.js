const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.users.token,
  avatar: state => state.users.userInfos.staffPhoto,
  userID: state => state.users.userInfos.userId,
  name: state => state.users.userInfos.username,
  routes: state => state.users.routes,
  userInfo: state => state.users.userInfos
}
export default getters
