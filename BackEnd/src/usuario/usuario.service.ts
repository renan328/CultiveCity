import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>) { }


  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Verifica se o e-mail já existe
    const usuarioExistente = await this.usuarioModel.findOne({ email: createUsuarioDto.email });
    if (usuarioExistente) {
      throw new BadRequestException('E-mail já está em uso');
    }

    // Criptografa a senha
    createUsuarioDto.senha = await bcrypt.hash(createUsuarioDto.senha, 10);

    const usuarioCriado = new this.usuarioModel(createUsuarioDto);
    return usuarioCriado.save();
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  async findOne(id: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(id).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(id).exec();

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    // Só valida se senha nova for enviada
    if (updateUsuarioDto.senha) {
      if (!updateUsuarioDto.senhaAtual) {
        throw new UnauthorizedException('Senha atual não informada');
      }

      const isMatch = await bcrypt.compare(updateUsuarioDto.senhaAtual, usuario.senha);
      if (!isMatch) {
        throw new UnauthorizedException('Senha atual incorreta');
      }

      const salt = await bcrypt.genSalt();
      updateUsuarioDto.senha = await bcrypt.hash(updateUsuarioDto.senha, salt);
    }

    Object.assign(usuario, updateUsuarioDto);

    await usuario.save();

    return usuario;
  }


  async remove(id: string): Promise<void> {
    const usuario = await this.usuarioModel.findByIdAndDelete(id).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioModel.findOne({ email }).exec();
  }
}