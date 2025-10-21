import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Utensils, CreditCard, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to QResto
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            QR-Based Dining Solution - Scan, Order, Pay
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/table/1">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                <QrCode className="mr-2 h-5 w-5" />
                Try Demo (Table 1)
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <QrCode className="h-10 w-10 text-orange-500 mb-2" />
              <CardTitle>QR Scan</CardTitle>
              <CardDescription>
                Scan table QR to view menu instantly
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Utensils className="h-10 w-10 text-orange-500 mb-2" />
              <CardTitle>Browse Menu</CardTitle>
              <CardDescription>
                Explore dishes and add to cart
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CreditCard className="h-10 w-10 text-orange-500 mb-2" />
              <CardTitle>Pay with QR</CardTitle>
              <CardDescription>
                Generate payment QR or pay cash
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-orange-500 mb-2" />
              <CardTitle>Split Bill</CardTitle>
              <CardDescription>
                Split payment with friends easily
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Quick Test Routes</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/table/1">
              <Button variant="outline">Table 1</Button>
            </Link>
            <Link href="/table/5">
              <Button variant="outline">Table 5</Button>
            </Link>
            <Link href="/table/10">
              <Button variant="outline">Table 10</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
