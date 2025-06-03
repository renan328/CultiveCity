import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string) {
    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario) throw new UnauthorizedException('Usuário não encontrado');

    const match = await bcrypt.compare(senha, usuario.senha);
    if (!match) throw new UnauthorizedException('Senha incorreta');

    return usuario;
  }

  async login(email: string, senha: string) {
    const usuario = await this.validateUser(email, senha);

    const payload = { sub: usuario._id };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }
}