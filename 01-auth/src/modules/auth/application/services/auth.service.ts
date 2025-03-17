import * as bcrypt from "bcryptjs";

export class AuthService {
  
  static async validatePassword(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}