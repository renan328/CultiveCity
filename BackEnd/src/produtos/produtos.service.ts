import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Produto, ProdutoDocument } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutosService {
    constructor(
        @InjectModel(Produto.name) private produtoModel: Model<ProdutoDocument>,
    ) { }

    async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
        const novoProduto = new this.produtoModel(createProdutoDto);
        return novoProduto.save();
    }

    async findAll(): Promise<Produto[]> {
        return this.produtoModel.find().exec();
    }

    async findOne(id: string): Promise<Produto> {
        const produto = await this.produtoModel.findById(id).exec();
        if (!produto) {
            throw new NotFoundException('Produto não encontrado');
        }
        return produto;
    }

    async update(id: string, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
        const produtoAtualizado = await this.produtoModel.findByIdAndUpdate(
            id,
            updateProdutoDto,
            { new: true },
        );
        if (!produtoAtualizado) {
            throw new NotFoundException('Produto não encontrado');
        }
        return produtoAtualizado;
    }

    async remove(id: string): Promise<void> {
        const resultado = await this.produtoModel.findByIdAndDelete(id);
        if (!resultado) {
            throw new NotFoundException('Produto não encontrado');
        }
    }
}