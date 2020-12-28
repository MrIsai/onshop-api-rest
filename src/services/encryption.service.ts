import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePasswords = async (password_1: string, password_2: string) => {
    return await bcrypt.compare(password_1, password_2);
}