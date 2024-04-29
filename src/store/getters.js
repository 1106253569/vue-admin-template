const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  users: state => state.user.users,
  type: state => state.user.type,
  info: state => state.user.info,
}
export default getters
