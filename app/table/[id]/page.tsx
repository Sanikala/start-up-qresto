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

  const { items, addItem, updateQuantity, getItemCount, setTableId } = useCartStore();
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
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-orange-500 text-white p-6 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="text-white hover:bg-orange-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-3xl">{mockRestaurant.logo}</div>
            <div>
              <h1 className="text-2xl font-bold">{mockRestaurant.name}</h1>
              <p className="text-orange-100 text-sm">Table {tableNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue={menuCategories[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            {menuCategories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuCategories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <Card className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <CardTitle className="text-lg">{item.name}</CardTitle>
                                <CardDescription className="mt-1">
                                  {item.description}
                                </CardDescription>
                              </div>
                            </div>
                            <p className="text-xl font-bold text-orange-600 mt-2">
                              {formatCurrency(item.price)}
                            </p>
                          </CardHeader>
                          <CardContent>
                            {quantity === 0 ? (
                              <Button
                                onClick={() => addItem(item)}
                                className="w-full bg-orange-500 hover:bg-orange-600"
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                Add to Order
                              </Button>
                            ) : (
                              <div className="flex items-center gap-3">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, quantity - 1)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="text-lg font-semibold w-8 text-center">
                                  {quantity}
                                </span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, quantity + 1)}
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

      {/* Floating Cart Button */}
      <AnimatePresence>
        {getItemCount() > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-6 left-0 right-0 px-4 z-50"
          >
            <Button
              onClick={() => setIsCartOpen(true)}
              className="w-full max-w-md mx-auto bg-orange-500 hover:bg-orange-600 h-14 text-lg shadow-2xl"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              View Order ({getItemCount()} items)
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
