"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, createOrder, tableId } = useCartStore();
  const { toast } = useToast();

  useEffect(() => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart first",
      });
      router.push("/");
    }
  }, [items, router, toast]);

  const handleProceedToPayment = () => {
    createOrder();
    router.push("/payment");
  };

  const handleBackToMenu = () => {
    const tableNumber = tableId?.split("-")[1];
    if (tableNumber) {
      router.push(`/table/${parseInt(tableNumber)}`);
    } else {
      router.push("/");
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-orange-500 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToMenu}
              className="text-white hover:bg-orange-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>{items.length} items</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-orange-600">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 border-t-2">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-orange-600">
                  {formatCurrency(getTotal())}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Options */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Payment Method</CardTitle>
              <CardDescription>Select how you'd like to pay</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleProceedToPayment}
                className="w-full h-16 text-lg bg-orange-500 hover:bg-orange-600"
              >
                <CreditCard className="mr-2 h-6 w-6" />
                Generate Payment QR
              </Button>
              <Button
                onClick={handleBackToMenu}
                variant="outline"
                className="w-full h-12"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Menu
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
