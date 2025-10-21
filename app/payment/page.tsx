"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Users, Banknote, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { PaymentQR } from "@/components/PaymentQR";
import { useToast } from "@/hooks/use-toast";

export default function PaymentPage() {
  const router = useRouter();
  const { currentOrder, updateOrderStatus, clearCart } = useCartStore();
  const { toast } = useToast();
  
  const [showQR, setShowQR] = useState(false);
  const [showCashModal, setShowCashModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (!currentOrder) {
      toast({
        title: "No order found",
        description: "Please place an order first",
      });
      router.push("/");
    }
  }, [currentOrder, router, toast]);

  if (!currentOrder) {
    return null;
  }

  const handlePayInFull = () => {
    setShowQR(true);
    // Simulate payment processing
    setTimeout(() => {
      setShowQR(false);
      setShowSuccessModal(true);
      updateOrderStatus("paid");
      setTimeout(() => {
        clearCart();
        router.push("/");
      }, 3000);
    }, 3000);
  };

  const handleSplitBill = () => {
    router.push(`/split?orderId=${currentOrder.id}`);
  };

  const handlePayInCash = () => {
    setShowCashModal(true);
  };

  const handleCashConfirmation = () => {
    updateOrderStatus("paid");
    setShowCashModal(false);
    toast({
      title: "Payment Confirmed",
      description: "Thank you! Your order has been marked as paid.",
    });
    setTimeout(() => {
      clearCart();
      router.push("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-orange-500 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/checkout")}
              className="text-white hover:bg-orange-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Payment</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Total Amount */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6 bg-gradient-to-br from-orange-50 to-white">
            <CardContent className="p-8 text-center">
              <p className="text-gray-600 mb-2">Total Amount</p>
              <p className="text-5xl font-bold text-orange-600">
                {formatCurrency(currentOrder.total)}
              </p>
            </CardContent>
          </Card>

          {/* Payment Options */}
          <div className="space-y-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handlePayInFull}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <CreditCard className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>Pay in Full</CardTitle>
                    <CardDescription>Generate QR code for payment</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleSplitBill}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Split Bill</CardTitle>
                    <CardDescription>Share payment with friends</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handlePayInCash}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Banknote className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Pay in Cash</CardTitle>
                    <CardDescription>Inform server for cash payment</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Payment QR Modal */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Scan to Pay</DialogTitle>
            <DialogDescription>
              Scan this QR code with your payment app
            </DialogDescription>
          </DialogHeader>
          <PaymentQR amount={currentOrder.total} orderId={currentOrder.id} />
        </DialogContent>
      </Dialog>

      {/* Cash Payment Modal */}
      <Dialog open={showCashModal} onOpenChange={setShowCashModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cash Payment</DialogTitle>
            <DialogDescription>
              Please inform your server. They'll confirm your cash payment and mark your order as paid.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Amount to pay</p>
              <p className="text-4xl font-bold text-green-600">
                {formatCurrency(currentOrder.total)}
              </p>
            </div>
            <Button
              onClick={handleCashConfirmation}
              className="w-full h-12 bg-green-600 hover:bg-green-700"
            >
              Mark as Paid (Demo)
            </Button>
            <Button
              onClick={() => setShowCashModal(false)}
              variant="outline"
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md">
          <div className="text-center py-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4"
            >
              <Check className="h-10 w-10 text-green-600" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-gray-600">Thank you for your order</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
