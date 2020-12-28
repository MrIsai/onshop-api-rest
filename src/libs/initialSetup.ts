import Role from '../models/Role';

const ROLES: string[] = ["user", "admin", "moderator"];

export const createRoles = async () => {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;
    try {
        const values = await Promise.all(ROLES.map((r) => (new Role({ name: r }).save())));
        console.log(values);
    } catch (error) {
        console.error(error);
    }
}