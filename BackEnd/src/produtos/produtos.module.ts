import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Produto, ProdutoSchema  } from './entities/produto.entity';
@Module({
  imports: [MongooseModule.forFeature([{ name: Produto.name, schema: ProdutoSchema }])],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule { }
