import request from '@/utils/request'
import { t } from '@/utils/admin-language'

function translateRole(role) {
  const roleMap = {
    admin: {
      name: 'roleAdminName',
      description: 'roleAdminDescription'
    },
    editor: {
      name: 'roleEditorName',
      description: 'roleEditorDescription'
    },
    visitor: {
      name: 'roleVisitorName',
      description: 'roleVisitorDescription'
    }
  }

  const roleText = roleMap[role.key]

  if (!roleText) {
    return role
  }

  return {
    ...role,
    name: t(roleText.name),
    description: t(roleText.description)
  }
}

export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/vue-element-admin/roles',
    method: 'get'
  }).then(res => {
    if (res && Array.isArray(res.data)) {
      res.data = res.data.map(role => translateRole(role))
    }

    return res
  })
}

export function addRole(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}