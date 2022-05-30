import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { ProductDTO } from './DTO/product.dto';



@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {
    }
    async getProducts(): Promise<Product[]>{
        const products = await this.productModel.find()
        return products;
    }

    async getproduct(productId: string): Promise<Product> {
        const productById = await this.productModel.findById(productId);
        return productById;
    }

    async createProduct(createProduct: ProductDTO): Promise<Product> {
        const newProduct = new this.productModel(createProduct);
        return await newProduct.save()
         
    }

    async deleteProduct(id: string): Promise<Product> {
        const deleteProduct = await this.productModel.findByIdAndDelete(id);
        return deleteProduct;
    }

    async updateProduct(id: string, product: ProductDTO): Promise<Product> {
        const updateProduct = await this.productModel.findByIdAndUpdate(id, product, {new: true});
        return updateProduct;
    }

}
