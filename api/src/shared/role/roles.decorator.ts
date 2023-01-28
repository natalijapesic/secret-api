import { SetMetadata } from '@nestjs/common';
import { Role } from 'core/entities';
import { ROLES_KEY } from 'shared';

export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);
