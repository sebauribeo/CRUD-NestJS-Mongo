import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ProductDTO } from './DTO/product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService
    ) {}

    @Post('/create')
    async createPost(@Res() res: any, @Body() createProduct: ProductDTO) {
        console.log(createProduct);
        const product = await this.productService.createProduct(createProduct)
        return res.status(HttpStatus.OK).json({
            message:'Product Successfully Created...',
            product
        })
    }

    @Get('/')
    async getProducts(@Res() res: any) {
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json(products)
    }

    @Get('/:productId')
    async getProductById(@Res() res: any, @Param('productId') productId: any) {
        const product = await this.productService.getproduct(productId);
        if (!product) throw new NotFoundException("Product does not exists...");
        return res.status(HttpStatus.OK).json(product) 
    }

    @Delete('/delete')
    async deleteProduct(@Res() res: any, @Query('productId') productId: any) {
        const deleteProduct = await this.productService.deleteProduct(productId);
        if (!deleteProduct) throw new NotFoundException("Product does not exists...");
        return res.status(HttpStatus.OK).json({
            message: 'Product deleted successfully',
            deleteProduct
        }) 
    }

    @Put('/update')
    async updateProduct(@Res() res: any, @Body() product: ProductDTO, @Query('productId') productId: any) {
        const updateProduct = await this.productService.updateProduct(productId, product);
        if (!updateProduct) throw new NotFoundException("Product does not exists...");
        return res.status(HttpStatus.OK).json({
            message: 'Product updated successfully',
            updateProduct
        }) 
    }
}
