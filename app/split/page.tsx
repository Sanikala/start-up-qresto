"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Share2, Check, DollarSign, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";

export default function SplitBillPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { toast } = useToast();

  const { currentOrder, splitPayment, initializeSplitPayment, addContribution, setSplitMode, clearCart, updateOrderStatus } = useCartStore();
  
  const [splitMode, setSplitModeLocal] = useState<'even' | 'itemized'>('even');
  const [splitAmount, setSplitAmount] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(2);
  const [showShareQR, setShowShareQR] = useState(false);
  const [contributorName, setContributorName] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (!currentOrder || !orderId) {
      toast({
        title: "No order found",
        description: "Please place an order first",
      });
      router.push("/");
      return;
    }

    if (!splitPayment) {
      initializeSplitPayment(orderId, currentOrder.total, 'even');
    }
  }, [currentOrder, orderId, splitPayment, initializeSplitPayment, router, toast]);

  useEffect(() => {
    if (currentOrder) {
      if (splitMode === 'even') {
        setSplitAmount(currentOrder.total / numberOfPeople);
      }
    }
  }, [currentOrder, numberOfPeople, splitMode]);

  useEffect(() => {
    if (splitMode === 'itemized' && selectedItems.length > 0 && currentOrder) {
      const total = selectedItems.reduce((sum, itemId) => {
        const orderItem = currentOrder.items.find(i => i.id === itemId);
        return sum + (orderItem ? orderItem.price * orderItem.quantity : 0);
      }, 0);
      setSplitAmount(total);
    }
  }, [selectedItems, currentOrder, splitMode]);

  if (!currentOrder || !splitPayment) {
    return null;
  }

  const progressPercentage = (splitPayment.paidAmount / splitPayment.totalAmount) * 100;
  const remainingAmount = splitPayment.totalAmount - splitPayment.paidAmount;
  const isFullyPaid = progressPercentage >= 100;

  const handleSplitModeChange = (mode: 'even' | 'itemized') => {
    setSplitModeLocal(mode);
    setSplitMode(mode);
    setSelectedItems([]);
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleAddContribution = () => {
    if (!contributorName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name",
      });
      return;
    }

    if (splitMode === 'itemized' && selectedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select the items you want to pay for",
      });
      return;
    }
    
    const amountToAdd = Math.min(splitAmount, remainingAmount);
    const itemNames = splitMode === 'itemized' 
      ? selectedItems.map(id => currentOrder.items.find(i => i.id === id)?.name || '').filter(Boolean)
      : [];

    addContribution(contributorName, amountToAdd, itemNames);
    setContributorName("");
    setSelectedItems([]);
    
    toast({
      title: "Contribution added! 🎉",
      description: `${contributorName} paid ${formatCurrency(amountToAdd)}`,
    });

    if (splitPayment.paidAmount + amountToAdd >= splitPayment.totalAmount) {
      setTimeout(() => {
        updateOrderStatus("paid");
        toast({
          title: "Payment Complete! ✨",
          description: "Bill fully paid. Thank you!",
        });
        setTimeout(() => {
          clearCart();
          router.push("/");
        }, 2000);
      }, 1000);
    }
  };

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/split?orderId=${orderId}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Modern Header */}
      <div className="gradient-blue text-white p-6 shadow-2xl">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/payment")}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold drop-shadow-md">Split Bill</h1>
              <p className="text-blue-100 text-sm">Choose your payment method</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Total & Progress */}
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 gradient-blue"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                Bill Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <span className="text-gray-600 font-medium">Total Bill</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {formatCurrency(splitPayment.totalAmount)}
                </span>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">Payment Progress</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(splitPayment.paidAmount)} / {formatCurrency(splitPayment.totalAmount)}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-4" />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {progressPercentage.toFixed(0)}% paid
                </p>
              </div>

              {!isFullyPaid && (
                <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-5 rounded-xl border-2 border-orange-200">
                  <p className="text-sm text-gray-600 mb-1 font-medium">Remaining to pay</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                    {formatCurrency(remainingAmount)}
                  </p>
                </div>
              )}

              {isFullyPaid && (
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl flex items-center gap-3 border-2 border-green-200"
                >
                  <div className="w-12 h-12 gradient-green rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-green-800 text-lg">Fully Paid! 🎉</p>
                    <p className="text-sm text-green-600">All contributions received</p>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Split Mode Selection */}
          {!isFullyPaid && (
            <Card className="border-0 shadow-xl">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <CardHeader>
                <CardTitle className="text-xl">Choose Split Method</CardTitle>
                <CardDescription>How would you like to split the bill?</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={splitMode} onValueChange={(v) => handleSplitModeChange(v as 'even' | 'itemized')}>
                  <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 h-auto">
                    <TabsTrigger 
                      value="even" 
                      className="data-[state=active]:gradient-blue data-[state=active]:text-white rounded-lg py-3 flex items-center gap-2"
                    >
                      <DollarSign className="h-4 w-4" />
                      Split Evenly
                    </TabsTrigger>
                    <TabsTrigger 
                      value="itemized" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg py-3 flex items-center gap-2"
                    >
                      <Receipt className="h-4 w-4" />
                      Pay for Items
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="even" className="mt-6 space-y-4">
                    <div className="flex items-center justify-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setNumberOfPeople(Math.max(2, numberOfPeople - 1))}
                        className="w-14 h-14 rounded-full border-2 hover:border-blue-500 hover:bg-blue-50"
                      >
                        <span className="text-2xl">-</span>
                      </Button>
                      <div className="text-center min-w-[120px]">
                        <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {numberOfPeople}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">people</p>
                      </div>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setNumberOfPeople(numberOfPeople + 1)}
                        className="w-14 h-14 rounded-full border-2 hover:border-blue-500 hover:bg-blue-50"
                      >
                        <span className="text-2xl">+</span>
                      </Button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl text-center border-2 border-blue-100 shadow-lg">
                      <p className="text-sm text-gray-600 mb-2 font-medium">Each person pays</p>
                      <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {formatCurrency(splitAmount)}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="itemized" className="mt-6 space-y-4">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                      <p className="text-sm text-gray-700 mb-3 font-medium">
                        Select the items you want to pay for:
                      </p>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {currentOrder.items.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => toggleItemSelection(item.id)}
                            className={`p-3 rounded-lg cursor-pointer transition-all ${
                              selectedItems.includes(item.id)
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  selectedItems.includes(item.id) 
                                    ? 'border-white bg-white/20' 
                                    : 'border-gray-300'
                                }`}>
                                  {selectedItems.includes(item.id) && <Check className="h-4 w-4" />}
                                </div>
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className={`text-sm ${selectedItems.includes(item.id) ? 'text-white/80' : 'text-gray-500'}`}>
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <span className="font-bold">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedItems.length > 0 && (
                      <div className="bg-white p-6 rounded-2xl text-center border-2 border-purple-100 shadow-lg">
                        <p className="text-sm text-gray-600 mb-2 font-medium">
                          You'll pay for {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''}
                        </p>
                        <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {formatCurrency(splitAmount)}
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Add Contribution */}
          {!isFullyPaid && splitAmount > 0 && (
            <Card className="border-0 shadow-xl">
              <div className="h-2 gradient-green"></div>
              <CardHeader>
                <CardTitle className="text-xl">Add Your Contribution</CardTitle>
                <CardDescription>Enter your name and contribute your share</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <Button
                  onClick={handleAddContribution}
                  className="w-full h-14 gradient-green text-white border-0 text-lg shadow-lg hover:shadow-xl rounded-xl"
                >
                  Pay {formatCurrency(Math.min(splitAmount, remainingAmount))}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Contributions List */}
          {splitPayment.contributions.length > 0 && (
            <Card className="border-0 shadow-xl">
              <div className="h-2 bg-gradient-to-r from-orange-500 to-pink-500"></div>
              <CardHeader>
                <CardTitle className="text-xl">Contributions ({splitPayment.contributions.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {splitPayment.contributions.map((contribution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="font-bold text-white text-lg">
                          {contribution.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-lg">{contribution.name}</span>
                        {contribution.items && contribution.items.length > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            Paid for: {contribution.items.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {formatCurrency(contribution.amount)}
                    </span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Share QR */}
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6">
              <Button
                onClick={() => setShowShareQR(true)}
                variant="outline"
                className="w-full h-14 text-lg border-2 hover:border-blue-500 hover:bg-blue-50 rounded-xl"
              >
                <Share2 className="mr-2 h-6 w-6" />
                Share Split QR with Friends
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Share QR Modal */}
      <Dialog open={showShareQR} onOpenChange={setShowShareQR}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Share Split Bill</DialogTitle>
            <DialogDescription>
              Friends can scan this QR to join the split payment
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-2xl">
              <QRCodeSVG value={shareUrl} size={220} level="H" includeMargin={true} />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Scan to contribute to this split bill
              </p>
              <p className="text-xs text-gray-500">Order ID: {orderId}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
