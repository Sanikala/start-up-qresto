"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Minus, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockRestaurant } from "@/data/restaurant";
import { mockMenuItems, menuCategories } from "@/data/menu";
import { getTableById } from "@/data/tables";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { CartDrawer } from "@/components/CartDrawer";

export default function TablePage() {
  const params = useParams();
  const router = useRouter();
  const tableNumber = parseInt(params.id as string);
  const table = getTableById(tableNumber);

  const { items, addItem, updateQuantity, getItemCount, setTableId, getTotal } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (table) {
      setTableId(table.id);
    }
  }, [table, setTableId]);

  if (!table) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Table Not Found</CardTitle>
            <CardDescription>
              The table you're looking for doesn't exist.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/")} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getItemQuantity = (itemId: string) => {
    const cartItem = items.find((i) => i.id === itemId);
    return cartItem?.quantity || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 pb-24">
      {/* Modern Header */}
      <div className="gradient-orange text-white p-6 shadow-2xl sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-4xl drop-shadow-lg">{mockRestaurant.logo}</div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold drop-shadow-md">{mockRestaurant.name}</h1>
              <p className="text-orange-100 text-sm flex items-center gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full">Table {tableNumber}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue={menuCategories[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 bg-gray-100 shadow-lg border-0 p-1 h-auto rounded-xl">
            {menuCategories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category} 
                className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 transition-all duration-200"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuCategories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockMenuItems
                  .filter((item) => item.category === category)
                  .map((item) => {
                    const quantity = getItemQuantity(item.id);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="card-hover border-0 shadow-lg overflow-hidden bg-white">
                          <div className={`h-1 ${quantity > 0 ? 'gradient-orange' : 'bg-gray-200'}`}></div>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start gap-3">
                              <div className="flex-1">
                                <CardTitle className="text-lg flex items-center gap-2">
                                  {item.name}
                                  {quantity > 0 && (
                                    <span className="text-xs gradient-orange text-white px-2 py-1 rounded-full">
                                      {quantity}x
                                    </span>
                                  )}
                                </CardTitle>
                                <CardDescription className="mt-2 text-sm leading-relaxed">
                                  {item.description}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                                {formatCurrency(item.price)}
                              </p>
                              {quantity > 0 && (
                                <p className="text-sm text-gray-500">
                                  Total: {formatCurrency(item.price * quantity)}
                                </p>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            {quantity === 0 ? (
                              <Button
                                onClick={() => addItem({ ...item, quantity: 1 })}
                                className="w-full gradient-orange text-white border-0 shadow-md hover:shadow-lg transition-all"
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                Add to Order
                              </Button>
                            ) : (
                              <div className="flex items-center gap-3 justify-center">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, quantity - 1)}
                                  className="rounded-full border-2 hover:border-orange-500 hover:text-orange-600"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="text-xl font-bold w-12 text-center bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                                  {quantity}
                                </span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, quantity + 1)}
                                  className="rounded-full border-2 hover:border-orange-500 hover:text-orange-600"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Modern Floating Cart Button */}
      <AnimatePresence>
        {getItemCount() > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-0 right-0 px-4 z-50"
          >
            <div className="max-w-md mx-auto">
              <Button
                onClick={() => setIsCartOpen(true)}
                className="w-full gradient-orange text-white border-0 h-16 text-lg shadow-2xl hover:shadow-3xl rounded-2xl flex items-center justify-between px-6"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                  <span className="font-semibold">View Order</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {getItemCount()} items
                  </span>
                  <span className="font-bold">{formatCurrency(getTotal())}</span>
                </div>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
