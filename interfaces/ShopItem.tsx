interface ShopItem {
  id: string,
  cost: number,
  name: string,
  image: string,
  quantity?: number,
  description: string
}

export default ShopItem;