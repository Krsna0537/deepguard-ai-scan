import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { 
  Shield, 
  Upload, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Users,
  Activity
} from 'lucide-react';

interface DashboardStats {
  totalFiles: number;
  deepfakesDetected: number;
  quotaUsed: number;
  quotaLimit: number;
  accuracyRate: number;
  avgProcessingTime: number;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalFiles: 0,
    deepfakesDetected: 0,
    quotaUsed: 0,
    quotaLimit: 50,
    accuracyRate: 0,
    avgProcessingTime: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardStats();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      // Fetch user profile for quota info
      const { data: profile } = await supabase
        .from('profiles')
        .select('api_quota_used, api_quota_limit')
        .eq('id', user?.id)
        .single();

      // Fetch files count
      const { count: filesCount } = await supabase
        .from('files')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id);

      // Fetch analysis statistics
      const { data: analyses } = await supabase
        .from('analyses')
        .select('is_deepfake, processing_time, confidence_score')
        .eq('user_id', user?.id)
        .eq('status', 'completed');

      const deepfakesDetected = analyses?.filter(a => a.is_deepfake).length || 0;
      const avgProcessingTime = analyses?.length 
        ? Math.round(analyses.reduce((sum, a) => sum + (a.processing_time || 0), 0) / analyses.length)
        : 0;
      const accuracyRate = analyses?.length
        ? Math.round(analyses.reduce((sum, a) => sum + (a.confidence_score || 0), 0) / analyses.length * 100)
        : 0;

      setStats({
        totalFiles: filesCount || 0,
        deepfakesDetected,
        quotaUsed: profile?.api_quota_used || 0,
        quotaLimit: profile?.api_quota_limit || 50,
        accuracyRate,
        avgProcessingTime
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const quotaPercentage = (stats.quotaUsed / stats.quotaLimit) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">DeepGuard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.user_metadata?.full_name || user.email}
            </span>
            <Button variant="outline" size="sm">
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your deepfake detection activities and usage
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Files Analyzed</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFiles}</div>
              <p className="text-xs text-muted-foreground">
                Total files processed
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deepfakes Detected</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.deepfakesDetected}</div>
              <p className="text-xs text-muted-foreground">
                Potential threats found
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.accuracyRate}%</div>
              <p className="text-xs text-muted-foreground">
                Average confidence score
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgProcessingTime}s</div>
              <p className="text-xs text-muted-foreground">
                Average analysis time
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Quick Upload
                </CardTitle>
                <CardDescription>
                  Upload media files for deepfake detection analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your files here, or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supports: Images (JPG, PNG, WebP), Videos (MP4, MOV), Audio (MP3, WAV)
                  </p>
                  <Button className="mt-4">
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* API Usage */}
          <div>
            <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  API Usage
                </CardTitle>
                <CardDescription>
                  Reality Defender API quota
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Used</span>
                    <span>{stats.quotaUsed} / {stats.quotaLimit}</span>
                  </div>
                  <Progress value={quotaPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {stats.quotaLimit - stats.quotaUsed} detections remaining this month
                  </p>
                </div>

                {quotaPercentage > 80 && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">Quota Warning</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      You're running low on API quota. Consider upgrading your plan.
                    </p>
                  </div>
                )}

                <Button variant="outline" className="w-full">
                  Upgrade Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-card/50 backdrop-blur-sm border border-border/50 mt-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest deepfake detection results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Recent Activity</h3>
              <p className="text-muted-foreground mb-4">
                Upload your first file to see analysis results here
              </p>
              <Button>Upload Files</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;