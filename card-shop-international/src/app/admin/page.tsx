'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Package, ShoppingCart, Users, TrendingUp, Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0
  });

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    sku: '',
    nameEn: '',
    nameJa: '',
    categoryId: '',
    gameType: 'POKEMON',
    priceUsd: 0,
    priceJpy: 0,
    stockQuantity: 0,
    description: ''
  });

  useEffect(() => {
    fetchStats();
    fetchProducts();
  }, []);

  const fetchStats = async () => {
    // TODO: Implement stats fetching
    setStats({
      totalProducts: 42,
      totalOrders: 156,
      totalUsers: 89,
      revenue: 1250000
    });
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      
      if (response.ok) {
        await fetchProducts();
        setNewProduct({
          sku: '',
          nameEn: '',
          nameJa: '',
          categoryId: '',
          gameType: 'POKEMON',
          priceUsd: 0,
          priceJpy: 0,
          stockQuantity: 0,
          description: ''
        });
      }
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">管理画面</h1>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総商品数</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総注文数</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ユーザー数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">売上高</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{stats.revenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">商品管理</TabsTrigger>
          <TabsTrigger value="orders">注文管理</TabsTrigger>
          <TabsTrigger value="inventory">在庫管理</TabsTrigger>
          <TabsTrigger value="users">ユーザー管理</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>新規商品追加</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateProduct} className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nameEn">商品名（英語）</Label>
                  <Input
                    id="nameEn"
                    value={newProduct.nameEn}
                    onChange={(e) => setNewProduct({ ...newProduct, nameEn: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nameJa">商品名（日本語）</Label>
                  <Input
                    id="nameJa"
                    value={newProduct.nameJa}
                    onChange={(e) => setNewProduct({ ...newProduct, nameJa: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="gameType">ゲームタイプ</Label>
                  <Select
                    value={newProduct.gameType}
                    onValueChange={(value) => setNewProduct({ ...newProduct, gameType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="POKEMON">ポケモン</SelectItem>
                      <SelectItem value="ONE_PIECE">ワンピース</SelectItem>
                      <SelectItem value="DRAGON_BALL">ドラゴンボール</SelectItem>
                      <SelectItem value="YUGIOH">遊戯王</SelectItem>
                      <SelectItem value="DIGIMON">デジモン</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priceJpy">価格（円）</Label>
                  <Input
                    id="priceJpy"
                    type="number"
                    value={newProduct.priceJpy}
                    onChange={(e) => setNewProduct({ ...newProduct, priceJpy: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stockQuantity">在庫数</Label>
                  <Input
                    id="stockQuantity"
                    type="number"
                    value={newProduct.stockQuantity}
                    onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">説明</Label>
                  <Input
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <Button type="submit" className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> 商品を追加
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>商品一覧</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">SKU</th>
                      <th className="text-left py-2">商品名</th>
                      <th className="text-left py-2">価格</th>
                      <th className="text-left py-2">在庫</th>
                      <th className="text-left py-2">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product: any) => (
                      <tr key={product.id} className="border-b">
                        <td className="py-2">{product.sku}</td>
                        <td className="py-2">{product.nameJa || product.nameEn}</td>
                        <td className="py-2">¥{product.priceJpy}</td>
                        <td className="py-2">{product.stockQuantity}</td>
                        <td className="py-2">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>注文一覧</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">注文管理機能は現在開発中です。</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>在庫管理</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">在庫管理機能は現在開発中です。</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>ユーザー管理</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">ユーザー管理機能は現在開発中です。</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}