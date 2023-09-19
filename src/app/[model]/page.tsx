import ProductPage from '@/components/shop/ProductPage/ProductPage'



export default function ProductInfo({params}: any) {
  const {model} = params
  return (
   <ProductPage model={model} />
  )
}
