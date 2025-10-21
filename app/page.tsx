import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Utensils, CreditCard, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="text-7xl mb-4 animate-bounce">🍽️</div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome to QResto
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The future of dining - Scan, Order, and Pay seamlessly with our modern QR-based solution
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/table/1">
              <Button size="lg" className="gradient-orange text-white border-0 h-14 px-8 text-lg shadow-lg hover:shadow-xl transition-all">
                <QrCode className="mr-2 h-6 w-6" />
                Try Demo Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          <Card className="card-hover border-0 shadow-lg overflow-hidden">
            <div className="h-2 gradient-orange"></div>
            <CardHeader>
              <div className="w-14 h-14 gradient-orange rounded-2xl flex items-center justify-center mb-4">
                <QrCode className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">QR Scan</CardTitle>
              <CardDescription className="text-base">
                Instant access to menu with a simple scan
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-hover border-0 shadow-lg overflow-hidden">
            <div className="h-2 gradient-blue"></div>
            <CardHeader>
              <div className="w-14 h-14 gradient-blue rounded-2xl flex items-center justify-center mb-4">
                <Utensils className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Browse Menu</CardTitle>
              <CardDescription className="text-base">
                Explore dishes with beautiful imagery
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-hover border-0 shadow-lg overflow-hidden">
            <div className="h-2 gradient-green"></div>
            <CardHeader>
              <div className="w-14 h-14 gradient-green rounded-2xl flex items-center justify-center mb-4">
                <CreditCard className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Smart Payment</CardTitle>
              <CardDescription className="text-base">
                Multiple payment options at your fingertips
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-hover border-0 shadow-lg overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-pink-500 to-rose-500"></div>
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Split Bill</CardTitle>
              <CardDescription className="text-base">
                Fair splitting - pay for what you ordered
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Access */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
            Quick Test Access
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[1, 5, 10].map((table) => (
              <Link key={table} href={`/table/${table}`}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 hover:border-orange-500 hover:text-orange-600 transition-all"
                >
                  <span className="text-2xl mr-2">🪑</span>
                  Table {table}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-3 gradient-orange"></div>
            <CardContent className="pt-8 pb-8 text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-3">
                Fast
              </div>
              <p className="text-gray-600 text-lg">Order in under 30 seconds</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-3 gradient-blue"></div>
            <CardContent className="pt-8 pb-8 text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent mb-3">
                Secure
              </div>
              <p className="text-gray-600 text-lg">Safe payment processing</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-3 gradient-green"></div>
            <CardContent className="pt-8 pb-8 text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-3">
                Easy
              </div>
              <p className="text-gray-600 text-lg">Intuitive user experience</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
