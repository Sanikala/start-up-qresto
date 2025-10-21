"use client";

import { QRCodeSVG } from "qrcode.react";
import { formatCurrency } from "@/lib/utils";

interface PaymentQRProps {
  amount: number;
  orderId: string;
}

export function PaymentQR({ amount, orderId }: PaymentQRProps) {
  // Simulate payment URL (in production, this would be your actual payment gateway URL)
  const paymentUrl = `https://qresto.pay/order/${orderId}?amount=${amount}`;

  return (
    <div className="flex flex-col items-center py-6 space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <QRCodeSVG
          value={paymentUrl}
          size={250}
          level="H"
          includeMargin={true}
        />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Amount to pay</p>
        <p className="text-3xl font-bold text-orange-600">
          {formatCurrency(amount)}
        </p>
        <p className="text-xs text-gray-500 mt-2">Order ID: {orderId}</p>
      </div>
      <p className="text-sm text-gray-600 text-center max-w-xs">
        Processing payment... This is a simulation. Payment will complete automatically.
      </p>
    </div>
  );
}
