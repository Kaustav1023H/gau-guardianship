
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CloudCog, Database, WifiOff, Check, RefreshCw, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const OfflineCapability = () => {
  const [syncStatus, setSyncStatus] = useState<'online' | 'offline' | 'syncing'>('online');
  const [syncProgress, setSyncProgress] = useState(0);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [cachedData, setCachedData] = useState<{
    records: number;
    images: number;
    dataSize: string;
  }>({
    records: 0,
    images: 0,
    dataSize: "0 MB",
  });
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  // Simulate initial data
  useEffect(() => {
    // Simulate cached data for demonstration
    setCachedData({
      records: 157,
      images: 32,
      dataSize: "24.5 MB",
    });
    
    // Set last synced time
    setLastSynced(new Date().toLocaleString());
    
    // Check network status
    const updateOnlineStatus = () => {
      setSyncStatus(navigator.onLine ? 'online' : 'offline');
    };
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    updateOnlineStatus();
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const handleSyncData = () => {
    setSyncStatus('syncing');
    setSyncProgress(0);
    
    // Simulate sync progress
    const syncInterval = setInterval(() => {
      setSyncProgress(prev => {
        const newProgress = prev + Math.random() * 20;
        if (newProgress >= 100) {
          clearInterval(syncInterval);
          setSyncStatus('online');
          setLastSynced(new Date().toLocaleString());
          toast({
            title: "Sync Complete",
            description: "All your data has been synchronized successfully.",
          });
          return 100;
        }
        return newProgress;
      });
    }, 400);
  };

  const handleDownloadForOffline = () => {
    setSyncStatus('syncing');
    setSyncProgress(0);
    
    // Simulate download progress
    const downloadInterval = setInterval(() => {
      setSyncProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(downloadInterval);
          setSyncStatus('online');
          setCachedData(prev => ({
            records: prev.records + 43,
            images: prev.images + 12,
            dataSize: "36.2 MB"
          }));
          toast({
            title: "Download Complete",
            description: "Additional data has been cached for offline use.",
          });
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const handleClearCache = () => {
    setSyncStatus('syncing');
    setSyncProgress(0);
    
    // Simulate clearing cache
    const clearCacheInterval = setInterval(() => {
      setSyncProgress(prev => {
        const newProgress = prev + Math.random() * 25;
        if (newProgress >= 100) {
          clearInterval(clearCacheInterval);
          setSyncStatus('online');
          setCachedData({
            records: 0,
            images: 0,
            dataSize: "0 MB"
          });
          toast({
            title: "Cache Cleared",
            description: "All cached data has been removed from your device.",
          });
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary mb-4">
              <CloudCog className="h-4 w-4 mr-2" />
              Offline-First Technology
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4">
              Offline Capability
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Keep working even when your internet connection is unreliable. 
              All your data is safely stored locally and synchronized when connectivity returns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Sync Status</h2>
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    {syncStatus === 'online' ? (
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                        <span>Online</span>
                      </div>
                    ) : syncStatus === 'offline' ? (
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-orange-500 rounded-full mr-2"></div>
                        <span>Offline</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                        <span>Syncing...</span>
                      </div>
                    )}
                  </div>
                  {lastSynced && (
                    <span className="text-sm text-muted-foreground">
                      Last synced: {lastSynced}
                    </span>
                  )}
                </div>
                
                {syncStatus === 'syncing' && (
                  <div className="mb-6">
                    <Progress value={syncProgress} className="h-2 mb-2" />
                    <p className="text-xs text-center text-muted-foreground">
                      {syncProgress < 30 ? "Preparing data..." : 
                       syncProgress < 60 ? "Transferring records..." : 
                       syncProgress < 90 ? "Processing files..." : 
                       "Finalizing..."}
                    </p>
                  </div>
                )}
                
                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    variant="default" 
                    onClick={handleSyncData}
                    disabled={syncStatus === 'syncing'}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Sync Now
                  </Button>
                  
                  <Button 
                    className="w-full" 
                    variant="outline" 
                    onClick={handleDownloadForOffline}
                    disabled={syncStatus === 'syncing'}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Data for Offline Use
                  </Button>
                </div>
              </GlassCard>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Offline Data</h2>
              <GlassCard className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full">
                    <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                    <TabsTrigger value="storage" className="flex-1">Storage</TabsTrigger>
                    <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4 pt-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-secondary/10 p-4 rounded-lg text-center">
                        <p className="text-3xl font-semibold">{cachedData.records}</p>
                        <p className="text-sm text-muted-foreground">Records</p>
                      </div>
                      <div className="bg-secondary/10 p-4 rounded-lg text-center">
                        <p className="text-3xl font-semibold">{cachedData.images}</p>
                        <p className="text-sm text-muted-foreground">Images</p>
                      </div>
                      <div className="bg-secondary/10 p-4 rounded-lg text-center">
                        <p className="text-3xl font-semibold">{cachedData.dataSize}</p>
                        <p className="text-sm text-muted-foreground">Size</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Check className="text-green-500 h-4 w-4 mr-2" />
                        <span>Breeding recommendations</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Check className="text-green-500 h-4 w-4 mr-2" />
                        <span>Animal health records</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Check className="text-green-500 h-4 w-4 mr-2" />
                        <span>Milk yield tracking</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Check className="text-green-500 h-4 w-4 mr-2" />
                        <span>Feeding schedules</span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="storage" className="space-y-4 pt-4">
                    <div className="bg-secondary/10 p-4 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Storage Used</span>
                        <span className="text-sm font-medium">{cachedData.dataSize} / 100 MB</span>
                      </div>
                      <Progress value={parseFloat(cachedData.dataSize) / 100 * 100} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Animal Records</span>
                        <span>12.4 MB</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Images</span>
                        <span>8.7 MB</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Reports</span>
                        <span>3.2 MB</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Application Data</span>
                        <span>0.2 MB</span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Cache Settings</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Control what data is stored offline and for how long
                        </p>
                        <Button 
                          variant="destructive" 
                          className="w-full"
                          onClick={handleClearCache}
                          disabled={syncStatus === 'syncing'}
                        >
                          Clear Cached Data
                        </Button>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Sync Frequency</h4>
                        <p className="text-sm text-muted-foreground">
                          Data is currently set to sync automatically when connection is available
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </GlassCard>
            </div>
          </div>
          
          <div className="mt-16 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-secondary/10 p-6 rounded-lg flex flex-col items-center text-center">
                <Database className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Local Storage</h3>
                <p className="text-muted-foreground text-sm">
                  All data is stored securely on your device using encrypted local database technology
                </p>
              </div>
              
              <div className="bg-secondary/10 p-6 rounded-lg flex flex-col items-center text-center">
                <WifiOff className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Offline First</h3>
                <p className="text-muted-foreground text-sm">
                  Work without interruption in low-connectivity areas with full functionality
                </p>
              </div>
              
              <div className="bg-secondary/10 p-6 rounded-lg flex flex-col items-center text-center">
                <RefreshCw className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Smart Syncing</h3>
                <p className="text-muted-foreground text-sm">
                  Intelligent conflict resolution ensures your data stays consistent across all devices
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OfflineCapability;
