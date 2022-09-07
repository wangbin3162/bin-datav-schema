import Group from './main.vue'

Group.install = app => {
  app.component(Group.name, Group)
}

export default Group
