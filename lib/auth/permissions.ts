import { Role } from "@prisma/client";

export function canAccessDashboard(role: Role) {
  return role === Role.ADMIN || role === Role.STAFF;
}

export function canManageUsers(role: Role) {
  return role === Role.ADMIN;
}

export function canDeleteShipment(role: Role) {
  return role === Role.ADMIN;
}

export function canUpdateShipment(role: Role) {
  return role === Role.ADMIN || role === Role.STAFF;
}