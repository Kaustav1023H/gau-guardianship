
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, TrendingUp, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data
const biogasData = [
  { month: "Jan", biogas: 120, target: 100 },
  { month: "Feb", biogas: 140, target: 100 },
  { month: "Mar", biogas: 130, target: 100 },
  { month: "Apr", biogas: 170, target: 150 },
  { month: "May", biogas: 160, target: 150 },
  { month: "Jun", biogas: 190, target: 150 },
  { month: "Jul", biogas: 210, target: 200 },
  { month: "Aug", biogas: 230, target: 200 },
  { month: "Sep", biogas: 220, target: 200 },
  { month: "Oct", biogas: 250, target: 250 },
  { month: "Nov", biogas: 270, target: 250 },
  { month: "Dec", biogas: 290, target: 250 },
];

const co2Data = [
  { month: "Jan", co2: 0.3, target: 0.4 },
  { month: "Feb", co2: 0.35, target: 0.4 },
  { month: "Mar", co2: 0.4, target: 0.4 },
  { month: "Apr", co2: 0.45, target: 0.45 },
  { month: "May", co2: 0.42, target: 0.45 },
  { month: "Jun", co2: 0.48, target: 0.45 },
  { month: "Jul", co2: 0.5, target: 0.5 },
  { month: "Aug", co2: 0.55, target: 0.5 },
  { month: "Sep", co2: 0.52, target: 0.5 },
  { month: "Oct", co2: 0.58, target: 0.55 },
  { month: "Nov", co2: 0.6, target: 0.55 },
  { month: "Dec", co2: 0.65, target: 0.55 },
];

const gauPointsData = [
  { category: "Biogas Production", points: 240 },
  { category: "Dung Collection", points: 180 },
  { category: "Breed Conservation", points: 150 },
  { category: "Tree Planting", points: 120 },
  { category: "Water Conservation", points: 90 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-background border border-border rounded-lg shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value} {entry.unit}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const statCards = [
  {
    title: "Total Biogas Produced",
    value: "2,180 m³",
    change: "+12%",
    positive: true,
    icon: Droplets,
    color: "text-cyan-500",
    bg: "bg-cyan-50"
  },
  {
    title: "CO₂ Offset",
    value: "5.8 tons",
    change: "+8%",
    positive: true,
    icon: Leaf,
    color: "text-green-500",
    bg: "bg-green-50"
  },
  {
    title: "GauPoints Earned",
    value: "780",
    change: "+24%",
    positive: true,
    icon: TrendingUp,
    color: "text-amber-500",
    bg: "bg-amber-50"
  }
];

const EnvironmentalImpact = () => {
  const [activeTab, setActiveTab] = useState("biogas");

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                  <p className={cn(
                    "text-sm mt-1 flex items-center",
                    stat.positive ? "text-green-600" : "text-red-600"
                  )}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={cn("p-3 rounded-full", stat.bg)}>
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Environmental Metrics</CardTitle>
            <CardDescription>
              Monitor your biogas production and CO₂ offset over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="biogas">Biogas Production</TabsTrigger>
                <TabsTrigger value="co2">CO₂ Offset</TabsTrigger>
              </TabsList>
              <TabsContent value="biogas" className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={biogasData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorBiogas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value} m³`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="biogas" 
                      stroke="#82ca9d" 
                      fillOpacity={1} 
                      fill="url(#colorBiogas)" 
                      name="Biogas"
                      unit=" m³"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#colorTarget)"
                      name="Target"
                      unit=" m³"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="co2" className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={co2Data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorCO2Target" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value} tons`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="co2" 
                      stroke="#4ade80" 
                      fillOpacity={1} 
                      fill="url(#colorCO2)" 
                      name="CO₂ Offset"
                      unit=" tons"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#colorCO2Target)"
                      name="Target"
                      unit=" tons"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>GauPoints Breakdown</CardTitle>
            <CardDescription>
              Points earned through eco-friendly activities
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={gauPointsData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="points" 
                  name="GauPoints" 
                  fill="#f59e0b" 
                  radius={[0, 4, 4, 0]} 
                  barSize={30} 
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnvironmentalImpact;
