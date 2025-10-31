"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Savvly Component Test</h1>

        {/* Button Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Testing all button variants</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive (Coral)</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </CardContent>
        </Card>

        {/* Input Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Input Fields</CardTitle>
            <CardDescription>Testing input components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <Label htmlFor="amount">Budget Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="text-right"
              />
            </div>

            <div>
              <Label htmlFor="error">Input with Error</Label>
              <Input
                id="error"
                type="text"
                placeholder="This has an error"
                error
              />
              <p className="text-sm text-attention-400 mt-1">
                This field is required
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card Tests */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🍔</span>
                Food
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Spent</span>
                  <span className="font-semibold">$280</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '70%' }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-semibold">$400</span>
                </div>
                <p className="text-sm text-secondary mt-2">
                  $120 remaining ✓
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🚗</span>
                Transport
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Spent</span>
                  <span className="font-semibold">$95</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '48%' }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-semibold">$200</span>
                </div>
                <p className="text-sm text-secondary mt-2">
                  $105 remaining ✓
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-attention-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🍽️</span>
                Dining
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Spent</span>
                  <span className="font-semibold">$315</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-attention-400 h-2 rounded-full" style={{ width: '105%' }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-semibold">$300</span>
                </div>
                <p className="text-sm text-attention-400 mt-2">
                  💭 Dining is a bit high this month (+$15)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Color Palette Test */}
        <Card>
          <CardHeader>
            <CardTitle>Savvly Color Palette</CardTitle>
            <CardDescription>Design system colors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-primary" />
              <div>
                <p className="font-semibold">Primary Blue</p>
                <p className="text-sm text-muted-foreground">Trust & Stability</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-secondary" />
              <div>
                <p className="font-semibold">Secondary Green</p>
                <p className="text-sm text-muted-foreground">Growth & Hope</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-accent" />
              <div>
                <p className="font-semibold">Accent Orange</p>
                <p className="text-sm text-muted-foreground">Optimism & Warmth</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-attention-400" />
              <div>
                <p className="font-semibold">Attention Coral</p>
                <p className="text-sm text-muted-foreground">Gentle reminder (not red!)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
