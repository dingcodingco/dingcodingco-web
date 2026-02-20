/**
 * Component Import Test File
 * This file verifies that all shadcn/ui components can be imported correctly
 */

import { Button } from "@/app/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Badge } from "@/app/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/ui/tabs"
import { Toast } from "@/app/components/ui/toast"
import { Toaster } from "@/app/components/ui/toaster"
import { Form } from "@/app/components/ui/form"
import { Label } from "@/app/components/ui/label"
import { useToast } from "@/app/hooks/use-toast"
import { cn } from "@/lib/utils"

/**
 * Test Component demonstrating all imported components
 */
export function ComponentTest() {
  const { toast } = useToast()

  return (
    <div className="p-8 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Component Test</CardTitle>
          <CardDescription>All shadcn/ui components imported successfully</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={() => toast({ title: "Test Toast" })}>
              Test Button
            </Button>
            <Input placeholder="Test Input" />
            <Badge>Test Badge</Badge>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">Content 1</TabsContent>
              <TabsContent value="tab2">Content 2</TabsContent>
            </Tabs>
            <div>
              <Label htmlFor="test">Test Label</Label>
              <Input id="test" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}

// Test utility function
const testClassName = cn("text-red-500", "font-bold")
console.log("cn() utility test:", testClassName)

export default ComponentTest
