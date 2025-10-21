"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";

export default function SplitBillPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { toast } = useToast();

  const { currentOrder, splitPayment, initializeSplitPayment, addContribution, clearCart, updateOrderStatus } = useCartStore();
  
  const [splitAmount, setSplitAmount] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(2);
  const [showShareQR, setShowShareQR] = useState(false);
  const [contributorName, setContributorName] = useState("");

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
      initializeSplitPayment(orderId, currentOrder.total);
    }
  }, [currentOrder, orderId, splitPayment, initializeSplitPayment, router, toast]);

  useEffect(() => {
    if (currentOrder) {
      setSplitAmount(currentOrder.total / numberOfPeople);
    }
  }, [currentOrder, numberOfPeople]);

  if (!currentOrder || !splitPayment) {
    return null;
  }

  const progressPercentage = (splitPayment.paidAmount / splitPayment.totalAmount) * 100;
  const remainingAmount = splitPayment.totalAmount - splitPayment.paidAmount;
  const isFullyPaid = progressPercentage >= 100;

  const handleAddContribution = () => {
    if (!contributorName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name",
      });
      return;
    }
    
    const amountToAdd = Math.min(splitAmount, remainingAmount);
    addContribution(contributorName, amountToAdd);
    setContributorName("");
    
    toast({
      title: "Contribution added",
      description: `${contributorName} paid ${formatCurrency(amountToAdd)}`,
    });

    if (splitPayment.paidAmount + amountToAdd >= splitPayment.totalAmount) {
      setTimeout(() => {
        updateOrderStatus("paid");
        toast({
          title: "Payment Complete!",
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-500 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/payment")}
              className="text-white hover:bg-blue-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Split Bill</h1>
              <p className="text-blue-100 text-sm">Share payment with friends</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Total & Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Bill Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Bill</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatCurrency(splitPayment.totalAmount)}
                </span>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Payment Progress</span>
                  <span className="font-semibold">
                    {formatCurrency(splitPayment.paidAmount)} / {formatCurrency(splitPayment.totalAmount)}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>

              {!isFullyPaid && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Remaining to pay</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {formatCurrency(remainingAmount)}
                  </p>
                </div>
              )}

              {isFullyPaid && (
                <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3">
                  <Check className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">Fully Paid!</p>
                    <p className="text-sm text-green-600">All contributions received</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Split Calculator */}
          {!isFullyPaid && (
            <Card>
              <CardHeader>
                <CardTitle>Split Evenly</CardTitle>
                <CardDescription>Choose number of people</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setNumberOfPeople(Math.max(2, numberOfPeople - 1))}
                  >
                    -
                  </Button>
                  <div className="flex-1 text-center">
                    <p className="text-3xl font-bold">{numberOfPeople}</p>
                    <p className="text-sm text-gray-600">people</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setNumberOfPeople(numberOfPeople + 1)}
                  >
                    +
                  </Button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Each person pays</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(splitAmount)}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Add Contribution */}
          {!isFullyPaid && (
            <Card>
              <CardHeader>
                <CardTitle>Add Your Contribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  onClick={handleAddContribution}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                >
                  Pay {formatCurrency(Math.min(splitAmount, remainingAmount))}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Contributions List */}
          {splitPayment.contributions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Contributions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {splitPayment.contributions.map((contribution, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-blue-700">
                          {contribution.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium">{contribution.name}</span>
                    </div>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(contribution.amount)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Share QR */}
          <Card>
            <CardContent className="p-6">
              <Button
                onClick={() => setShowShareQR(true)}
                variant="outline"
                className="w-full h-12"
              >
                <Share2 className="mr-2 h-5 w-5" />
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
            <DialogTitle>Share Split Bill</DialogTitle>
            <DialogDescription>
              Friends can scan this QR to join the split payment
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <QRCodeSVG value={shareUrl} size={200} level="H" includeMargin={true} />
            </div>
            <p className="text-sm text-gray-600 text-center">
              Scan to contribute to this split bill
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
